'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowLeft, FiPlus, FiMinus, FiShoppingCart, FiCheckCircle, FiTruck, FiShield, FiCheck } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import Cart from '@/components/Cart'

interface Product {
  id: number
  name: string
  slug: string
  description?: string
  price: number
  discount?: number
  image?: string
  images?: string[]
  category_id: number
  category_name: string
  category_slug: string
  stock: number
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const { addItem } = useCartStore()

  useEffect(() => {
    fetchProduct()
  }, [params.slug])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products?slug=${params.slug}`)
      const data = await res.json()
      if (data.length > 0) {
        setProduct(data[0])
        // Fetch similar products after getting the product
        fetchSimilarProducts(data[0])
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSimilarProducts = async (currentProduct: Product) => {
    try {
      // Get products from the same category, including subcategories, excluding current product
      const res = await fetch(`/api/products?categoryId=${currentProduct.category_id}&active=true&includeSubcategories=true`)
      const data = await res.json()
      let similar = (Array.isArray(data) ? data : [])
        .filter((p: Product) => p.id !== currentProduct.id && p.image)
      
      // If we don't have enough products from same category, get more from all products
      if (similar.length < 4) {
        const allRes = await fetch('/api/products?active=true')
        const allData = await allRes.json()
        const additional = (Array.isArray(allData) ? allData : [])
          .filter((p: Product) => 
            p.id !== currentProduct.id && 
            p.image &&
            !similar.some(sp => sp.id === p.id)
          )
          .slice(0, 4 - similar.length)
        similar = [...similar, ...additional]
      }
      
      setSimilarProducts(similar.slice(0, 4)) // Limit to 4 similar products
    } catch (error) {
      console.error('Error fetching similar products:', error)
      setSimilarProducts([])
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    // Calculate final price with discount
    const finalPrice = product.discount && product.discount > 0
      ? (product.price * (100 - product.discount)) / 100
      : product.price

    addItem({
      product_id: product.id,
      product_name: product.name,
      price: finalPrice,
      image: product.image,
      quantity: quantity,
    })

    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
      setIsCartOpen(true)
    }, 500)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Normalize images array (API returns images or fallback to single image)
  const productImages = product
    ? (Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : product.image
          ? [product.image]
          : [])
    : []

  const goToPrevImage = () => {
    setImageIndex((i) => (i <= 0 ? productImages.length - 1 : i - 1))
  }
  const goToNextImage = () => {
    setImageIndex((i) => (i >= productImages.length - 1 ? 0 : i + 1))
  }

  const minSwipeDistance = 50
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const onTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return
    const distance = touchStart - touchEnd
    if (Math.abs(distance) < minSwipeDistance) return
    if (distance > 0) goToNextImage()
    else goToPrevImage()
    setTouchStart(null)
    setTouchEnd(null)
  }

  if (loading) {
    return (
      <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produs negăsit</h2>
          <p className="text-gray-600 mb-6">Produsul pe care îl cauți nu există.</p>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
            <FiArrowLeft className="w-5 h-5" />
            Înapoi la Magazin
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="section-padding bg-white min-h-screen">
        <div className="container-custom max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Înapoi</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-16 lg:items-start">
            {/* Product Image - Left Side: sticky pe PC ca poza să rămână vizibilă când descrierea e lungă */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative bg-white rounded-tl-3xl rounded-bl-3xl lg:rounded-tr-none lg:rounded-br-none flex items-center justify-center p-8 lg:p-12 min-h-[500px] lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-hidden"
            >
              <div
                className="relative w-full max-w-md aspect-square lg:aspect-auto lg:max-h-full lg:h-full select-none touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {productImages.length > 0 ? (
                  <>
                    {productImages.map((src, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{ opacity: i === imageIndex ? 1 : 0, pointerEvents: i === imageIndex ? 'auto' : 'none' }}
                      >
                        <Image
                          src={src}
                          alt={`${product.name} - imagine ${i + 1}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={i === 0}
                          unoptimized={src.startsWith('data:') || src.includes('supabase')}
                        />
                      </div>
                    ))}
                    {productImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={goToPrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-800 hover:bg-white z-10"
                          aria-label="Imaginea anterioară"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={goToNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-800 hover:bg-white z-10"
                          aria-label="Imaginea următoare"
                        >
                          ›
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {productImages.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setImageIndex(i)}
                              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                i === imageIndex ? 'bg-primary-600 scale-110' : 'bg-gray-300'
                              }`}
                              aria-label={`Imagine ${i + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/50 rounded-2xl">
                    <div className="w-32 h-40 bg-gray-800 rounded-2xl p-3 shadow-xl">
                      <div className="grid grid-cols-3 gap-2 h-full">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div
                            key={i}
                            className={`rounded-lg ${
                              i % 3 === 0 ? 'bg-orange-400' : i % 3 === 1 ? 'bg-yellow-400' : 'bg-blue-500'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-tr-3xl rounded-br-3xl lg:rounded-tl-none lg:rounded-bl-none p-8 lg:p-12 flex flex-col"
            >
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{product.name}</h1>

              {/* Price */}
              <div className="mb-8">
                {product.discount && product.discount > 0 ? (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                        -{product.discount}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-bold text-primary-600">
                        {((product.price * (100 - product.discount)) / 100).toFixed(2)}
                      </span>
                      <span className="text-2xl text-gray-600">lei</span>
                      <span className="text-2xl text-gray-400 line-through">
                        {product.price} lei
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-5xl font-bold text-primary-600">{product.price}</span>
                    <span className="text-2xl text-gray-600 ml-2">lei</span>
                  </div>
                )}
              </div>

              {/* Technical Specifications / Description */}
              {product.description && (
                <div className="mb-8 bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Specificații tehnice</h3>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Cantitate:
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiMinus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold text-gray-900 w-16 text-center">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <FiPlus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`w-full btn-primary flex items-center justify-center gap-3 text-lg py-4 rounded-xl mb-8 ${
                  addedToCart
                    ? 'bg-green-600 hover:bg-green-700'
                    : ''
                }`}
              >
                {addedToCart ? (
                  <>
                    <FiCheckCircle className="w-6 h-6" />
                    <span>Adăugat în Coș!</span>
                  </>
                ) : (
                  <>
                    <FiShoppingCart className="w-6 h-6" />
                    <span>Adaugă în coș</span>
                  </>
                )}
              </button>

              {/* Service Guarantees */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <FiTruck className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Livrare rapidă</p>
                  <p className="text-xs text-gray-600">24-48h</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <FiShield className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Garanție</p>
                  <p className="text-xs text-gray-600">2 ani</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <FiCheck className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Produs original</p>
                  <p className="text-xs text-gray-600">100% autentic</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <div className="mt-16 pt-16 border-t border-gray-200">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Produse <span className="text-primary-600">similare</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((similarProduct) => (
                  <motion.div
                    key={similarProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                  >
                    <Link href={`/shop/${similarProduct.slug}`}>
                      <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4 group cursor-pointer">
                        {similarProduct.image ? (
                          <Image
                            src={similarProduct.image}
                            alt={similarProduct.name}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : (
                          <FiShoppingCart className="w-16 h-16 text-gray-400" />
                        )}
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-grow">
                      <Link href={`/shop/${similarProduct.slug}`}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors cursor-pointer line-clamp-2">
                          {similarProduct.name}
                        </h3>
                      </Link>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          {similarProduct.discount && similarProduct.discount > 0 ? (
                            <>
                              <span className="text-xl font-bold text-primary-600">
                                {((similarProduct.price * (100 - similarProduct.discount)) / 100).toFixed(2)} RON
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                {similarProduct.price} RON
                              </span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-primary-600">
                              {similarProduct.price} RON
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            const finalPrice = similarProduct.discount && similarProduct.discount > 0
                              ? (similarProduct.price * (100 - similarProduct.discount)) / 100
                              : similarProduct.price
                            
                            addItem({
                              product_id: similarProduct.id,
                              product_name: similarProduct.name,
                              price: finalPrice,
                              image: similarProduct.image,
                              quantity: 1,
                            })
                            setIsCartOpen(true)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm"
                        >
                          <FiShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

