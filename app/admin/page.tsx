'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiPackage, FiShoppingBag, FiPlus, FiEdit, FiTrash2, FiEye, FiUpload, FiX, FiDatabase, FiLogOut } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'
import AdminGuard from '@/components/AdminGuard'
import { useAuthStore } from '@/store/authStore'

interface Category {
  id: number
  name: string
  slug: string
  parent_id?: number | null
  parent_name?: string
}

interface Product {
  id: number
  name: string
  slug: string
  description?: string
  price: number
  discount?: number
  discount_type?: 'percent' | 'fixed' | null
  price_reduced?: number | null
  image?: string
  images?: string[]
  category_id: number
  category_name: string
  stock: number
  active: number
}

interface Order {
  id: number
  order_number: string
  customer_name: string
  customer_email: string
  total_amount: number
  status: string
  payment_status: string
  created_at: string
  item_count: number
}

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { logout } = useAuthStore()
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    discount_type: 'percent' as 'percent' | 'fixed',
    discount: '0',
    price_reduced: '',
    image: '',
    images: [] as string[],
    category_id: '',
    stock: '1',
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const multiFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchProducts()
    fetchOrders()
    fetchCategories()
    
    // Refresh orders every 5 seconds to see status updates
    const interval = setInterval(() => {
      if (activeTab === 'orders') {
        fetchOrders()
      }
    }, 5000)
    
    return () => clearInterval(interval)
  }, [activeTab])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?active=false')
      const data = await res.json()
      // Ensure products is always an array
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([]) // Set empty array on error
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (!res.ok) {
        console.error('Failed to fetch categories:', res.status, res.statusText)
        setCategories([])
        return
      }
      const data = await res.json()
      console.log('Categories fetched:', data) // Debug log
      // Ensure categories is always an array
      const categoriesArray = Array.isArray(data) ? data : []
      setCategories(categoriesArray)
      console.log('Categories set:', categoriesArray.length, 'categories') // Debug log
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([]) // Set empty array on error
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleMultipleImagesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    setIsUploading(true)
    try {
      const urls: string[] = []
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i])
        urls.push(url)
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
        image: prev.images.length === 0 && urls.length > 0 ? urls[0] : prev.image,
      }))
      if (multiFileInputRef.current) multiFileInputRef.current.value = ''
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Eroare la încărcare imagini')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImageAtIndex = (index: number) => {
    setFormData((prev) => {
      const next = prev.images.filter((_, i) => i !== index)
      return {
        ...prev,
        images: next,
        image: next[0] || '',
      }
    })
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setImagePreview('')
    setFormData((prev) => ({ ...prev, image: prev.images[0] || '', images: prev.images }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Eroare la upload imagine')
    }

    const data = await response.json()
    return data.url
  }

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      let imagesList = [...formData.images]
      if (selectedImage) {
        const url = await uploadImage(selectedImage)
        imagesList = [...imagesList, url]
      }
      const primaryImage = imagesList[0] || formData.image

      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image: primaryImage,
          images: imagesList,
          price: parseFloat(formData.price),
          discount_type: formData.discount_type,
          discount: formData.discount_type === 'percent' ? (parseFloat(formData.discount || '0') || 0) : 0,
          price_reduced: formData.discount_type === 'fixed' && formData.price_reduced !== '' ? parseFloat(formData.price_reduced) : null,
          stock: parseInt(formData.stock),
          active: true,
        }),
      })

      if (response.ok) {
        fetchProducts()
        resetForm()
      } else {
        const error = await response.json()
        alert(error.error || 'Eroare la salvare')
      }
    } catch (error: any) {
      console.error('Error saving product:', error)
      alert(error.message || 'Eroare la salvare')
    } finally {
      setIsUploading(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    fetchCategories()
    setEditingProduct(product)
    const imagesList = Array.isArray((product as Product).images) && (product as Product).images!.length > 0
      ? (product as Product).images!
      : (product.image ? [product.image] : [])
    const discountType = (product as Product).discount_type || 'percent'
    const pr = (product as Product).price_reduced
    const hasPriceReduced = pr != null && pr > 0
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: product.price.toString(),
      discount_type: hasPriceReduced ? 'fixed' : discountType,
      discount: (product.discount || 0).toString(),
      price_reduced: (product as Product).price_reduced != null ? String((product as Product).price_reduced) : '',
      image: product.image || imagesList[0] || '',
      images: imagesList,
      category_id: product.category_id.toString(),
      stock: product.stock.toString(),
    })
    setSelectedImage(null)
    setImagePreview('')
    setShowProductForm(true)
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Ești sigur că vrei să ștergi acest produs?\n\nDacă produsul este folosit în comenzi, va fi dezactivat în loc să fie șters.')) return

    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (response.ok) {
        const result = await response.json()
        if (result.deactivated) {
          alert('Produsul a fost dezactivat (este folosit în comenzi). Poți să-l reactivezi din editare.')
        } else {
          alert('Produsul a fost șters cu succes.')
        }
        fetchProducts()
      } else {
        const error = await response.json()
        alert(error.error || 'Eroare la ștergere')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Eroare la ștergere')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: '',
      discount_type: 'percent',
      discount: '0',
      price_reduced: '',
      image: '',
      images: [],
      category_id: '',
      stock: '1',
    })
    setEditingProduct(null)
    setSelectedImage(null)
    setImagePreview('')
    setShowProductForm(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (multiFileInputRef.current) multiFileInputRef.current.value = ''
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  return (
    <AdminGuard>
      <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Dashboard Admin</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/admin/database"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              <FiDatabase className="w-5 h-5" />
              <span className="hidden sm:inline">Vizualizare Baza de Date</span>
              <span className="sm:hidden">Baza de Date</span>
            </Link>
            <button
              onClick={() => {
                logout()
                window.location.href = '/admin/login'
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              <FiLogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-6 border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 sm:px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FiPackage className="inline w-5 h-5 mr-2" />
            Produse
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 sm:px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FiShoppingBag className="inline w-5 h-5 mr-2" />
            Comenzi ({orders.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gestionare Produse</h2>
              <button
                onClick={() => {
                  resetForm()
                  fetchCategories() // Reîncarcă categoriile când se deschide formularul
                  setShowProductForm(true)
                }}
                className="btn-primary flex items-center gap-2"
              >
                <FiPlus className="w-5 h-5" />
                Adaugă Produs
              </button>
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {editingProduct ? 'Editează Produs' : 'Adaugă Produs Nou'}
                  </h3>
                  <form onSubmit={handleSubmitProduct} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nume Produs *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })
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
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Descriere
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Preț (RON) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Reducere
                        </label>
                        <div className="flex gap-4 mb-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="discount_type"
                              checked={formData.discount_type === 'percent'}
                              onChange={() => setFormData({ ...formData, discount_type: 'percent', price_reduced: '' })}
                              className="text-primary-600"
                            />
                            <span>Procent (%)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="discount_type"
                              checked={formData.discount_type === 'fixed'}
                              onChange={() => setFormData({ ...formData, discount_type: 'fixed', discount: '0' })}
                              className="text-primary-600"
                            />
                            <span>Preț redus (RON)</span>
                          </label>
                        </div>
                        {formData.discount_type === 'percent' ? (
                          <>
                            <input
                              type="number"
                              step="1"
                              min="0"
                              max="100"
                              value={formData.discount === '' ? '' : (formData.discount || '0')}
                              onChange={(e) => {
                                const value = e.target.value
                                setFormData({ ...formData, discount: value === '' ? '' : value })
                              }}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
                              placeholder="0"
                            />
                            <p className="text-xs text-gray-500 mt-1">Procent reducere (fără zecimale). Gol sau 0 = fără reducere</p>
                          </>
                        ) : (
                          <>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={formData.price_reduced}
                              onChange={(e) => setFormData({ ...formData, price_reduced: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
                              placeholder="Prețul nou (ex: 199.99)"
                            />
                            <p className="text-xs text-gray-500 mt-1">Prețul final redus (RON). Gol = fără reducere</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stoc *
                      </label>
                      <input
                        type="number"
                        value={formData.stock || '1'}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Categorie *
                      </label>
                      <select
                        value={formData.category_id}
                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
                      >
                        <option value="">Selectează categorie</option>
                        {categories && Array.isArray(categories) && categories.length > 0 ? (
                          categories
                            .filter((c: Category) => !c.parent_id)
                            .map((category) => {
                              const subcategories = categories.filter((c: Category) => c.parent_id === category.id)
                              return (
                                <optgroup key={category.id} label={category.name}>
                                  {subcategories.length > 0 ? (
                                    subcategories.map((sub) => (
                                      <option key={sub.id} value={sub.id}>
                                        {sub.name}
                                      </option>
                                    ))
                                  ) : (
                                    <option value={category.id}>{category.name}</option>
                                  )}
                                </optgroup>
                              )
                            })
                        ) : (
                          <option value="" disabled>Se încarcă categoriile...</option>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Imagini Produs (poți adăuga mai multe)
                      </label>
                      
                      {/* List of images with remove */}
                      {formData.images.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-4">
                          {formData.images.map((img, index) => (
                            <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-100">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemoveImageAtIndex(index)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                              >
                                <FiX className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Single file (preview before adding to list) */}
                      {selectedImage && (
                        <div className="relative mb-4 w-full h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300 flex items-center justify-center">
                          <img src={imagePreview} alt="Preview" className="max-h-full object-contain" />
                          <button
                            type="button"
                            onClick={() => { setSelectedImage(null); setImagePreview(''); if (fileInputRef.current) fileInputRef.current.value = '' }}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Add image(s) - multiple files */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        <input
                          ref={multiFileInputRef}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                          multiple
                          onChange={handleMultipleImagesSelect}
                          className="hidden"
                          id="images-upload-multi"
                        />
                        <label
                          htmlFor="images-upload-multi"
                          className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-600 hover:bg-primary-50 transition-colors text-sm font-semibold text-gray-700"
                        >
                          <FiUpload className="w-5 h-5" />
                          Adaugă imagini
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                          onChange={handleImageSelect}
                          className="hidden"
                          id="image-upload-one"
                        />
                        <label
                          htmlFor="image-upload-one"
                          className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-600 hover:bg-primary-50 transition-colors text-sm font-semibold text-gray-700"
                        >
                          <FiUpload className="w-5 h-5" />
                          O imagine
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        Formate: JPG, PNG, WEBP, GIF (max 5MB). Pe pagina produsului clienții pot da swipe prin toate imaginile.
                      </p>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button 
                        type="submit" 
                        className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isUploading}
                      >
                        {isUploading 
                          ? 'Se încarcă...' 
                          : editingProduct 
                            ? 'Salvează Modificările' 
                            : 'Adaugă Produs'
                        }
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="btn-secondary flex-1"
                        disabled={isUploading}
                      >
                        Anulează
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            {/* Products List - Mobile Card View */}
            <div className="md:hidden space-y-4">
              {products && Array.isArray(products) && products.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl shadow-lg p-4 ${product.active === 0 ? 'opacity-60' : ''}`}
                >
                  <div className="flex gap-3 mb-3">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`font-semibold text-gray-900 ${product.active === 0 ? 'text-gray-500' : ''}`}>
                          {product.name}
                        </p>
                        {product.active === 0 && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded font-semibold">
                            Dezactivat
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{product.category_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                    <span className="font-bold text-primary-600">{product.price} RON</span>
                    <span className={`px-2 py-1 rounded text-sm font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      Stoc: {product.stock}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-100 text-blue-600 rounded-lg font-semibold"
                    >
                      <FiEdit className="w-4 h-4" />
                      Editează
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-100 text-red-600 rounded-lg font-semibold"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Șterge
                    </button>
                  </div>
                </div>
              ))}
              {(!products || !Array.isArray(products) || products.length === 0) && (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-600">
                  Nu există produse. Adaugă un produs nou.
                </div>
              )}
            </div>

            {/* Products List - Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Produs</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Categorie</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Preț</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Stoc</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products && Array.isArray(products) && products.map((product) => (
                      <tr key={product.id} className={`hover:bg-gray-50 ${product.active === 0 ? 'opacity-60 bg-gray-50' : ''}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {product.image && (
                              <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <p className={`font-semibold ${product.active === 0 ? 'text-gray-500' : 'text-gray-900'}`}>
                                  {product.name}
                                </p>
                                {product.active === 0 && (
                                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded font-semibold">
                                    Dezactivat
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">{product.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{product.category_name}</td>
                        <td className="px-6 py-4 font-bold text-primary-600">{product.price} RON</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-sm ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-2 hover:bg-blue-100 text-blue-600 rounded"
                            >
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 hover:bg-red-100 text-red-600 rounded"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comenzi</h2>
            
            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-mono text-sm font-semibold text-gray-900 mb-1">
                        #{order.order_number}
                      </p>
                      <p className="font-semibold text-gray-900">{order.customer_name}</p>
                      <p className="text-sm text-gray-500">{order.customer_email || '—'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600 text-lg mb-2">
                        {order.total_amount.toFixed(2)} RON
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.payment_status}
                    </span>
                  </div>
                  
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <FiEye className="w-4 h-4" />
                    Vezi Comandă
                  </Link>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <p className="text-gray-600">Nu există comenzi</p>
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Număr Comandă</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Plată</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm">{order.order_number}</td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{order.customer_name}</p>
                          <p className="text-sm text-gray-500">{order.customer_email || '—'}</p>
                        </td>
                        <td className="px-6 py-4 font-bold text-primary-600">{order.total_amount.toFixed(2)} RON</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            order.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.payment_status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="p-2 hover:bg-blue-100 text-blue-600 rounded inline-block"
                          >
                            <FiEye className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-600">
                          Nu există comenzi
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </AdminGuard>
  )
}

export default function AdminDashboard() {
  return <AdminDashboardContent />
}

