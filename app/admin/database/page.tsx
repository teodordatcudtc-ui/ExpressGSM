'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiDatabase, FiPackage, FiShoppingBag, FiTag, FiList, FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import AdminGuard from '@/components/AdminGuard'

interface TableData {
  [key: string]: any
}

export default function DatabaseViewPage() {
  const [activeTable, setActiveTable] = useState<string>('categories')
  const [tableData, setTableData] = useState<TableData[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false)
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
  })
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    orders: 0,
    orderItems: 0,
  })

  const tables = [
    { id: 'categories', name: 'Categorii', icon: FiTag },
    { id: 'products', name: 'Produse', icon: FiPackage },
    { id: 'orders', name: 'Comenzi', icon: FiShoppingBag },
    { id: 'order_items', name: 'Items Comenzi', icon: FiList },
  ]

  useEffect(() => {
    fetchStats()
    fetchTableData(activeTable)
  }, [activeTable])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/database/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchTableData = async (table: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/database/table?name=${table}`)
      if (!res.ok) {
        throw new Error(`Failed to fetch table data: ${res.statusText}`)
      }
      const data = await res.json()
      // Ensure data is an array
      setTableData(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching table data:', error)
      setTableData([])
    } finally {
      setLoading(false)
    }
  }

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '-'
    if (typeof value === 'boolean') return value ? 'Da' : 'Nu'
    if (typeof value === 'number') {
      // Check if it's a price
      if (value > 0 && value < 10000 && value % 1 !== 0) {
        return `${value.toFixed(2)} RON`
      }
      return value.toString()
    }
    if (typeof value === 'string' && value.length > 50) {
      return value.substring(0, 50) + '...'
    }
    return String(value)
  }

  const getTableColumns = (): string[] => {
    if (!tableData || tableData.length === 0) return []
    if (!tableData[0] || typeof tableData[0] !== 'object') return []
    return Object.keys(tableData[0])
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm),
      })

      if (response.ok) {
        setShowAddCategoryForm(false)
        setCategoryForm({ name: '', slug: '', description: '', image: '' })
        fetchTableData(activeTable)
        fetchStats()
      } else {
        const error = await response.json()
        alert(error.error || 'Eroare la adăugare categorie')
      }
    } catch (error) {
      console.error('Error adding category:', error)
      alert('Eroare la adăugare categorie')
    }
  }

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Ești sigur că vrei să ștergi această categorie?\n\nDacă categoria este folosită de produse, nu va putea fi ștearsă.')) return

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchTableData(activeTable)
        fetchStats()
        alert('Categoria a fost ștearsă cu succes')
      } else {
        const error = await response.json()
        alert(error.error || 'Eroare la ștergere categorie')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Eroare la ștergere categorie')
    }
  }

  return (
    <AdminGuard>
      <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-7xl">
        <div className="flex items-center gap-3 mb-8">
          <FiDatabase className="w-8 h-8 text-primary-600" />
          <h1 className="text-4xl font-bold text-gray-900">Vizualizare Baza de Date</h1>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Categorii</p>
                <p className="text-3xl font-bold text-primary-600">{stats.categories}</p>
              </div>
              <FiTag className="w-8 h-8 text-primary-600 opacity-50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Produse</p>
                <p className="text-3xl font-bold text-green-600">{stats.products}</p>
              </div>
              <FiPackage className="w-8 h-8 text-green-600 opacity-50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Comenzi</p>
                <p className="text-3xl font-bold text-orange-600">{stats.orders}</p>
              </div>
              <FiShoppingBag className="w-8 h-8 text-orange-600 opacity-50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Items Comenzi</p>
                <p className="text-3xl font-bold text-purple-600">{stats.orderItems}</p>
              </div>
              <FiList className="w-8 h-8 text-purple-600 opacity-50" />
            </div>
          </motion.div>
        </div>

        {/* Table Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Selectează Tabel</h2>
          <div className="flex flex-wrap gap-3">
            {tables.map((table) => {
              const Icon = table.icon
              const isActive = activeTable === table.id
              return (
                <button
                  key={table.id}
                  onClick={() => setActiveTable(table.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {table.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Table Data */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {tables.find(t => t.id === activeTable)?.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {tableData.length} {tableData.length === 1 ? 'înregistrare' : 'înregistrări'}
              </p>
            </div>
            {activeTable === 'categories' && (
              <button
                onClick={() => setShowAddCategoryForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <FiPlus className="w-5 h-5" />
                Adaugă Categorie
              </button>
            )}
          </div>

          {/* Add Category Form Modal */}
          {showAddCategoryForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Adaugă Categorie Nouă</h3>
                  <button
                    onClick={() => {
                      setShowAddCategoryForm(false)
                      setCategoryForm({ name: '', slug: '', description: '', image: '' })
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleAddCategory} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nume Categorie *
                    </label>
                    <input
                      type="text"
                      value={categoryForm.name}
                      onChange={(e) => {
                        setCategoryForm({
                          ...categoryForm,
                          name: e.target.value,
                          slug: generateSlug(e.target.value),
                        })
                      }}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      value={categoryForm.slug}
                      onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descriere
                    </label>
                    <textarea
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      URL Imagine
                    </label>
                    <input
                      type="text"
                      value={categoryForm.image}
                      onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                      placeholder="/uploads/category.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="btn-primary flex-1">
                      Adaugă Categorie
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddCategoryForm(false)
                        setCategoryForm({ name: '', slug: '', description: '', image: '' })
                      }}
                      className="btn-secondary flex-1"
                    >
                      Anulează
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">Se încarcă...</p>
            </div>
          ) : tableData.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">Nu există date în acest tabel</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {getTableColumns().map((column) => (
                      <th
                        key={column}
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        {column}
                      </th>
                    ))}
                    {activeTable === 'categories' && (
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Acțiuni
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {getTableColumns().map((column) => (
                        <td
                          key={column}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          {formatValue(row[column])}
                        </td>
                      ))}
                      {activeTable === 'categories' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteCategory(row.id)}
                            className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                            title="Șterge categorie"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <a
            href="/admin"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            ← Înapoi la Dashboard
          </a>
        </div>
      </div>
    </div>
    </AdminGuard>
  )
}

