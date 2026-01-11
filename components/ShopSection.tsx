'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingBag } from 'react-icons/fi'
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
  }, [])

  useEffect(() => {
    fetchProducts(selectedCategory ?? undefined)
  }, [selectedCategory])

  useEffect(() => {
    if (products.length === 0) return

    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    // Clone products for seamless loop
    const clonedProducts = [...products, ...products]
    
    // Reset scroll position when products change
    scrollContainer.scrollLeft = 0

    let scrollPosition = 0
    const scrollSpeed = 0.3 // Reduced speed for slower movement
    let animationFrameId: number | null = null
    let isPaused = false
    let pauseTimeout: NodeJS.Timeout | null = null

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

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    const autoScroll = () => {
      if (isPaused) {
        animationFrameId = requestAnimationFrame(autoScroll)
        return
      }

      scrollPosition += scrollSpeed
      
      // Calculate the width of one set of products
      const singleSetWidth = scrollContainer.scrollWidth / 2
      
      // Reset to start when reaching the end of first set (seamless infinite loop)
      if (scrollPosition >= singleSetWidth) {
        // Instant reset without animation for seamless loop
        scrollPosition = scrollPosition - singleSetWidth
        scrollContainer.scrollTo({
          left: scrollPosition,
          behavior: 'auto' // Instant, no smooth scrolling
        })
      } else {
        scrollContainer.scrollLeft = scrollPosition
      }
      
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
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [products])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      // Get only main categories (no parent) and limit to 4 for buttons
      const mainCategories = (Array.isArray(data) ? data : [])
        .filter((c: Category) => !c.parent_id)
        .slice(0, 4)
      setCategories(mainCategories)
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
        .filter((p: Product) => p.image && p.stock > 0)
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
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Magazinul <span className="text-primary-600">Nostru</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Descoperă gama noastră completă de produse GSM de calitate
          </p>

          {/* Category Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* All Categories Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
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
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-600 hover:text-primary-600'
                }`}
              >
                {category.name}
              </button>
            ))}
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
              className="flex gap-6 overflow-x-hidden"
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
                  className="flex-shrink-0 w-[280px] md:w-[300px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  {/* Product Image */}
                  <Link href={`/shop/${product.slug}`}>
                    <div className="relative h-48 bg-white cursor-pointer flex items-center justify-center p-4 group">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 280px, 300px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <FiShoppingBag className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                        {product.price} RON
                      </div>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                      {product.category_name}
                    </p>
                    <Link href={`/shop/${product.slug}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors cursor-pointer line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-green-600 font-semibold">
                        În stoc
                      </span>
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

        {/* Custom Scrollbar Hide */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  )
}
