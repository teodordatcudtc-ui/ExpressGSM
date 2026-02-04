'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiShield } from 'react-icons/fi'

export default function PoliticaConfidentialitatePage() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <FiArrowLeft className="w-5 h-5" />
          Înapoi la pagina principală
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FiShield className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">Politica de confidențialitate</h1>
          </div>
          <p className="text-gray-600">Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Operatorul de date</h2>
            <p className="text-gray-700 leading-relaxed">
              Operatorul de date cu caracter personal este <strong>ecranul.ro</strong>. Datele dvs. sunt prelucrate în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și legislația națională aplicabilă.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Datele pe care le colectăm</h2>
            <p className="text-gray-700 leading-relaxed mb-3">Putem colecta: nume, prenume, adresă de email, număr de telefon, adresă de livrare, date de plată (procesate prin NETOPIA Payments), istoric comenzi. Acestea sunt necesare pentru executarea contractului (comandă, livrare, facturare) și pentru comunicări legale.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Scopul prelucrării</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Procesarea comenzilor și livrarea produselor</li>
              <li>Comunicarea cu dvs. în legătură cu comanda sau solicitările de contact</li>
              <li>Îndeplinirea obligațiilor legale (facturare, arhivare)</li>
              <li>Îmbunătățirea serviciilor și a site-ului (analiză agregate, fără identificare directă)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Baza legală</h2>
            <p className="text-gray-700 leading-relaxed">Prelucrarea se bazează pe: executarea contractului (art. 6 alin. 1 lit. b GDPR), obligații legale (art. 6 alin. 1 lit. c GDPR) și, unde este cazul, consimțământul dvs. (art. 6 alin. 1 lit. a GDPR).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Drepturile dvs. (GDPR)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">Aveți dreptul la: acces la date, rectificare, ștergere („dreptul de a fi uitat”), restricționarea prelucrării, portabilitatea datelor, opoziție și dreptul de a depune plângere la ANSPDCP (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal). Pentru exercitarea drepturilor, contactați-ne la <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700 font-semibold">ecranul@yahoo.com</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Securitatea datelor</h2>
            <p className="text-gray-700 leading-relaxed">Luăm măsuri tehnice și organizatorice adecvate pentru protecția datelor dvs. (acces limitat, criptare unde este cazul, parteneri de plăți certificați – ex. NETOPIA). Nu vindem datele dvs. către terți în scop de marketing.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pentru întrebări despre confidențialitate și protecția datelor: <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700 font-semibold">ecranul@yahoo.com</a>. Pentru politica de cookie-uri, consultați <Link href="/politica-cookie" className="text-primary-600 hover:text-primary-700 font-semibold">Politica de Utilizare Cookie-uri</Link>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
