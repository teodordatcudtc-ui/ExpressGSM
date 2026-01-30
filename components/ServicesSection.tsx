'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSmartphone, FiTool, FiShoppingBag, FiBattery, FiMonitor, FiShield } from 'react-icons/fi'
import Link from 'next/link'

const services = [
  {
    icon: FiSmartphone,
    title: 'Reparații Telefoane',
    description: 'Reparații profesionale pentru toate modelele de telefoane: ecrane sparte, baterii, porturi de încărcare și multe altele.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: FiMonitor,
    title: 'Înlocuire Ecrane',
    description: 'Ecrane originale și de calitate pentru iPhone, Samsung, Huawei și alte branduri. Servicii rapide și garantate.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: FiBattery,
    title: 'Înlocuire Baterii',
    description: 'Baterii noi și performante pentru toate modelele. Restabilim autonomia telefonului tău.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: FiShoppingBag,
    title: 'Accesorii GSM',
    description: 'Huse, învelișuri, încărcătoare, căști și multe alte accesorii de calitate pentru telefonul tău.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: FiShield,
    title: 'Protecție & Garantie',
    description: 'Servicii cu garanție extinsă. Protecție completă pentru investiția ta în telefon.',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: FiTool,
    title: 'Diagnostic Gratuit',
    description: 'Diagnostic complet și gratuit pentru a identifica problema telefonului tău.',
    color: 'from-indigo-500 to-indigo-600',
  },
]

const AUTO_ROTATE_MS = 5000

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentIndex((i) => (i >= services.length - 1 ? 0 : i + 1))
    }, AUTO_ROTATE_MS)
    return () => clearInterval(t)
  }, [])

  const goTo = (index: number) => setCurrentIndex(index)
  const next = () => setCurrentIndex((i) => (i >= services.length - 1 ? 0 : i + 1))
  const prev = () => setCurrentIndex((i) => (i <= 0 ? services.length - 1 : i - 1))

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Serviciile <span className="text-primary-600">Noastre</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferim soluții complete pentru toate nevoile tale GSM, de la reparații la accesorii premium.
          </p>
        </motion.div>

        {/* Mobile: carousel with one card, auto-rotate every 5s */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" initial={false}>
              {services.map((service, index) => {
                if (index !== currentIndex) return null
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.35 }}
                    className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5`} />
                    <div className="p-8 relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                      <Link
                        href="/servicii"
                        className="inline-flex items-center text-primary-600 font-semibold"
                      >
                        Află mai multe
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={prev}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-primary-100 hover:text-primary-600"
                aria-label="Serviciul anterior"
              >
                ‹
              </button>
              <div className="flex gap-2">
                {services.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === currentIndex ? 'bg-primary-600 scale-110' : 'bg-gray-300'
                    }`}
                    aria-label={`Serviciu ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-primary-100 hover:text-primary-600"
                aria-label="Serviciul următor"
              >
                ›
              </button>
            </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="p-8 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <Link
                    href="/servicii"
                    className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors"
                  >
                    Află mai multe
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/servicii"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Vezi Toate Serviciile</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

