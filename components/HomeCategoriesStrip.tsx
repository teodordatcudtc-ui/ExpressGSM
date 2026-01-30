'use client'

import Link from 'next/link'
import { FiSmartphone, FiTablet, FiMonitor, FiShoppingBag, FiMaximize2, FiBattery } from 'react-icons/fi'

const categories = [
  { name: 'Telefoane', slug: 'telefoane', icon: FiSmartphone },
  { name: 'Tablete', slug: 'tablete', icon: FiTablet },
  { name: 'Laptopuri', slug: 'laptopuri', icon: FiMonitor },
  { name: 'Accesorii', slug: 'accesorii', icon: FiShoppingBag },
  { name: 'Ecrane', slug: 'ecrane', icon: FiMaximize2 },
  { name: 'Baterii', slug: 'baterii', icon: FiBattery },
]

export default function HomeCategoriesStrip() {
  return (
    <section className="bg-white border-b border-gray-100 py-4 md:py-6">
      <div className="container-custom">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.slug}
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
