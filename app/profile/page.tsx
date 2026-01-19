'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX, FiShoppingBag, FiCalendar, FiCheckCircle, FiArrowLeft } from 'react-icons/fi'
import { useUserStore } from '@/store/userStore'
import { counties, countries } from '@/lib/romania-data'

// Import useUserStore.getState for direct access
const getUserStore = () => useUserStore.getState()

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, fetchUserData, logout } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: 'România',
    county: '',
    city: '',
    address: '',
  })

  useEffect(() => {
    // Check authentication and fetch data
    const checkAuth = async () => {
      const storeState = getUserStore()
      
      if (!storeState.isAuthenticated && !storeState.userId) {
        router.push('/auth/login')
        return
      }
      
      // If we have userId but not authenticated, try to fetch user data
      if (storeState.userId && !storeState.isAuthenticated) {
        await storeState.fetchUserData()
        const updatedState = getUserStore()
        if (!updatedState.isAuthenticated) {
          router.push('/auth/login')
          return
        }
      }
      
      // Fetch user data and orders
      await fetchUserData()
      fetchOrders()
    }
    
    checkAuth()
  }, [router, fetchUserData])

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || 'România',
        county: user.county || '',
        city: user.city || '',
        address: user.address || '',
      })
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      if (!user?.id) return
      
      const response = await fetch(`/api/orders?userId=${user.id}`)
      if (response.ok) {
        const data = await response.json()
        setOrders(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          ...formData,
        }),
      })

      if (response.ok) {
        await fetchUserData()
        setIsEditing(false)
        alert('Datele au fost actualizate cu succes!')
      } else {
        const error = await response.json()
        alert(error.error || 'Eroare la actualizarea datelor')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Eroare la actualizarea datelor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || 'România',
        county: user.county || '',
        city: user.city || '',
        address: user.address || '',
      })
    }
    setIsEditing(false)
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Se încarcă...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Înapoi la pagina principală</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Contul Meu
              </h1>
              <p className="text-gray-600">
                Gestionează datele tale personale și vezi istoricul comenzilor
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Deconectează-te
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FiUser className="w-6 h-6" />
                  Date Personale
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    <span>Editează</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prenume *
                    </label>
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nume *
                    </label>
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email-ul nu poate fi modificat</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Țară *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Județ *
                    </label>
                    <select
                      value={formData.county}
                      onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Selectează județul</option>
                      {counties.map((county) => (
                        <option key={county} value={county}>
                          {county}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Localitate *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiMapPin className="w-4 h-4" />
                    Adresă de Livrare *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiSave className="w-4 h-4" />
                      <div>{isLoading ? 'Se salvează...' : 'Salvează'}</div>
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                      <div>Anulează</div>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Orders History */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FiShoppingBag className="w-6 h-6" />
                Comenzile Mele
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <FiShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nu ai comenzi</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/profile/orders/${order.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">
                          {order.order_number}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status === 'completed' ? 'Finalizată' :
                           order.status === 'pending' ? 'În așteptare' :
                           order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <FiCalendar className="w-4 h-4" />
                        <span>
                          {new Date(order.created_at).toLocaleDateString('ro-RO', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-primary-600">
                        {parseFloat(order.total_amount).toFixed(2)} RON
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
