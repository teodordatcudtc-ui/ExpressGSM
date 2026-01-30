'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingBag, FiPlus } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import Cart from '@/components/Cart'
import { getProductPriceInfo } from '@/lib/product-price'

interface Category {
  id: number
  name: string
  slug: string
  description?: string
  parent_id?: number | null
  parent_name?: string
  parent_slug?: string
}

interface Product {
  id: number
  name: string
  slug: string
  description?: string
  price: number
  discount?: number
  discount_type?: 'percent' | 'fixed' | null
  price_reduced?: number | null
  image?: string
  category_id: number
  category_name: string
  stock: number
}

function ShopContent() {
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null)
  const [lastSelectedCategory, setLastSelectedCategory] = useState<number | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const categoryFromUrlApplied = useRef(false)
  const searchParams = useSearchParams()
  const { addItem, getItemCount } = useCartStore()

  useEffect(() => {
    const q = searchParams.get('q')
    if (q != null) setSearchQuery(q)
  }, [searchParams])

  useEffect(() => {
    if (categories.length === 0 || categoryFromUrlApplied.current) return
    const categorySlug = searchParams.get('category')
    if (!categorySlug) return
    const cat = categories.find((c: Category) => c.slug === categorySlug)
    if (cat) {
      setSelectedCategory(cat.id)
      categoryFromUrlApplied.current = true
    }
  }, [categories, searchParams])

  useEffect(() => {
    fetchCategories()
    fetchProducts()
    
    // Refresh categories when page becomes visible (user switches back to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchCategories()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Also refresh categories periodically (every 5 seconds) to catch changes quickly
    const interval = setInterval(() => {
      fetchCategories()
    }, 5000)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    // When a category is selected, check if it has subcategories
    if (selectedCategory && categories && categories.length > 0) {
      const category = categories.find((c: Category) => c.id === selectedCategory)
      const subs = categories.filter((c: Category) => c.parent_id === selectedCategory)
      setSubcategories(subs)
      
      // Reset subcategory only if the main category changed (not just refreshed)
      if (lastSelectedCategory !== selectedCategory) {
        setSelectedSubcategory(null)
        setLastSelectedCategory(selectedCategory)
        // Fetch products for the new category
        fetchProducts(selectedCategory, true)
      } else {
        // Category didn't change, just categories were refreshed
        // Only reset subcategory if it's not valid anymore
        if (selectedSubcategory) {
          const subcategoryStillValid = subs.find((c: Category) => c.id === selectedSubcategory)
          if (!subcategoryStillValid) {
            setSelectedSubcategory(null)
            fetchProducts(selectedCategory, true)
          }
          // If subcategory is still valid, don't do anything - let subcategory useEffect handle it
        } else if (!selectedSubcategory) {
          // No subcategory selected, fetch products for main category
          fetchProducts(selectedCategory, true)
        }
      }
    } else {
      setSubcategories([])
      setSelectedSubcategory(null)
      setLastSelectedCategory(null)
      if (!selectedCategory) {
        fetchProducts()
      }
    }
  }, [selectedCategory, categories])

  useEffect(() => {
    // Fetch products when subcategory is selected
    if (selectedSubcategory) {
      fetchProducts(selectedSubcategory, false)
    }
  }, [selectedSubcategory])

  const fetchCategories = async () => {
    try {
      // Add cache-busting to prevent browser cache
      const res = await fetch(`/api/categories?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }
  
  // Check if selected categories still exist after categories are updated
  useEffect(() => {
    if (categories.length === 0) return
    
    // If selected category was deleted, reset selection
    if (selectedCategory) {
      const categoryExists = categories.find((c: Category) => c.id === selectedCategory)
      if (!categoryExists) {
        setSelectedCategory(null)
        setSelectedSubcategory(null)
        fetchProducts() // Fetch all products
      }
    }
    
    // If selected subcategory was deleted, reset subcategory selection
    if (selectedSubcategory) {
      const subcategoryExists = categories.find((c: Category) => c.id === selectedSubcategory)
      if (!subcategoryExists) {
        setSelectedSubcategory(null)
        if (selectedCategory) {
          fetchProducts(selectedCategory, true)
        }
      }
    }
  }, [categories])

  const fetchProducts = async (categoryId?: number, includeSubcategories: boolean = true) => {
    try {
      const url = categoryId
        ? `/api/products?categoryId=${categoryId}&includeSubcategories=${includeSubcategories}`
        : '/api/products'
      const res = await fetch(url)
      const data = await res.json()
      // Ensure products is always an array
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([]) // Set empty array on error
    }
  }

  const handleAddToCart = (product: Product) => {
    const { finalPrice } = getProductPriceInfo(product)
    addItem({
      product_id: product.id,
      product_name: product.name,
      price: finalPrice,
      image: product.image,
      quantity: 1,
    })
  }

  const filteredProducts = !searchQuery.trim()
    ? products
    : (products || []).filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )

  return (
    <>
      <div className="section-padding bg-gray-50 min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Magazinul <span className="text-primary-600">Nostru</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descoperă gama noastră completă de produse GSM de calitate
            </p>
          </motion.div>

          {/* Categories Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center mb-4">
              <button
                onClick={() => {
                  setSelectedCategory(null)
                  setSelectedSubcategory(null)
                }}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === null
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Toate Categoriile
              </button>
              {categories && categories.length > 0 && categories
                .filter((c: Category) => !c.parent_id)
                .map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
            </div>
            
            {/* Subcategories Filter (only show if category has subcategories) */}
            {subcategories.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => {
                    setSelectedSubcategory(null)
                    fetchProducts(selectedCategory!, true)
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedSubcategory === null
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Toate {categories.find(c => c.id === selectedCategory)?.name}
                </button>
                {subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => setSelectedSubcategory(subcategory.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedSubcategory === subcategory.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search query display - when coming from header search */}
          {searchQuery.trim() && (
            <p className="text-center text-gray-600 mb-4">
              Căutare: &quot;{searchQuery}&quot; — {filteredProducts.length} rezultat(e)
            </p>
          )}

          {/* Products Grid */}
          {!filteredProducts || filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {searchQuery.trim()
                  ? `Niciun produs găsit pentru „${searchQuery}"`
                  : 'Nu există produse în această categorie'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product: Product, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all flex flex-col"
                >
                  {/* Product Image - Clickable */}
                  <Link href={`/shop/${product.slug}`}>
                    <div className="relative h-48 bg-white cursor-pointer flex items-center justify-center p-4">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <FiShoppingBag className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      {/* Discount Badge */}
                      {(() => {
                        const priceInfo = getProductPriceInfo(product)
                        return priceInfo.hasDiscount && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg z-10">
                            -{priceInfo.discountPercentDisplay}%
                          </div>
                        )
                      })()}
                      {/* Price Badge */}
                      <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded text-sm font-semibold">
                        {(() => {
                          const priceInfo = getProductPriceInfo(product)
                          return priceInfo.hasDiscount ? (
                            <div className="flex flex-col items-end">
                              <span className="line-through text-xs opacity-75">{product.price} RON</span>
                              <span>{priceInfo.finalPrice.toFixed(2)} RON</span>
                            </div>
                          ) : (
                            <div>{product.price} RON</div>
                          )
                        })()}
                      </div>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4 flex flex-col flex-grow">
                    <p className="text-sm text-gray-500 mb-1">{product.category_name}</p>
                    <Link href={`/shop/${product.slug}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-end mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all bg-primary-600 text-white hover:bg-primary-700"
                      >
                        <FiPlus className="w-4 h-4" />
                        Adaugă
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

function ShopPageFallback() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Se încarcă magazinul...</p>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopPageFallback />}>
      <ShopContent />
    </Suspense>
  )
}

