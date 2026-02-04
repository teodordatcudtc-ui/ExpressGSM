'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiTruck } from 'react-icons/fi'

export default function PoliticaLivrarePage() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <FiArrowLeft className="w-5 h-5" />
          Înapoi la pagina principală
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FiTruck className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">Politica de livrare a comenzii</h1>
          </div>
          <p className="text-gray-600">Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Opțiuni de livrare</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Curier rapid – livrare la adresă:</strong> livrarea se face la adresa indicată la comandă. Cost: 28,00 RON. Termen estimat: 1–3 zile lucrătoare de la confirmarea comenzii.</li>
              <li><strong>Ridicare personală din depozit:</strong> comanda poate fi ridicată de la sediul nostru (Strada Pajurei 7, Sector 1, București, 011318). Cost: gratuit. Termen: după confirmarea disponibilității (de obicei în aceeași zi sau în ziua lucrătoare următoare).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Confirmarea și onorarea comenzii</h2>
            <p className="text-gray-700 leading-relaxed">După primirea comenzii, o confirmăm (telefonic sau prin email, dacă ați furnizat date de contact). Livrarea este organizată în funcție de disponibilitatea produselor și de opțiunea alesă (curier / ridicare personală). Vă informăm în cazul unor întârzieri sau indisponibilități.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Livrare la adresă (curier)</h2>
            <p className="text-gray-700 leading-relaxed">Livrarea se face în limita disponibilității curierului partener. Este important să indicați corect adresa și un număr de telefon la care să fiți contactat. În cazul în care nu sunteți găsit la prima livrare, curierul va încerca conform politicii acestuia (ex. redirecționare la punct de ridicare sau nouă încercare). Costurile de livrare sunt cele afișate la finalizarea comenzii (ex. 28,00 RON).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Ridicare personală</h2>
            <p className="text-gray-700 leading-relaxed">Pentru ridicare personală, vă așteptăm la adresa: Strada Pajurei 7, Sector 1, București, 011318, în programul afișat pe site (ex. Luni–Vineri 09:00–19:00, Sâmbătă 09:00–17:00). Vă rugăm să aduceți un act de identitate și, după caz, confirmarea comenzii (email sau număr comandă).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Întârzieri și forță majoră</h2>
            <p className="text-gray-700 leading-relaxed">În cazul unor întârzieri independente de voința noastră (ex. condiții meteo, evenimente de forță majoră, probleme la furnizori sau curieri), vă informăm în cel mai scurt timp și stabilim împreună o nouă dată estimată de livrare sau, după caz, oferim anularea comenzii și rambursarea sumei plătite.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pentru întrebări despre livrare: <a href="mailto:contact@ecranul.ro" className="text-primary-600 hover:text-primary-700 font-semibold">contact@ecranul.ro</a> sau telefon <a href="tel:0799665665" className="text-primary-600 hover:text-primary-700 font-semibold">0799665665</a>. Consultați și <Link href="/termeni-conditii" className="text-primary-600 hover:text-primary-700 font-semibold">Termenii și Condițiile</Link>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
