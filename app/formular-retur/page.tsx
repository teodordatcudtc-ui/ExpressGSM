'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiFileText, FiPhone, FiMail } from 'react-icons/fi'

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
            Conform legislației, beneficiați de dreptul de retur în termen de 14 zile calendaristice de la primirea produsului. Mai jos găsiți procedura și datele de contact pentru solicitarea de retur.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Procedura de retur</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li><strong>Contactați-ne</strong> în termen de 14 zile de la primirea produsului, la email <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700 font-semibold">ecranul@yahoo.com</a> sau la telefon <a href="tel:0799665665" className="text-primary-600 hover:text-primary-700 font-semibold">0799665665</a>, menționând: număr comandă, produsul returnat și motivul (opțional).</li>
              <li><strong>Returnați produsul</strong> în starea în care l-ați primit, cu ambalajul și accesoriile originale, fără urme de utilizare necorespunzătoare. Costurile de expediere pentru retur sunt suportate de dvs., cu excepția cazurilor în care produsul este defect sau nu corespunde comenzii.</li>
              <li><strong>Expediere:</strong> trimiteți coletul la adresa noastră (sau la adresa indicată în emailul de confirmare). Păstrați dovada expedierii până la confirmarea primirii și a rambursării.</li>
              <li><strong>Rambursarea</strong> se face în același mod în care ați plătit (card / ramburs) și în cel mult 14 zile de la primirea produsului returnat sau a dovezii expedierii acestuia, conform legii.</li>
            </ol>
            <p className="mt-4 text-sm text-gray-600">
              Pentru excepții de la dreptul de retur (ex. produse desigilate nepotrivite pentru returnare), consultați <Link href="/politica-anulare" className="text-primary-600 hover:text-primary-700 font-semibold">Politica de anulare și retur</Link>.
            </p>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Solicitare retur (formular)</h2>
            <p className="text-gray-700 mb-4">
              Pentru a iniția un retur, trimiteți un email la <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700 font-semibold">ecranul@yahoo.com</a> cu următoarele informații:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Nume și prenume</li>
              <li>Număr comandă (ex. ORD-…)</li>
              <li>Produsul pe care doriți să îl returnați</li>
              <li>Motivul returului (opțional)</li>
              <li>Număr de telefon pentru contact</li>
            </ul>
            <p className="text-gray-600 text-sm">
              Vă vom confirma primirea solicitării și vă vom indica pașii următori (inclusiv adresa de returnare, dacă este cazul).
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
