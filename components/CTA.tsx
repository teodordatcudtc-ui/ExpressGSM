'use client'

import { motion } from 'framer-motion'
import { FiPhone, FiTool } from 'react-icons/fi'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ai Nevoie de Reparații?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Contactează-ne acum pentru un diagnostic gratuit sau programează o vizită la magazinul nostru.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="tel:0799665665"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
            >
              <FiPhone className="w-6 h-6" />
              <span>Sună: 0799665665</span>
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-800 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 hover:bg-primary-900 transition-all"
            >
              <FiTool className="w-6 h-6" />
              <span>Formular Contact</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

