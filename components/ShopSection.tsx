'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'

interface Category {
  id: number
  name: string
  slug: string
  parent_id?: number | null
}

interface Product {
  id: number
  name: string
  slug: string
  description?: string
  price: number
  discount?: number
  image?: string
  category_id: number
  category_name: string
  stock: number
}

export default function ShopSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCartStore()

  useEffect(() => {
    fetchCategories()
    
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
    fetchProducts(selectedCategory ?? undefined)
  }, [selectedCategory])

  useEffect(() => {
    if (products.length === 0) return

    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    // Reset scroll position when products change
    scrollContainer.scrollLeft = 0

    let scrollPosition = 0
    const scrollSpeed = 0.4
    let animationFrameId: number | null = null
    let isPaused = false
    let pauseTimeout: NodeJS.Timeout | null = null
    let isUserScrolling = false
    let userScrollTimeout: NodeJS.Timeout | null = null
    let lastScrollLeft = 0

    const handleMouseEnter = () => {
      isPaused = true
      if (pauseTimeout) clearTimeout(pauseTimeout)
    }

    const handleMouseLeave = () => {
      // Resume after a short delay
      pauseTimeout = setTimeout(() => {
        isPaused = false
      }, 100)
    }

    // Detect manual scrolling (touch or mouse drag)
    const handleScroll = () => {
      const currentScrollLeft = scrollContainer.scrollLeft
      
      // If user manually scrolled (difference is significant)
      if (Math.abs(currentScrollLeft - lastScrollLeft) > 5) {
        isUserScrolling = true
        isPaused = true
        
        // Clear any existing timeout
        if (userScrollTimeout) clearTimeout(userScrollTimeout)
        
        // Resume auto-scroll after user stops scrolling for 2 seconds
        userScrollTimeout = setTimeout(() => {
          isUserScrolling = false
          isPaused = false
          // Sync scrollPosition with current scroll
          scrollPosition = currentScrollLeft
        }, 2000)
      }
      
      lastScrollLeft = currentScrollLeft
    }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })

    const autoScroll = () => {
      if (isPaused || isUserScrolling) {
        animationFrameId = requestAnimationFrame(autoScroll)
        return
      }

      scrollPosition += scrollSpeed
      
      // Calculate the width of one set of products
      const singleSetWidth = scrollContainer.scrollWidth / 2
      
      // Reset to start when reaching the end of first set (seamless infinite loop)
      if (scrollPosition >= singleSetWidth) {
        scrollPosition = scrollPosition - singleSetWidth
      }
      
      scrollContainer.scrollLeft = scrollPosition
      lastScrollLeft = scrollPosition
      animationFrameId = requestAnimationFrame(autoScroll)
    }

    animationFrameId = requestAnimationFrame(autoScroll)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (pauseTimeout) {
        clearTimeout(pauseTimeout)
      }
      if (userScrollTimeout) {
        clearTimeout(userScrollTimeout)
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [products])

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
      // Get only main categories (no parent) and limit to 4 for buttons
      const mainCategories = (Array.isArray(data) ? data : [])
        .filter((c: Category) => !c.parent_id)
        .slice(0, 4)
      setCategories(mainCategories)
      
      // If selected category was deleted, reset selection
      if (selectedCategory) {
        const categoryExists = mainCategories.find((c: Category) => c.id === selectedCategory)
        if (!categoryExists) {
          setSelectedCategory(null)
          fetchProducts() // Fetch all products
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProducts = async (categoryId?: number) => {
    try {
      setLoading(true)
      const url = categoryId
        ? `/api/products?categoryId=${categoryId}&active=true&includeSubcategories=true`
        : '/api/products?active=true'
      const res = await fetch(url)
      const data = await res.json()
      // Get only active products with images
      const activeProducts = (Array.isArray(data) ? data : [])
        .filter((p: Product) => p.image)
        .slice(0, 20) // Limit to 20 products for performance
      
      // Duplicate for seamless infinite loop
      setProducts([...activeProducts, ...activeProducts])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <section className="py-8 md:py-16 lg:py-24 bg-gradient-to-b from-white via-white to-white relative -mt-8 md:mt-0">
      {/* Smooth transition gradient from Hero */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-primary-50/50 via-primary-50/30 to-transparent pointer-events-none" />
      <div className="container-custom relative z-10">
        {/* Header - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hidden md:block text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Magazinul <span className="text-primary-600">Nostru</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Descoperă gama noastră completă de produse GSM de calitate
          </p>

          {/* Category Buttons - Centered */}
          <div className="w-full flex justify-center pb-2">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {/* All Categories Button */}
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === null
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-600 hover:text-primary-600'
                }`}
              >
                Toate Categoriile
              </button>

              {/* Category Buttons */}
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-600 hover:text-primary-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Carousel Container */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Se încarcă produsele...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600">Nu există produse disponibile.</p>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto md:overflow-x-hidden"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                willChange: 'transform',
              }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={`${product.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="flex-shrink-0 w-[180px] md:w-[220px] lg:w-[260px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  {/* Product Image */}
                  <Link href={`/shop/${product.slug}`}>
                    <div className="relative h-32 md:h-40 lg:h-44 bg-white cursor-pointer flex items-center justify-center p-2 md:p-3 lg:p-4 group">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <FiShoppingBag className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      {/* Discount Badge */}
                      {product.discount && product.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg z-10">
                          -{product.discount}%
                        </div>
                      )}
                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                        {product.discount && product.discount > 0 ? (
                          <div className="flex flex-col items-end">
                            <span className="line-through text-xs opacity-75">{product.price} RON</span>
                            <span>{((product.price * (100 - product.discount)) / 100).toFixed(2)} RON</span>
                          </div>
                        ) : (
                          <div>{product.price} RON</div>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-2 md:p-3 lg:p-4 flex flex-col flex-grow">
                    <p className="text-[10px] md:text-xs text-gray-500 mb-1 uppercase tracking-wide">
                      {product.category_name}
                    </p>
                    <Link href={`/shop/${product.slug}`}>
                      <h3 className="text-xs md:text-sm lg:text-base font-bold text-gray-900 mb-1 md:mb-2 hover:text-primary-600 transition-colors cursor-pointer line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-end mt-auto">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm"
                      >
                        <FiShoppingBag className="w-4 h-4" />
                        Adaugă
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Gradient Overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>
        )}

        {/* CTA Button - Show below carousel on mobile only */}
        <div className="md:hidden mt-8 flex justify-center">
          <Link
            href="/shop"
            className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl"
          >
            <span>Explorează produsele</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
