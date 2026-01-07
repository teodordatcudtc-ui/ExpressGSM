'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowLeft, FiPlus, FiMinus, FiShoppingCart, FiCheckCircle } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import Cart from '@/components/Cart'

interface Product {
  id: number
  name: string
  slug: string
  description?: string
  price: number
  image?: string
  category_id: number
  category_name: string
  category_slug: string
  stock: number
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
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
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return

    addItem({
      product_id: product.id,
      product_name: product.name,
      price: product.price,
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
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
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
      <div className="section-padding bg-gray-50 min-h-screen">
        <div className="container-custom max-w-6xl">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Înapoi</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex items-center justify-center p-8"
            >
              <div className="relative w-full aspect-square max-h-[600px] bg-white">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                    <FiShoppingCart className="w-32 h-32 text-gray-400" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              {/* Category */}
              <Link
                href={`/shop?category=${product.category_slug}`}
                className="inline-block text-sm text-primary-600 hover:text-primary-700 font-semibold mb-4"
              >
                {product.category_name}
              </Link>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary-600">{product.price}</span>
                <span className="text-xl text-gray-600 ml-2">RON</span>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Descriere</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                  product.stock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? (
                    <>
                      <FiCheckCircle className="w-5 h-5" />
                      În stoc ({product.stock} bucăți disponibile)
                    </>
                  ) : (
                    'Stoc epuizat'
                  )}
                </span>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cantitate
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiMinus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-bold text-gray-900 w-16 text-center">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiPlus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addedToCart}
                className={`w-full btn-primary flex items-center justify-center gap-2 text-lg py-4 ${
                  addedToCart
                    ? 'bg-green-600 hover:bg-green-700'
                    : product.stock === 0
                    ? 'opacity-50 cursor-not-allowed'
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
                    <span>Adaugă în Coș - {(product.price * quantity).toFixed(2)} RON</span>
                  </>
                )}
              </button>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <p>✓ Livrare rapidă în toată țara</p>
                  <p>✓ Garanție pentru toate produsele</p>
                  <p>✓ Suport client dedicat</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

