'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingBag, FiPlus } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import Cart from '@/components/Cart'

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
  image?: string
  category_id: number
  category_name: string
  stock: number
}

export default function ShopPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { addItem, getItemCount } = useCartStore()

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  useEffect(() => {
    // When a category is selected, check if it has subcategories
    if (selectedCategory && categories && categories.length > 0) {
      const category = categories.find((c: Category) => c.id === selectedCategory)
      const subs = categories.filter((c: Category) => c.parent_id === selectedCategory)
      setSubcategories(subs)
      setSelectedSubcategory(null) // Reset subcategory when changing main category
      
      // If category has subcategories, don't fetch products yet
      // Otherwise, fetch products for the category
      if (subs.length === 0) {
        fetchProducts(selectedCategory, false)
      } else {
        setProducts([]) // Clear products when showing subcategories
      }
    } else {
      setSubcategories([])
      setSelectedSubcategory(null)
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
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

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
    addItem({
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

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

          {/* Products Grid */}
          {!products || !Array.isArray(products) || products.length === 0 ? (
            <div className="text-center py-12">
              <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Nu există produse în această categorie</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: Product, index: number) => (
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
                      <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded text-sm font-semibold">
                        {product.price} RON
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
                    <div className="flex items-center justify-between mt-auto">
                      <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `În stoc (${product.stock})` : 'Stoc epuizat'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                        disabled={product.stock === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                          product.stock > 0
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
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

