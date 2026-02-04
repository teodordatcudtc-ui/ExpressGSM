'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiFileText } from 'react-icons/fi'

export default function TermsConditionsPage() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Înapoi la pagina principală</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <FiFileText className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Termeni și Condiții
            </h1>
          </div>
          <p className="text-gray-600">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
        >
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informații generale</h2>
            <p className="text-gray-700 leading-relaxed">
              Prin accesarea și utilizarea site-ului <strong>ecranul.ro</strong>, acceptați să respectați acești Termeni și Condiții. 
              Dacă nu sunteți de acord cu oricare dintre termenii și condițiile de mai jos, vă rugăm să nu utilizați acest site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Despre serviciile noastre</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>ecranul.ro</strong> oferă următoarele servicii:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Vânzare de produse GSM (telefoane, tablete, accesorii, ecrane, baterii)</li>
              <li>Servicii de reparații pentru dispozitive mobile</li>
              <li>Consultanță tehnică și suport pentru clienți</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Comenzi și plăți</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                <strong>3.1.</strong> Toate comenzile sunt supuse confirmării disponibilității produselor. 
                Ne rezervăm dreptul de a refuza sau anula orice comandă din motive justificate.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>3.2.</strong> Prețurile afișate pe site sunt exprimate în RON (Lei) și includ TVA, unde este cazul.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>3.3.</strong> Plata se poate efectua la livrare (ramburs) sau prin transfer bancar, conform opțiunilor disponibile.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>3.4.</strong> Livrarea se face prin curier sau poate fi preluată de la magazinul nostru, conform opțiunii alese.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Dreptul de retur</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Conform legislației în vigoare, beneficiați de dreptul de retur în termen de 14 zile calendaristice de la data primirii produsului, 
              fără a fi necesară motivarea deciziei.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Produsul trebuie să fie returnat în starea în care a fost primit, cu toate accesoriile și ambalajul original. 
              Costurile de returnare sunt suportate de client, cu excepția cazurilor în care produsul este defect sau nu corespunde comenzii.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Garanții</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Toate produsele comercializate beneficiază de garanție conform legislației în vigoare:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Produse noi: garanție minimă 24 de luni</li>
              <li>Produse second-hand: garanție minimă 12 luni</li>
              <li>Servicii de reparații: garanție pentru reparația efectuată, conform specificațiilor oferite</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Protecția datelor personale</h2>
            <p className="text-gray-700 leading-relaxed">
              Prelucrarea datelor dvs. personale se face în conformitate cu Regulamentul General privind Protecția Datelor (GDPR). 
              Pentru mai multe detalii, consultați{' '}
              <Link href="/politica-cookie" className="text-primary-600 hover:text-primary-700 font-semibold">
                Politica de Utilizare Cookie-uri
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Proprietate intelectuală</h2>
            <p className="text-gray-700 leading-relaxed">
              Conținutul site-ului, inclusiv dar fără a se limita la texte, imagini, logo-uri, grafice și software, 
              este proprietatea <strong>ecranul.ro</strong> și este protejat de legile privind drepturile de autor și proprietatea intelectuală.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitarea răspunderii</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>ecranul.ro</strong> nu poate fi tras la răspundere pentru daune directe sau indirecte rezultate din utilizarea 
              sau imposibilitatea utilizării site-ului sau a serviciilor oferite, cu excepția cazurilor de neglijență gravă sau intenție.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modificări ale termenilor</h2>
            <p className="text-gray-700 leading-relaxed">
              Ne rezervăm dreptul de a modifica acești Termeni și Condiții în orice moment. 
              Modificările vor intra în vigoare imediat după publicarea pe site. 
              Utilizarea continuă a site-ului după modificări constituie acceptarea termenilor actualizați.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact și soluționare litigii</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Pentru orice întrebări sau nelămuriri legate de acești Termeni și Condiții, vă rugăm să ne contactați:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700">ecranul@yahoo.com</a>
              </p>
              <p className="text-gray-700">
                <strong>Telefon:</strong> <a href="tel:0799665665" className="text-primary-600 hover:text-primary-700">0799665665</a>
              </p>
              <p className="text-gray-700">
                <strong>Adresă:</strong> Strada Pajurei 7, București
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              În cazul unor litigii, părțile vor încerca să le rezolve amiabil. 
              Dacă nu se ajunge la o soluție, litigiile vor fi soluționate de instanțele competente din România.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
