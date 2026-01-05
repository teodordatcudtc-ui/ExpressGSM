'use client'

import { motion } from 'framer-motion'
import { FiAward, FiUsers, FiTarget, FiHeart, FiShield, FiTrendingUp } from 'react-icons/fi'

const values = [
  {
    icon: FiAward,
    title: 'Calitate Premium',
    description: 'Folosim doar piese originale și de cea mai bună calitate pentru toate reparațiile.',
  },
  {
    icon: FiUsers,
    title: 'Echipa Profesională',
    description: 'Tehnicieni certificați cu experiență extinsă în domeniul reparațiilor GSM.',
  },
  {
    icon: FiTarget,
    title: 'Precizie',
    description: 'Fiecare reparație este realizată cu atenție la detalii și conform standardelor.',
  },
  {
    icon: FiHeart,
    title: 'Satisfacție Client',
    description: 'Prioritatea noastră este satisfacția completă a fiecărui client.',
  },
  {
    icon: FiShield,
    title: 'Garanție',
    description: 'Oferim garanție extinsă pentru toate serviciile și reparațiile efectuate.',
  },
  {
    icon: FiTrendingUp,
    title: 'Inovație',
    description: 'Ne adaptăm continuu la noile tehnologii și modele de telefoane.',
  },
]

export default function AboutUs() {
  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Despre <span className="text-primary-600">Express GSM Network</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Suntem un service GSM profesional din București, dedicat oferirii 
            de soluții complete și de calitate pentru toate nevoile tale mobile.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Povestea Noastră
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Express GSM Network a fost înființat cu misiunea de a oferi servicii 
                GSM profesionale și accesibile în București. Cu o pasiune pentru tehnologie 
                și un angajament ferm față de calitate, am construit o afacere bazată pe 
                încredere și satisfacția clienților.
              </p>
              <p>
                Echipa noastră de tehnicieni certificați are experiență extinsă în reparații 
                pentru toate brandurile populare de telefoane: iPhone, Samsung, Huawei, Xiaomi, 
                și multe altele. Fiecare reparație este tratată cu atenție la detalii și 
                respectă cele mai înalte standarde de calitate.
              </p>
              <p>
                Ne mândrim cu faptul că oferim servicii rapide, prețuri corecte și garanție 
                pentru toate lucrările efectuate. Diagnosticul este întotdeauna gratuit, 
                iar clienții noștri primesc consultanță profesională pentru a alege cea mai 
                bună soluție pentru nevoile lor.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
            Valorile <span className="text-primary-600">Noastre</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            De Ce Să Ne Alegi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Experiență Extinsă</h3>
                <p className="text-white/90">
                  Ani de experiență în domeniul reparațiilor GSM și mii de clienți mulțumiți.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Prețuri Corecte</h3>
                <p className="text-white/90">
                  Prețuri transparente și competitive, fără surprize neplăcute.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Servicii Rapide</h3>
                <p className="text-white/90">
                  Multe reparații finalizate în aceeași zi sau în 24 de ore.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Garanție Completă</h3>
                <p className="text-white/90">
                  Garanție extinsă pentru toate reparațiile și serviciile oferite.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vrei Să Ne Cunoaștem Mai Bine?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Vizitează-ne în magazin sau contactează-ne pentru mai multe informații.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="btn-primary text-lg px-8 py-4"
            >
              Contactează-ne
            </a>
            <a
              href="tel:0799665665"
              className="btn-secondary text-lg px-8 py-4"
            >
              Sună: 0799665665
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

