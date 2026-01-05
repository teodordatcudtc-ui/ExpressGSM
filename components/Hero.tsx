'use client'

import { motion } from 'framer-motion'
import { FiPhone, FiArrowRight, FiTool } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {/* 
        PENTRU A ADAUGA POZA TA:
        1. Pune poza în folderul public/ cu numele: hero-background.jpg (sau .png)
        2. Dacă folosești alt nume, schimbă "/hero-background.jpg" cu numele tău
        3. Format recomandat: JPG sau PNG, minim 1920x1080px
        4. Dacă imaginea nu există, se va afișa un gradient colorat
      */}
      <div className="absolute inset-0 z-0">
        {/* Fallback gradient dacă imaginea nu există */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />
        <Image
          src="/hero-background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay pentru lizibilitate */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-900/80" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
          >
            <span className="text-white">Express GSM</span>
            <br />
            <span className="text-primary-200">Network</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md"
          >
            Service GSM profesional în București
            <br />
            <span className="text-primary-200 font-semibold">Reparații rapide • Accesorii de calitate • Servicii complete</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="tel:0799665665"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
            >
              <FiPhone className="w-5 h-5" />
              <span>Sună Acum: 0799665665</span>
            </motion.a>
            <motion.a
              href="/servicii"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
            >
              <FiTool className="w-5 h-5" />
              <span>Vezi Serviciile</span>
              <FiArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              { icon: '⚡', title: 'Reparații Rapide', desc: 'Servicii în aceeași zi' },
              { icon: '🔧', title: 'Experți Certificați', desc: 'Tehnicieni profesioniști' },
              { icon: '💎', title: 'Calitate Garantată', desc: 'Piese originale și accesorii premium' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/20"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

