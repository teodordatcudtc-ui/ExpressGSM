'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiXCircle } from 'react-icons/fi'

export default function PoliticaAnularePage() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <FiArrowLeft className="w-5 h-5" />
          Înapoi la pagina principală
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FiXCircle className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">Politica de anulare a comenzii</h1>
          </div>
          <p className="text-gray-600">Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Anularea comenzii înainte de expediere</h2>
            <p className="text-gray-700 leading-relaxed">Puteți solicita anularea unei comenzi înainte ca aceasta să fie predată curierului sau pregătită pentru ridicare. Contactați-ne cât mai curând la <a href="mailto:contact@ecranul.ro" className="text-primary-600 hover:text-primary-700 font-semibold">contact@ecranul.ro</a> sau la telefon <a href="tel:0799665665" className="text-primary-600 hover:text-primary-700 font-semibold">0799665665</a>, indicând numărul comenzii. Dacă comanda nu a fost deja expediată, o anulăm și vi se rambursează suma plătită (inclusiv prin card, conform politicii procesatorului de plăți), în termenul stabilit de lege (de obicei în 14 zile).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dreptul de retur (consumatori)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">Conform OUG 21/1992 și reglementărilor UE, în calitate de consumator aveți dreptul să vă retrageți din contract în termen de <strong>14 zile calendaristice</strong> de la primirea produsului, fără a fi nevoie să motivați decizia. Produsul trebuie returnat în starea în care l-ați primit, cu ambalajul și accesoriile originale. Costurile de returnare sunt suportate de dvs., cu excepția cazurilor în care produsul este defect sau nu corespunde comenzii.</p>
            <p className="text-gray-700 leading-relaxed">Rambursarea se face în același mod în care ați efectuat plata (ex. card, ramburs) și în cel mult 14 zile de la primirea produsului returnat sau a dovezii expedierii acestuia.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Excepții de la dreptul de retur</h2>
            <p className="text-gray-700 leading-relaxed">Dreptul de retur nu se aplică, conform legii, în anumite cazuri (ex. produse sigilate deschise și nepotrivite pentru returnare din motive de igienă, produse personalizate). Detaliile sunt disponibile în <Link href="/termeni-conditii" className="text-primary-600 hover:text-primary-700 font-semibold">Termenii și Condițiile</Link> și pot fi solicitate la contact.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Comenzi plătite cu cardul (NETOPIA)</h2>
            <p className="text-gray-700 leading-relaxed">Pentru plăți efectuate online cu cardul, rambursarea se face în contul din care a fost debitată tranzacția, în termenul stabilit de procesatorul de plăți (NETOPIA) și de banca emitentă. Nu percepem comision suplimentar pentru anulare/retur; orice comision este cel stabilit de banca dvs.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pentru orice cerere de anulare sau retur: <a href="mailto:contact@ecranul.ro" className="text-primary-600 hover:text-primary-700 font-semibold">contact@ecranul.ro</a>, <a href="tel:0799665665" className="text-primary-600 hover:text-primary-700 font-semibold">0799665665</a>. Menționați întotdeauna numărul comenzii. Pentru litigii, consultați <Link href="/termeni-conditii" className="text-primary-600 hover:text-primary-700 font-semibold">Termenii și Condițiile</Link> și măsurile ANPC (SAL) / Platforma SOL, linkurile fiind disponibile în footer-ul site-ului.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
