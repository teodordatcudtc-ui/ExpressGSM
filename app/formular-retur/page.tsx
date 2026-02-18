'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiFileText, FiPhone, FiMail, FiDownload } from 'react-icons/fi'

export default function FormularReturPage() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <FiArrowLeft className="w-5 h-5" />
          Înapoi la pagina principală
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FiFileText className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">Formular și procedură retur</h1>
          </div>
          <p className="text-gray-600">
            Conform legislației, beneficiați de dreptul de retur în termen de 14 zile calendaristice de la primirea produsului. Descărcați formularul, completați-l și trimiteți-l la email.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Formular retur (download)</h2>
            <p className="text-gray-700 mb-4">
              Descărcați formularul de retur în format Word și completați toate câmpurile.
            </p>
            <a
              href="/formular-retur.docx"
              download="formular-retur.docx"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-3 rounded-lg transition-colors"
            >
              <FiDownload className="w-5 h-5" />
              Descarcă formular retur (.docx)
            </a>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Solicitare retur (prin email)</h2>
            <p className="text-gray-700 mb-4">
              După ce ați completat formularul, trimiteți-l la <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700 font-semibold">ecranul@yahoo.com</a> (atașat la email). Vă vom confirma primirea și vă vom indica pașii următori.
            </p>
            <p className="text-gray-600 text-sm">
              Pentru detalii despre termene, ambalaj și excepții, consultați <Link href="/politica-retur" className="text-primary-600 hover:text-primary-700 font-semibold">Politica de retur</Link>.
            </p>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <div className="flex flex-wrap gap-6">
              <a href="mailto:ecranul@yahoo.com" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium">
                <FiMail className="w-5 h-5" />
                ecranul@yahoo.com
              </a>
              <a href="tel:0799665665" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium">
                <FiPhone className="w-5 h-5" />
                0799665665
              </a>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
