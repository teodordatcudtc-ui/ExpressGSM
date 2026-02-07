'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiCreditCard, FiDollarSign, FiArrowLeft } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'

const CHECKOUT_DATA_KEY = 'checkout_plata_data'

interface CheckoutStoredData {
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  user_id: number | null
  payment_method?: 'ramburs' | 'card_online'
  delivery_method: 'curier_rapid' | 'ridicare_personala' | 'curier_verificare'
  items: { product_id: number; product_name: string; quantity: number; price: number }[]
  subtotal: number
  shippingCost: number
  total: number
}

export default function CheckoutPlataPage() {
  const router = useRouter()
  const { clearCart } = useCartStore()
  const [data, setData] = useState<CheckoutStoredData | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'ramburs' | 'card_online'>('ramburs')
  const [isProcessing, setIsProcessing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return
    try {
      const raw = sessionStorage.getItem(CHECKOUT_DATA_KEY)
      if (!raw) {
        router.replace('/checkout')
        return
      }
      const parsed = JSON.parse(raw) as CheckoutStoredData
      if (!parsed?.items?.length || parsed.total == null) {
        router.replace('/checkout')
        return
      }
      setData(parsed)
      if (parsed?.delivery_method === 'curier_verificare' || parsed?.payment_method === 'card_online') {
        setPaymentMethod('card_online')
      } else if (parsed?.payment_method === 'ramburs') {
        setPaymentMethod('ramburs')
      }
    } catch {
      router.replace('/checkout')
    }
  }, [mounted, router])

  const handlePlaceOrder = async () => {
    if (!data) return
    if (data.delivery_method === 'curier_verificare' && paymentMethod !== 'card_online') {
      alert('Opțiunea „Cu verificare colet” necesită plată cu cardul online.')
      return
    }
    setIsProcessing(true)
    try {
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: data.customer_name,
          customer_email: data.customer_email,
          customer_phone: data.customer_phone,
          customer_address: data.customer_address,
          user_id: data.user_id,
          delivery_method: data.delivery_method,
          payment_method: paymentMethod,
          items: data.items.map((i) => ({
            product_id: i.product_id,
            product_name: i.product_name,
            quantity: i.quantity,
            price: i.price,
          })),
          total_amount: data.total,
        }),
      })
      if (!orderRes.ok) throw new Error('Failed to create order')
      const order = await orderRes.json()

      if (paymentMethod === 'card_online') {
        const netopiaRes = await fetch('/api/netopia/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: order.id }),
        })
        if (!netopiaRes.ok) {
          const err = await netopiaRes.json().catch(() => ({}))
          throw new Error(err?.error || 'Netopia payment could not be started')
        }
        const { formAction, env_key, data: envData, iv, cipher } = await netopiaRes.json()
        clearCart()
        sessionStorage.removeItem(CHECKOUT_DATA_KEY)
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = formAction
        form.style.display = 'none'
        for (const [name, value] of Object.entries({ env_key, data: envData, iv, cipher })) {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = name
          input.value = value as string
          form.appendChild(input)
        }
        document.body.appendChild(form)
        form.submit()
        return
      }

      clearCart()
      sessionStorage.removeItem(CHECKOUT_DATA_KEY)
      router.replace(`/checkout?placed=${encodeURIComponent(order.order_number)}`)
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : 'A apărut o eroare. Te rugăm să încerci din nou.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!mounted || data === null) {
    return (
      <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Se încarcă...</p>
      </div>
    )
  }

  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-2xl">
        <Link
          href="/checkout"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium"
        >
          <FiArrowLeft className="w-4 h-4" />
          Înapoi la datele comenzii
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Metodă de plată
          </h1>

          {/* Rezumat */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Rezumat comandă</h2>
            <div className="space-y-2 text-sm">
              {data.items.map((item) => (
                <div key={item.product_id} className="flex justify-between">
                  <span className="text-gray-700">
                    {item.product_name} × {item.quantity}
                  </span>
                  <span className="font-medium text-primary-600">
                    {(item.price * item.quantity).toFixed(2)} RON
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-600">Subtotal</span>
                <span>{data.subtotal.toFixed(2)} RON</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Livrare ({data.delivery_method === 'curier_verificare' ? 'Cu verificare colet' : data.delivery_method === 'curier_rapid' ? 'Curier rapid' : 'Ridicare personală'})
                </span>
                <span>{data.shippingCost === 0 ? 'Gratuit' : `${data.shippingCost.toFixed(2)} RON`}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2">
                <span>Total</span>
                <span className="text-primary-600">{data.total.toFixed(2)} RON</span>
              </div>
            </div>
          </div>

          {/* Metodă plată */}
          <div className="space-y-3 mb-8">
            {data.delivery_method === 'curier_verificare' && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                Livrarea cu verificare colet este disponibilă doar cu plată cu cardul online.
              </p>
            )}
            <label className="block text-sm font-semibold text-gray-700">
              Alege metoda de plată *
            </label>
            <label
              className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-colors ${
                data.delivery_method === 'curier_verificare'
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-75'
                  : paymentMethod === 'ramburs'
                  ? 'border-primary-600 bg-primary-50 cursor-pointer'
                  : 'border-gray-200 bg-white hover:border-gray-300 cursor-pointer'
              }`}
            >
              <input
                type="radio"
                name="payment_method"
                checked={paymentMethod === 'ramburs'}
                onChange={() => setPaymentMethod('ramburs')}
                disabled={data.delivery_method === 'curier_verificare'}
                className="mt-1 text-primary-600"
              />
              <div className="flex-1">
                <span className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiDollarSign className="w-5 h-5 text-primary-600" />
                  La ramburs
                </span>
                <p className="text-sm text-gray-600 mt-0.5">
                  {data.delivery_method === 'curier_verificare' ? 'Indisponibil pentru livrare cu verificare colet' : 'Plătești la primirea coletului'}
                </p>
              </div>
            </label>
            <label
              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                paymentMethod === 'card_online'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="payment_method"
                checked={paymentMethod === 'card_online'}
                onChange={() => setPaymentMethod('card_online')}
                className="mt-1 text-primary-600"
              />
              <div className="flex-1">
                <span className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiCreditCard className="w-5 h-5 text-primary-600" />
                  Plată cu cardul online
                </span>
                <p className="text-sm text-gray-600 mt-0.5">Plată securizată cu cardul (Netopia)</p>
              </div>
            </label>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              'Se procesează...'
            ) : (
              <>
                <FiCheckCircle className="w-5 h-5" />
                Plasează Comanda
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
