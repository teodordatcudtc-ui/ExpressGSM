'use client'

import { motion } from 'framer-motion'
import { FiArrowRight, FiStar } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-primary-100/50 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Existing shapes */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-primary-200/30 rounded-3xl blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-40 w-80 h-80 bg-primary-300/20 rounded-3xl blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Blue spots/blobs for visual interest - Multiple with varying intensities */}
        {/* More accentuated spots */}
        <motion.div
          className="absolute top-32 left-32 w-96 h-96 bg-primary-300/35 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-80 h-80 bg-primary-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-72 h-72 bg-primary-500/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary-200/40 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 25, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Less accentuated spots - Subtle */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-56 h-56 bg-primary-300/15 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/5 w-48 h-48 bg-primary-400/12 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.25, 1],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-60 h-60 bg-primary-200/18 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.15, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-2/3 left-2/5 w-52 h-52 bg-primary-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/5 right-2/5 w-44 h-44 bg-primary-300/12 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 18, 0],
            y: [0, 12, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/5 left-1/2 w-40 h-40 bg-primary-400/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.25, 1],
            x: [0, -12, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-0 sm:px-2 lg:pl-0 lg:pr-8 relative z-10 py-16 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6 relative z-20 text-center lg:text-left lg:left-[-96px] xl:left-[-128px] 2xl:left-[-160px]"
          >
            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-2"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="text-gray-900">ecranul</span>
                <span className="text-primary-600">.ro</span>
              </h2>
            </motion.div>

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary-200/80 backdrop-blur-sm text-primary-800 px-4 py-2 rounded-full text-sm font-semibold border border-primary-300/50 shadow-sm"
            >
              <FiStar className="w-4 h-4" />
              <span>Tehnologie premium la prețuri accesibile</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight lg:pr-0 lg:mr-[-100px] lg:relative lg:z-30"
            >
              <span className="text-gray-900">Telefoane,</span>{' '}
              <span className="text-primary-600">Tablete</span>
              <br />
              <span className="text-gray-900">& Laptopuri</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              Calitate garantată, livrare rapidă, suport dedicat.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-4"
            >
              <Link
                href="/shop"
                className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl"
              >
                <span>Explorează produsele</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl"
              >
                <span>Contactează-ne</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Devices Images with Background Graphics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[600px] lg:h-[700px] hidden lg:block"
          >
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Large Circle - Background */}
              <motion.div
                className="absolute w-80 h-80 bg-primary-600/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Square 1 - Background */}
              <motion.div
                className="absolute top-10 right-20 w-32 h-32 bg-primary-400/30 rounded-3xl blur-xl"
                animate={{
                  rotate: [0, 5, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Square 2 - Background */}
              <motion.div
                className="absolute bottom-20 right-10 w-24 h-24 bg-primary-300/30 rounded-2xl blur-xl"
                animate={{
                  rotate: [0, -5, 0],
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Square 3 - Background */}
              <motion.div
                className="absolute bottom-10 left-20 w-28 h-28 bg-primary-500/30 rounded-2xl blur-xl"
                animate={{
                  rotate: [0, 8, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Devices Container - Add your images here */}
            <div className="relative z-10 h-full flex items-center justify-center">
              {/* 
                PENTRU A ADAUGA POZE CU DISPOZITIVE:
                1. Pune pozele în folderul public/ cu numele: hero-device-1.png, hero-device-2.png, hero-device-3.png
                2. Dacă folosești alt nume, schimbă path-urile de mai jos
                3. Format recomandat: PNG cu fundal transparent, minim 400x600px
                4. Poți adăuga 2-3 dispozitive (telefoane, tablete, laptopuri)
                5. Dacă nu există imagini, se vor ascunde automat
              */}
              
              {/* Device 1 - Centru (Principal) */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative w-72 h-96 lg:w-80 lg:h-[500px] z-20"
              >
                <Image
                  src="/hero-device-1.png"
                  alt="Telefon"
                  fill
                  className="object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
                  onError={(e) => {
                    // Fallback dacă imaginea nu există
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </motion.div>

              {/* Device 2 - Stânga sus - Mai departat */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -top-8 -left-24 lg:-top-12 lg:-left-28 w-56 h-72 lg:w-64 lg:h-80 z-10"
              >
                <Image
                  src="/hero-device-2.png"
                  alt="Tabletă"
                  fill
                  className="object-contain drop-shadow-xl"
                  style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.25))' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </motion.div>

              {/* Device 3 - Dreapta jos - Mai mic și mai la dreapta */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute bottom-4 -right-24 lg:bottom-8 lg:-right-28 w-48 h-64 lg:w-56 lg:h-72 z-10"
              >
                <Image
                  src="/hero-device-3.png"
                  alt="Laptop"
                  fill
                  className="object-contain drop-shadow-xl"
                  style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.25))' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </motion.div>

              {/* Animații continue pentru dispozitive */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-gray-500">Scroll</span>
          <motion.div
            className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-1"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-2 h-2 bg-primary-600 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

