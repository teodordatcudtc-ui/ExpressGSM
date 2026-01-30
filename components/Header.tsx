'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiPhone, FiTool, FiShoppingBag, FiInfo, FiMail, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import Cart from '@/components/Cart'
import CartFloatingPopup from '@/components/CartFloatingPopup'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const { getItemCount } = useCartStore()
  const { isAuthenticated } = useUserStore()
  const cartItemCount = getItemCount()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch user data on mount to ensure authentication state is synced
  useEffect(() => {
    const { fetchUserData, userId } = useUserStore.getState()
    if (userId) {
      fetchUserData()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Acasă', icon: FiMenu },
    { href: '/shop', label: 'Magazin', icon: FiShoppingBag },
    { href: '/servicii', label: 'Reparații', icon: FiTool },
    { href: '/despre-noi', label: 'Despre Noi', icon: FiInfo },
    { href: '/contact', label: 'Contact', icon: FiMail },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center"
              >
                <FiPhone className="text-white text-xl" />
              </motion.div>
              <span className="text-2xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors">
                ecranul.ro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'text-primary-600 font-semibold bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Cart & CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <FiShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <motion.a
                href={mounted && isAuthenticated ? "/profile" : "/auth/login"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 text-gray-700 hover:text-primary-600 transition-colors"
                title={mounted && isAuthenticated ? "Contul meu" : "Conectează-te / Creează cont"}
              >
                <FiUser className="w-6 h-6" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - below header row */}
        <div className="md:hidden border-t border-gray-100 px-4 py-3 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const q = searchQuery.trim()
              if (q) router.push(`/shop?q=${encodeURIComponent(q)}`)
              else router.push('/shop')
            }}
            className="flex items-center gap-2 w-full bg-gray-100 rounded-xl px-4 py-2.5"
          >
            <FiSearch className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Caută produsul dorit..."
              className="flex-1 bg-transparent border-0 outline-none text-gray-900 placeholder:text-gray-500 text-base"
              aria-label="Caută produse"
            />
            <button type="submit" className="text-primary-600 font-semibold text-sm">
              Caută
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <nav className="container-custom py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary-50 text-primary-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
                <button
                  onClick={() => {
                    setIsCartOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold mt-4 w-full relative"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>Coș ({cartItemCount})</span>
                </button>
                <Link
                  href={mounted && isAuthenticated ? "/profile" : "/auth/login"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold mt-2"
                >
                  <FiUser className="w-5 h-5" />
                  <span>{mounted && isAuthenticated ? "Contul meu" : "Conectează-te"}</span>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header (taller on mobile when search bar is visible) */}
      <div className="h-32 md:h-20" />

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating cart popup - bottom right when cart has items */}
      <CartFloatingPopup onOpenCart={() => setIsCartOpen(true)} />
    </>
  )
}

