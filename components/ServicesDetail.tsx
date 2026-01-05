'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  FiSmartphone,
  FiMonitor,
  FiBattery,
  FiShoppingBag,
  FiShield,
  FiTool,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
} from 'react-icons/fi'

const services = [
  {
    icon: FiSmartphone,
    title: 'Reparații Telefoane',
    description: 'Reparații profesionale pentru toate modelele de telefoane mobile.',
    features: [
      'Reparații pentru iPhone, Samsung, Huawei, Xiaomi și altele',
      'Diagnostic gratuit și rapid',
      'Piese originale și de calitate',
      'Garanție pentru toate reparațiile',
      'Servicii în aceeași zi (când este posibil)',
    ],
    color: 'from-blue-500 to-blue-600',
    price: 'De la 50 RON',
    image: '/servicii/reparatii-telefoane.jpg',
    layout: 'left', // poza la stânga
  },
  {
    icon: FiMonitor,
    title: 'Înlocuire Ecrane',
    description: 'Ecrane originale și de calitate pentru toate modelele de telefoane.',
    features: [
      'Ecrane originale și compatibile',
      'Pentru toate modelele populare',
      'Instalare profesională garantată',
      'Protecție ecran inclusă',
      'Garanție extinsă',
    ],
    color: 'from-purple-500 to-purple-600',
    price: 'De la 150 RON',
    image: '/servicii/ecrane.jpg',
    layout: 'right', // poza la dreapta
  },
  {
    icon: FiBattery,
    title: 'Înlocuire Baterii',
    description: 'Baterii noi și performante pentru a restabili autonomia telefonului.',
    features: [
      'Baterii originale și compatibile',
      'Capacitate maximă garantată',
      'Instalare rapidă (30-60 minute)',
      'Testare completă post-instalare',
      'Garanție 6 luni',
    ],
    color: 'from-green-500 to-green-600',
    price: 'De la 80 RON',
    image: '/servicii/baterii.jpg',
    layout: 'left',
  },
  {
    icon: FiShoppingBag,
    title: 'Accesorii GSM',
    description: 'Gamă completă de accesorii premium pentru telefonul tău.',
    features: [
      'Huse și învelișuri protectoare',
      'Încărcătoare rapide și cabluri',
      'Căști și boxe portabile',
      'Powerbank-uri de calitate',
      'Accesorii auto (suporturi, încărcătoare)',
    ],
    color: 'from-orange-500 to-orange-600',
    price: 'De la 20 RON',
    image: '/servicii/accesorii.jpg',
    layout: 'right',
  },
  {
    icon: FiShield,
    title: 'Protecție & Garantie',
    description: 'Servicii de protecție extinsă și garanție pentru investiția ta.',
    features: [
      'Garanție extinsă pentru reparații',
      'Protecție ecran (temperat glass)',
      'Asigurare pentru telefoane',
      'Servicii de mentenanță',
      'Suport post-reparație',
    ],
    color: 'from-red-500 to-red-600',
    price: 'De la 30 RON',
    image: '/servicii/protectie.jpg',
    layout: 'left',
  },
  {
    icon: FiTool,
    title: 'Diagnostic & Consultanță',
    description: 'Diagnostic gratuit și consultanță profesională pentru telefonul tău.',
    features: [
      'Diagnostic complet gratuit',
      'Evaluare profesională a problemei',
      'Estimare prețuri transparentă',
      'Consultanță pentru alegerea soluției',
      'Raport detaliat al diagnosticului',
    ],
    color: 'from-indigo-500 to-indigo-600',
    price: 'Gratuit',
    image: '/servicii/diagnostic.jpg',
    layout: 'right',
  },
]

export default function ServicesDetail() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-primary-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Serviciile <span className="text-primary-600">Noastre</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferim soluții complete și profesionale pentru toate nevoile tale GSM. 
            De la reparații complexe la accesorii premium, suntem aici pentru tine.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const isLeftLayout = service.layout === 'left'
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${!isLeftLayout ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image Section */}
                  <div className={`relative h-56 lg:h-full lg:min-h-[350px] ${isLeftLayout ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700">
                      {/* Fallback gradient - se va vedea dacă imaginea nu există */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90`} />
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover opacity-90"
                      />
                      {/* Overlay gradient pentru contrast */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-60`} />
                    </div>
                    {/* Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/30"
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>
                    {/* Price badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-2">
                        <FiDollarSign className="w-4 h-4 text-primary-600" />
                        <span className="font-bold text-sm text-gray-900">{service.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`p-5 lg:p-6 flex flex-col justify-center ${isLeftLayout ? 'lg:order-2' : 'lg:order-1'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isLeftLayout ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-9 h-9 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{service.title}</h2>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      
                      <div className="mb-4">
                        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                          <FiCheckCircle className="w-4 h-4 text-primary-600 mr-2" />
                          Ce Include
                        </h3>
                        <ul className="space-y-1.5">
                          {service.features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: idx * 0.05 }}
                              className="flex items-start space-x-2 group"
                            >
                              <div className="mt-0.5">
                                <FiCheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                              </div>
                              <span className="text-xs text-gray-700 group-hover:text-gray-900 transition-colors">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FiClock className="w-3.5 h-3.5 text-primary-600" />
                          <span className="text-xs font-medium">Servicii rapide</span>
                        </div>
                        <motion.a
                          href="/contact"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`btn-primary flex items-center space-x-2 bg-gradient-to-r ${service.color} hover:shadow-lg text-xs px-3 py-1.5`}
                        >
                          <span>Contactează-ne</span>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ai Nevoie de Ajutor?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Contactează-ne acum pentru un diagnostic gratuit sau pentru mai multe informații.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0799665665"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Sună: 0799665665
            </a>
            <a
              href="/contact"
              className="bg-primary-800 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-900 transition-colors"
            >
              Trimite Mesaj
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

