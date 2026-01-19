'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { motion } from 'framer-motion'
import { FiLock } from 'react-icons/fi'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    } else {
      setIsChecking(false)
    }
  }, [isAuthenticated, router])

  if (isChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiLock className="w-8 h-8 text-primary-600" />
          </div>
          <p className="text-gray-600">Se verifică autentificarea...</p>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}

