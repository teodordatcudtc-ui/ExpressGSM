'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiSmartphone, FiTablet, FiMonitor, FiShoppingBag, FiMaximize2, FiBattery, FiTag } from 'react-icons/fi'

interface Category {
  id: number
  name: string
  slug: string
  parent_id?: number | null
}

// Icoane după slug – doar pentru categorii care există în DB
const SLUG_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  telefoane: FiSmartphone,
  tablete: FiTablet,
  laptopuri: FiMonitor,
  accesorii: FiShoppingBag,
  ecrane: FiMaximize2,
  baterii: FiBattery,
}

const PREFERRED_ORDER = ['telefoane', 'tablete', 'laptopuri', 'ecrane', 'baterii', 'accesorii']

export default function HomeCategoriesStrip() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        const list = Array.isArray(data) ? data : []
        const mainOnly = list.filter((c: Category) => !c.parent_id)
        mainOnly.sort((a: Category, b: Category) => {
          const i = PREFERRED_ORDER.indexOf(a.slug)
          const j = PREFERRED_ORDER.indexOf(b.slug)
          if (i === -1 && j === -1) return a.name.localeCompare(b.name)
          if (i === -1) return 1
          if (j === -1) return -1
          return i - j
        })
        setCategories(mainOnly)
      } catch (e) {
        console.error('Error fetching categories:', e)
      }
    }
    fetchCategories()
  }, [])

  if (categories.length === 0) return null

  return (
    <section className="bg-white border-b border-gray-100 pt-2 pb-4 md:pt-6 md:pb-6 -mt-1 md:mt-0">
      <div className="container-custom">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap justify-center">
          {categories.map((cat) => {
            const Icon = SLUG_ICONS[cat.slug] ?? FiTag
            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[80px] md:min-w-[90px] p-3 rounded-xl bg-gray-50 hover:bg-primary-50 hover:text-primary-600 transition-colors group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-primary-200 group-hover:bg-primary-50 transition-colors shadow-sm">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-gray-700 group-hover:text-primary-600" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-primary-600 text-center leading-tight">
                  {cat.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
