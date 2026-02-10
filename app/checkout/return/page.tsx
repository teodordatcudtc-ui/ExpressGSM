'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi'

/**
 * Netopia redirects the user here after payment (return URL).
 * Query: order_number, token (token semnat pentru confirmare plată).
 * Apelăm confirm-return ca să marchem comanda ca plătită, apoi afișăm success.
 */
function ReturnContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order_number')
  const token = searchParams.get('token')
  const [mounted, setMounted] = useState(false)
  const [confirmDone, setConfirmDone] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !orderNumber) return
    if (token) {
      fetch('/api/netopia/confirm-return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_number: orderNumber, token }),
      })
        .then(() => setConfirmDone(true))
        .catch(() => setConfirmDone(true))
    } else {
      setConfirmDone(true)
    }
  }, [mounted, orderNumber, token])

  useEffect(() => {
    if (!mounted || !orderNumber || !confirmDone) return
    const t = setTimeout(() => {
      router.replace(`/checkout?placed=${encodeURIComponent(orderNumber)}`)
    }, 3000)
    return () => clearTimeout(t)
  }, [mounted, orderNumber, confirmDone, router])

  if (!mounted) {
    return (
      <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Se încarcă...</p>
      </div>
    )
  }

  if (!orderNumber) {
    return (
      <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <p className="text-gray-600 mb-4">Parametri lipsă. Verifică linkul sau revino la magazin.</p>
          <Link href="/shop" className="btn-primary inline-block">
            Înapoi la magazin
          </Link>
        </div>
      </div>
    )
  }

  const stillConfirming = token && !confirmDone

  return (
    <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Plată finalizată</h2>
        <p className="text-gray-600 mb-4">
          Comanda <span className="font-bold text-primary-600">{orderNumber}</span> a fost primită.
          {stillConfirming && (
            <span className="block mt-2 text-sm text-gray-500">Confirmăm plata...</span>
          )}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          {stillConfirming ? 'Se încarcă...' : 'Ești redirecționat automat la pagina de confirmare...'}
        </p>
        <Link
          href={`/checkout?placed=${encodeURIComponent(orderNumber)}`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          <FiArrowLeft className="w-4 h-4" />
          Mergi la confirmarea comenzii
        </Link>
      </div>
    </div>
  )
}

export default function CheckoutReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Se încarcă...</p>
        </div>
      }
    >
      <ReturnContent />
    </Suspense>
  )
}
