'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingBag, FiPlus, FiChevronDown } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import { getProductPriceInfo } from '@/lib/product-price'

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
  discount_type?: 'percent' | 'fixed' | null
  price_reduced?: number | null
  image?: string
  category_id: number
  category_name: string
  stock: number
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Cele mai noi' },
  { value: 'price-asc', label: 'Preț crescător' },
  { value: 'price-desc', label: 'Preț descrescător' },
  { value: 'name', label: 'Nume A-Z' },
]

export default function HomeProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('newest')
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const close = () => {
      setShowSortDropdown(false)
      setShowFilterDropdown(false)
    }
    if (showSortDropdown || showFilterDropdown) {
      document.addEventListener('click', close)
      return () => document.removeEventListener('click', close)
    }
  }, [showSortDropdown, showFilterDropdown])

  useEffect(() => {
    fetchProducts()
  }, [categoryFilter])

  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/categories?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      const data = await res.json()
      setCategories(Array.isArray(data) ? data.filter((c: Category) => !c.parent_id) : [])
    } catch (e) {
      console.error(e)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const url = categoryFilter
        ? `/api/products?categoryId=${categoryFilter}&active=true&includeSubcategories=true`
        : '/api/products?active=true'
      const res = await fetch(url)
      const data = await res.json()
      let list = Array.isArray(data) ? data.filter((p: Product) => p.image) : []
      list = list.slice(0, 8)
      setProducts(list)
    } catch (e) {
      console.error(e)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const { finalPrice } = getProductPriceInfo(product)
    addItem({
      product_id: product.id,
      product_name: product.name,
      price: finalPrice,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Produse <span className="text-primary-600">recomandate</span>
          </h2>
          <p className="text-gray-600 mb-6">
            Telefoane, tablete și accesorii la prețuri avantajoase
          </p>

          {/* Ordonează & Filtrează - centrate */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowSortDropdown(!showSortDropdown); setShowFilterDropdown(false) }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
              >
                Ordonează
                <FiChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showSortDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20" onClick={(e) => e.stopPropagation()}>
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => { setSortBy(opt.value); setShowSortDropdown(false) }}
                      className={`block w-full text-left px-4 py-2 text-sm font-medium ${sortBy === opt.value ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowFilterDropdown(!showFilterDropdown); setShowSortDropdown(false) }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
              >
                Filtrează
                <FiChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showFilterDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 max-h-64 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => { setCategoryFilter(null); setShowFilterDropdown(false) }}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium ${categoryFilter === null ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Toate categoriile
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => { setCategoryFilter(cat.id); setShowFilterDropdown(false) }}
                      className={`block w-full text-left px-4 py-2 text-sm font-medium ${categoryFilter === cat.id ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Se încarcă produsele...</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            Nu există produse în această categorie.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
              >
                <Link href={`/shop/${product.slug}`}>
                  <div className="relative h-40 md:h-48 bg-white flex items-center justify-center p-3">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <FiShoppingBag className="w-12 h-12 text-gray-300" />
                    )}
                    {(() => {
                      const priceInfo = getProductPriceInfo(product)
                      return priceInfo.hasDiscount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                          -{priceInfo.discountPercentDisplay}%
                        </span>
                      )
                    })()}
                  </div>
                </Link>
                <div className="p-3 md:p-4 flex flex-col flex-grow">
                  <p className="text-xs text-gray-500 mb-0.5">{product.category_name}</p>
                  <Link href={`/shop/${product.slug}`}>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2 hover:text-primary-600">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="mt-auto pt-3 flex items-end justify-between gap-2 min-h-[44px]">
                    <span className="font-bold text-primary-600 text-sm md:text-base">
                      {getProductPriceInfo(product).finalPrice.toFixed(2)} RON
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 text-xl font-light leading-none"
                      aria-label="Adaugă în coș"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FiShoppingBag className="w-5 h-5" />
            Vezi toate produsele
          </Link>
        </div>
      </div>
    </section>
  )
}
