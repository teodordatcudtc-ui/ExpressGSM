'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCheck, FiX } from 'react-icons/fi'
import AdminGuard from '@/components/AdminGuard'

interface OrderItem {
  id: number
  product_name: string
  quantity: number
  price: number
}

interface Order {
  id: number
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  total_amount: number
  status: string
  payment_status: string
  created_at: string
  delivery_method?: 'curier_rapid' | 'ridicare_personala' | null
  payment_method?: 'ramburs' | 'card_online' | null
  items: OrderItem[]
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [params.id])

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${params.id}`)
      const data = await res.json()
      setOrder(data)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (status: string, paymentStatus?: string) => {
    try {
      const res = await fetch(`/api/orders/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          payment_status: paymentStatus || order?.payment_status,
        }),
      })
      if (res.ok) {
        await fetchOrder()
        // Show success message
        alert(`Comanda a fost actualizată: ${status === 'completed' ? 'Finalizată' : 'În procesare'}`)
      } else {
        const error = await res.json()
        alert(`Eroare: ${error.error || 'Nu s-a putut actualiza comanda'}`)
      }
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Eroare la actualizarea comenzii')
    }
  }

  if (loading) {
    return (
      <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Se încarcă...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Comandă negăsită</p>
      </div>
    )
  }

  return (
    <AdminGuard>
      <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <button
          onClick={() => {
            // Refresh orders list when going back
            router.push('/admin?tab=orders')
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <FiArrowLeft className="w-5 h-5" />
          Înapoi la Comenzi
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Comandă #{order.order_number}</h1>
              <p className="text-gray-600 text-sm sm:text-base">Plasată pe {new Date(order.created_at).toLocaleDateString('ro-RO')}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded text-sm font-semibold ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
              <span className={`px-3 py-1 rounded text-sm font-semibold ${
                (order.payment_status === 'paid' || order.payment_status === 'platita') ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.payment_status}
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Date Client</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nume</p>
                <p className="font-semibold break-words">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold break-words">{order.customer_email || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telefon</p>
                <p className="font-semibold break-words">{order.customer_phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-600">Metodă livrare</p>
                <p className="font-semibold break-words">
                  {order.delivery_method === 'ridicare_personala'
                    ? 'Ridicare personală din depozit (Pajurei 7, Sector 1, București, 011318)'
                    : 'Curier rapid – Livrare la adresă (28,00 lei)'}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-600">Metodă plată</p>
                <p className="font-semibold break-words">
                  {order.payment_method === 'card_online'
                    ? 'Plată cu cardul online'
                    : 'La ramburs'}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-600">Adresă / Locație livrare</p>
                <p className="font-semibold break-words">{order.customer_address}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Produse</h2>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded gap-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 break-words">{item.product_name}</p>
                    <p className="text-sm text-gray-600">Cantitate: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary-600 text-lg sm:text-base">{(item.price * item.quantity).toFixed(2)} RON</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-xl sm:text-2xl font-bold">
              <span>Total:</span>
              <span className="text-primary-600">{order.total_amount.toFixed(2)} RON</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => updateOrderStatus('processing')}
              className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FiCheck className="w-5 h-5" />
              Marchează ca Procesare
            </button>
            <button
              onClick={() => updateOrderStatus('completed', 'paid')}
              className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FiCheck className="w-5 h-5" />
              Finalizează Comanda
            </button>
          </div>
        </motion.div>
      </div>
    </div>
    </AdminGuard>
  )
}

