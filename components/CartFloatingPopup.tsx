'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FiShoppingCart } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'

interface CartFloatingPopupProps {
  onOpenCart: () => void
}

export default function CartFloatingPopup({ onOpenCart }: CartFloatingPopupProps) {
  const { items, getTotal } = useCartStore()
  const count = items.reduce((acc, i) => acc + i.quantity, 0)
  const total = getTotal()

  if (count === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-[280px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <FiShoppingCart className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {count} {count === 1 ? 'produs' : 'produse'} în coș
              </p>
              <p className="text-primary-600 font-bold">{total.toFixed(2)} RON</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onOpenCart}
              className="flex-1 btn-primary text-sm py-2 rounded-lg flex items-center justify-center gap-1"
            >
              <FiShoppingCart className="w-4 h-4" />
              Vezi coș
            </button>
            <Link
              href="/checkout"
              className="flex-1 btn-secondary text-sm py-2 rounded-lg text-center font-semibold"
            >
              Finalizează
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
