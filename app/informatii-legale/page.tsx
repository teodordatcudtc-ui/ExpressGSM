'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiFileText, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

/**
 * Pagină centralizată pentru validare Netopia / ANPC:
 * date firmă + linkuri către toate politicile și termenii obligatorii.
 */
export default function InformatiiLegalePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ecranul.ro'

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
            <h1 className="text-4xl font-bold text-gray-900">Informații legale și contact</h1>
          </div>
          <p className="text-gray-600">
            Această pagină centralizează datele companiei și linkurile către documentele legale ale site-ului ecranul.ro.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
          {/* Date companie */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Date de identificare și contact</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="font-semibold min-w-[140px]">Denumire firmă:</span>
                <span>LNV NETWORK S.R.L.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-semibold min-w-[140px]">Marca / site:</span>
                <span>ecranul.ro</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-semibold min-w-[140px]">CUI:</span>
                <span>51621916</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-semibold min-w-[140px]">Nr. Registrul Comerțului:</span>
                <span>J40/2025/26536005</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 mt-0.5 text-primary-600 shrink-0" />
                <div>
                  <span className="font-semibold block text-gray-900">Adresă sediu social:</span>
                  <span>București, Sector 1, Bulevardul Bucureștii Noi, Nr. 50A, Tronson A+C, Etaj 7, Ap. 43</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-primary-600 shrink-0" />
                <div>
                  <span className="font-semibold block text-gray-900">Telefon:</span>
                  <a href="tel:0799665665" className="text-primary-600 hover:text-primary-700">0799665665</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-primary-600 shrink-0" />
                <div>
                  <span className="font-semibold block text-gray-900">Email:</span>
                  <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700">ecranul@yahoo.com</a>
                </div>
              </li>
            </ul>
          </section>

          {/* Documente și politici obligatorii */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Documente și politici (linkuri directe)</h2>
            <p className="text-gray-600 mb-6">Toate documentele legale ale site-ului, conform cerințelor ANPC și ale operatorilor de plăți:</p>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold text-gray-900">Termeni și condiții:</span>{' '}
                <Link href="/termeni-conditii" className="text-primary-600 hover:text-primary-700 break-all">
                  {baseUrl}/termeni-conditii
                </Link>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Politica de confidențialitate:</span>{' '}
                <Link href="/politica-confidentialitate" className="text-primary-600 hover:text-primary-700 break-all">
                  {baseUrl}/politica-confidentialitate
                </Link>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Politica GDPR (protecția datelor cu caracter personal):</span>{' '}
                <Link href="/politica-confidentialitate" className="text-primary-600 hover:text-primary-700 break-all">
                  {baseUrl}/politica-confidentialitate
                </Link>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Politica de livrare a comenzii:</span>{' '}
                <Link href="/politica-livrare" className="text-primary-600 hover:text-primary-700 break-all">
                  {baseUrl}/politica-livrare
                </Link>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Politica de anulare a comenzii:</span>{' '}
                <Link href="/politica-anulare" className="text-primary-600 hover:text-primary-700 break-all">
                  {baseUrl}/politica-anulare
                </Link>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Formular și procedură retur:</span>{' '}
                <Link href="/formular-retur" className="text-primary-600 hover:text-primary-700 break-all">
                  {baseUrl}/formular-retur
                </Link>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Politica de utilizare Cookie-uri:</span>{' '}
                <Link href="/politica-cookie" className="text-primary-600 hover:text-primary-700 break-all">
                  {baseUrl}/politica-cookie
                </Link>
              </li>
            </ul>
          </section>

          {/* Soluționare litigii (ANPC / SOL) */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Soluționarea alternativă a litigiilor</h2>
            <p className="text-gray-600 mb-4">
              Conform Ordinului ANPC nr. 449/2022, informații despre măsurile de informare a consumatorilor:
            </p>
            <ul className="space-y-2">
              <li>
                <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                  ANPC – Soluționarea alternativă a litigiilor (SAL)
                </a>
              </li>
              <li>
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                  Platforma SOL – Soluționare Online Litigii (Comisia Europeană)
                </a>
              </li>
            </ul>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
