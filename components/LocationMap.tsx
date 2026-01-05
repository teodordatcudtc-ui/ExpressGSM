'use client'

import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi'

export default function LocationMap() {
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
            Ne <span className="text-primary-600">Găsești</span> Aici
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vizitează-ne în magazin pentru servicii profesionale și consultanță personalizată.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-xl"
          >
            <h3 className="text-3xl font-bold mb-8">Informații Contact</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Telefon</h4>
                  <a href="tel:0799665665" className="text-white/90 hover:text-white transition-colors text-lg">
                    0799665665
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Adresă</h4>
                  <p className="text-white/90">
                    Bulevardul Bucureștii Noi 50a<br />
                    București 013152
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiClock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Program</h4>
                  <p className="text-white/90">
                    Luni - Vineri: 09:00 - 19:00<br />
                    Sâmbătă: 09:00 - 17:00<br />
                    Duminică: Închis
                  </p>
                </div>
              </div>
            </div>

            <motion.a
              href="tel:0799665665"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sună Acum
            </motion.a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2846.680212723934!2d26.03883929678955!3d44.480727300000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b20308f1c15c63%3A0x8dff8f37ec1047ba!2sExpress%20Gsm%20Network!5e0!3m2!1sen!2sro!4v1767618322906!5m2!1sen!2sro"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

