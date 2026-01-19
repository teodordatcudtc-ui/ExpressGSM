'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiMail, FiLock, FiLogIn, FiAlertCircle, FiArrowRight } from 'react-icons/fi'
import { useUserStore } from '@/store/userStore'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useUserStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        // Small delay to ensure state is persisted
        await new Promise(resolve => setTimeout(resolve, 100))
        router.push('/profile')
        router.refresh()
      } else {
        setError('Email sau parolă incorectă')
      }
    } catch (err) {
      setError('Eroare la autentificare')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Conectează-te
          </h1>
          <p className="text-gray-600">
            Nu ai cont?{' '}
            <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-semibold">
              Creează unul aici
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2"
            >
              <FiAlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="email@exemplu.ro"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Parolă *
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="Parola ta"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Se conectează...</span>
              </>
            ) : (
              <>
                <FiLogIn className="w-5 h-5" />
                <span>Conectează-te</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/checkout"
            className="text-sm text-gray-600 hover:text-primary-600 flex items-center justify-center gap-2"
          >
            Continuă fără cont
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
