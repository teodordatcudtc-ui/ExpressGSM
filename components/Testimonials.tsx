'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const testimonials = [
  {
    id: 1,
    name: 'Alexandru Popescu',
    rating: 5,
    text: 'Serviciu excelent! Mi-au reparat ecranul iPhone-ului în aceeași zi. Personalul este foarte profesionist și prețurile sunt corecte. Recomand cu încredere!',
    location: 'București',
  },
  {
    id: 2,
    name: 'Maria Ionescu',
    rating: 5,
    text: 'Am cumpărat o husă și un încărcător de la ei. Calitatea este superioară și prețurile sunt foarte bune. Voi reveni sigur pentru alte accesorii.',
    location: 'București',
  },
  {
    id: 3,
    name: 'Andrei Georgescu',
    rating: 5,
    text: 'Bateria telefonului meu nu mai ținea deloc. Au înlocuit-o rapid și acum telefonul funcționează perfect. Servicii de calitate!',
    location: 'București',
  },
  {
    id: 4,
    name: 'Elena Radu',
    rating: 5,
    text: 'Foarte mulțumită de serviciile oferite. Diagnosticul a fost gratuit și reparația a fost făcută rapid. Personal amabil și competent.',
    location: 'București',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ce Spun <span className="text-primary-600">Clienții</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Suntem mândri de feedback-ul pozitiv al clienților noștri mulțumiți.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FiStar key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-xl text-gray-700 text-center mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-500">{testimonials[currentIndex].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
            aria-label="Testimonial anterior"
          >
            <FiChevronLeft className="w-6 h-6 text-primary-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
            aria-label="Testimonial următor"
          >
            <FiChevronRight className="w-6 h-6 text-primary-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary-600 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Mergi la testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

