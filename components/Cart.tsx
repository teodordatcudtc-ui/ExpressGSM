'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiShoppingCart, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore()
  const total = getTotal()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FiShoppingCart className="w-6 h-6" />
                Coș de Cumpărături
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FiShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Coșul tău este gol</p>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="mt-4 btn-primary"
                  >
                    Continuă Cumpărăturile
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.product_name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.product_name}</h3>
                        <p className="text-primary-600 font-bold">{item.price} RON</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.product_id)}
                            className="ml-auto p-1 hover:bg-red-100 text-red-600 rounded"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Subtotal: {(item.price * item.quantity).toFixed(2)} RON
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary-600">{total.toFixed(2)} RON</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full btn-primary text-center"
                >
                  Finalizează Comanda
                </Link>
                <button
                  onClick={clearCart}
                  className="block w-full btn-secondary text-center"
                >
                  Golește Coșul
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

