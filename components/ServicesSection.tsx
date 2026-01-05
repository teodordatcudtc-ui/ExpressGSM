'use client'

import { motion } from 'framer-motion'
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

export default function ServicesSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="p-8 relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Link */}
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

