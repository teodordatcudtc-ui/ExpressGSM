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
            Ai o întrebare sau ai nevoie de un serviciu? Trimite-ne un mesaj pe WhatsApp. 
            Suntem aici să te ajutăm!
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
              <p className="text-gray-600 mb-6">
                Ne poți contacta pe WhatsApp sau poți veni direct la magazinul nostru. 
                Programul nostru este flexibil și suntem gata să te ajutăm.
              </p>
              {/* Date companie (obligatorii pentru ANPC / Netopia) */}
              <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Date firmă</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li><strong>Denumire firmă:</strong> LNV NETWORK S.R.L. (ecranul.ro)</li>
                  <li><strong>CUI:</strong> 51621916</li>
                  <li><strong>Nr. Registrul Comerțului:</strong> J40/2025/26536005</li>
                  <li><strong>Adresă sediu social:</strong> Bulevardul Bucureștii Noi 50A, Tronson A+C, Et. 7, Ap. 43, Sector 1, București</li>
                  <li><strong>Telefon:</strong> <a href="tel:0799665665" className="text-primary-600 hover:text-primary-700">0799665665</a></li>
                  <li><strong>Email:</strong> <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700">ecranul@yahoo.com</a></li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <a
                href="https://wa.me/40799665665"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <svg className="w-7 h-7 text-green-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                  <p className="text-green-600 text-lg font-semibold">Trimite-ne un mesaj</p>
                  <p className="text-gray-500 text-sm mt-1">Răspundem rapid pe WhatsApp</p>
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

          {/* WhatsApp Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Trimite-ne un mesaj pe WhatsApp
              </h3>
              <p className="text-gray-600 mb-8">
                Ai o întrebare sau ai nevoie de un serviciu? Contactează-ne direct pe WhatsApp pentru un răspuns rapid!
              </p>
            </div>
            
            <a
              href="https://wa.me/40799665665"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-lg">Mesaj pe WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

