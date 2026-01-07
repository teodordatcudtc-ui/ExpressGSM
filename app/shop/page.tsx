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
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { addItem, getItemCount } = useCartStore()

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  useEffect(() => {
    fetchProducts(selectedCategory || undefined)
  }, [selectedCategory])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProducts = async (categoryId?: number) => {
    try {
      const url = categoryId
        ? `/api/products?categoryId=${categoryId}`
        : '/api/products'
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
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
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Toate Categoriile
            </button>
            {categories.map((category) => (
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

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Nu există produse în această categorie</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
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
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.category_name}</p>
                    <Link href={`/shop/${product.slug}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    )}
                    <div className="flex items-center justify-between">
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

