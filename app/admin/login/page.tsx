'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiLock, FiLogIn, FiAlertCircle } from 'react-icons/fi'
import { useAuthStore } from '@/store/authStore'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, login } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(password)
      if (success) {
        router.push('/admin')
      } else {
        setError('Parolă incorectă')
      }
    } catch (err) {
      setError('Eroare la autentificare')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiLock className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Introdu parola pentru a accesa panoul de administrare</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Parolă
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Introdu parola"
                required
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                autoFocus
              />
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600"
            >
              <FiAlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Se autentifică...</span>
              </>
            ) : (
              <>
                <FiLogIn className="w-5 h-5" />
                <span>Autentificare</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            ← Înapoi la site
          </a>
        </div>
      </motion.div>
    </div>
  )
}

