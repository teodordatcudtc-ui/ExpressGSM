'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FiCheckCircle, FiShoppingCart, FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'

interface CheckoutForm {
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>()

  const total = getTotal()

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">Coșul tău este gol</p>
          <button
            onClick={() => router.push('/shop')}
            className="btn-primary"
          >
            Continuă Cumpărăturile
          </button>
        </div>
      </div>
    )
  }

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          items: items.map(item => ({
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            price: item.price,
          })),
          total_amount: total,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const order = await response.json()
      setOrderNumber(order.order_number)
      setOrderSuccess(true)
      clearCart()
    } catch (error) {
      console.error('Error creating order:', error)
      alert('A apărut o eroare. Te rugăm să încerci din nou.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (orderSuccess) {
    return (
      <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FiCheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Comandă Plasată cu Succes!</h2>
          <p className="text-gray-600 mb-4">
            Număr comandă: <span className="font-bold text-primary-600">{orderNumber}</span>
          </p>
          <p className="text-gray-600 mb-6">
            Vei primi un email de confirmare în curând.
          </p>
          <button
            onClick={() => router.push('/shop')}
            className="btn-primary w-full"
          >
            Continuă Cumpărăturile
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Finalizează <span className="text-primary-600">Comanda</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FiUser className="w-6 h-6" />
                Date de Contact
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nume Complet *
                  </label>
                  <input
                    {...register('customer_name', { required: 'Numele este obligatoriu' })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="Ion Popescu"
                  />
                  {errors.customer_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.customer_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Email *
                  </label>
                  <input
                    {...register('customer_email', {
                      required: 'Email-ul este obligatoriu',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email invalid',
                      },
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="ion.popescu@example.com"
                  />
                  {errors.customer_email && (
                    <p className="text-red-600 text-sm mt-1">{errors.customer_email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    Telefon *
                  </label>
                  <input
                    {...register('customer_phone', {
                      required: 'Telefonul este obligatoriu',
                      pattern: {
                        value: /^[0-9+\s-]+$/,
                        message: 'Număr de telefon invalid',
                      },
                    })}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="0712345678"
                  />
                  {errors.customer_phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.customer_phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiMapPin className="w-4 h-4" />
                    Adresă de Livrare *
                  </label>
                  <textarea
                    {...register('customer_address', { required: 'Adresa este obligatorie' })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="Strada, Număr, Oraș, Județ"
                  />
                  {errors.customer_address && (
                    <p className="text-red-600 text-sm mt-1">{errors.customer_address.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Se procesează...' : 'Plasează Comanda'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Rezumat Comandă</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product_id} className="flex justify-between items-start pb-4 border-b">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.product_name}</p>
                      <p className="text-sm text-gray-600">Cantitate: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-primary-600">
                      {(item.price * item.quantity).toFixed(2)} RON
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span className="text-primary-600">{total.toFixed(2)} RON</span>
                </div>
                <p className="text-sm text-gray-600">
                  * Plata se va efectua la livrare (ramburs)
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

