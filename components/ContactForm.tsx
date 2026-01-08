'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulare trimitere formular (în producție, aici ar fi un API call)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitted(true)
    setIsSubmitting(false)
    reset()
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section className="section-padding bg-gradient-to-b from-white to-primary-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Contactează-<span className="text-primary-600">ne</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ai o întrebare sau ai nevoie de un serviciu? Trimite-ne un mesaj sau 
            sună-ne direct. Suntem aici să te ajutăm!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Informații de Contact
              </h2>
              <p className="text-gray-600 mb-8">
                Ne poți contacta prin telefon, email sau poți veni direct la magazinul nostru. 
                Programul nostru este flexibil și suntem gata să te ajutăm.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="tel:0799665665"
                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                  <FiPhone className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                  <p className="text-primary-600 text-lg font-semibold">0799665665</p>
                  <p className="text-gray-500 text-sm mt-1">Luni - Vineri: 09:00 - 19:00</p>
                </div>
              </a>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FiMapPin className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Adresă</h3>
                  <p className="text-gray-700">
                    Strada Pajurei 7<br />
                    București
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FiMail className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-700">contact@ecranul.ro</p>
                  <p className="text-gray-500 text-sm mt-1">Răspundem în 24 de ore</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">Program de Lucru</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex justify-between">
                  <span>Luni - Vineri:</span>
                  <span className="font-semibold">09:00 - 19:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sâmbătă:</span>
                  <span className="font-semibold">09:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Duminică:</span>
                  <span className="font-semibold">Închis</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Mesaj Trimis cu Succes!
                </h3>
                <p className="text-gray-600">
                  Îți vom răspunde în cel mai scurt timp posibil.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nume Complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Numele este obligatoriu' })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-primary-600'
                    }`}
                    placeholder="Introdu numele tău"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email-ul este obligatoriu',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email invalid',
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-primary-600'
                    }`}
                    placeholder="email@exemplu.ro"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', {
                      required: 'Telefonul este obligatoriu',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Telefon invalid (10 cifre)',
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-primary-600'
                    }`}
                    placeholder="0712345678"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subiect *
                  </label>
                  <select
                    id="subject"
                    {...register('subject', { required: 'Subiectul este obligatoriu' })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.subject
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-primary-600'
                    }`}
                  >
                    <option value="">Selectează un subiect</option>
                    <option value="reparatie">Reparație Telefon</option>
                    <option value="accesorii">Accesorii</option>
                    <option value="intrebare">Întrebare Generală</option>
                    <option value="programare">Programare</option>
                    <option value="altul">Altul</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', {
                      required: 'Mesajul este obligatoriu',
                      minLength: {
                        value: 10,
                        message: 'Mesajul trebuie să aibă minim 10 caractere',
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-primary-600'
                    }`}
                    placeholder="Scrie mesajul tău aici..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary flex items-center justify-center space-x-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Se trimite...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      <span>Trimite Mesaj</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

