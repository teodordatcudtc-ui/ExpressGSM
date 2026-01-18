'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'

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

export default function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCartStore()

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (products.length === 0) return

    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame
    let animationFrameId: number | null = null

    const autoScroll = () => {
      scrollPosition += scrollSpeed
      
      // Calculate the width of one set of products (half of total width)
      const singleSetWidth = scrollContainer.scrollWidth / 2
      
      // Reset to start when reaching the end of first set (seamless infinite loop)
      if (scrollPosition >= singleSetWidth) {
        scrollPosition = scrollPosition - singleSetWidth
      }
      
      scrollContainer.scrollLeft = scrollPosition
      
      // Continue animation
      animationFrameId = requestAnimationFrame(autoScroll)
    }

    // Start the infinite scroll animation
    animationFrameId = requestAnimationFrame(autoScroll)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [products])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?active=true')
      const data = await res.json()
      // Get only active products with images, limit to 15 for performance
      const activeProducts = (Array.isArray(data) ? data : [])
        .filter((p: Product) => p.image)
        .slice(0, 15)
      
      // Duplicate products multiple times for seamless infinite loop
      // We duplicate 3 times to ensure smooth infinite scrolling
      setProducts([...activeProducts, ...activeProducts, ...activeProducts])
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

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Se încarcă produsele...</p>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null // Don't show carousel if no products
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Produse <span className="text-primary-600">Recomandate</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Descoperă gama noastră de produse GSM de calitate
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            Vezi toate produsele
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Carousel Container */}
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
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
        </div>

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

