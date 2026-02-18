'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiTruck } from 'react-icons/fi'

export default function ServicePrinCurierPage() {
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
            <h1 className="text-4xl font-bold text-gray-900">Service prin curier</h1>
          </div>
          <p className="text-gray-600">Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Obiectul serviciului</h2>
                <p>
                  Serviciul „Service display prin curier” oferit de ecranul.ro constă în ridicarea telefonului clientului prin curier, efectuarea reparației solicitate și returnarea telefonului reparat la adresa indicată de client.
                </p>
                <p>Serviciul este disponibil exclusiv pentru modelele afișate pe site și în condițiile descrise mai jos.</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Dispozitive acceptate</h2>
                <p>Reparăm exclusiv telefoane originale. Nu se acceptă:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>telefoane neoriginale / clone</li>
                  <li>dispozitive modificate necorespunzător</li>
                  <li>dispozitive cu intervenții neautorizate care pot afecta procesul de reparație</li>
                </ul>
                <p className="mt-2">Ne rezervăm dreptul de a refuza reparația dacă telefonul nu respectă aceste condiții.</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Procesul de service prin curier</h2>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>După plasarea comenzii, curierul ridică telefonul de la client</li>
                  <li>Telefonul este recepționat în service</li>
                  <li>Se efectuează reparația solicitată</li>
                  <li>Telefonul este testat</li>
                  <li>Telefonul este returnat clientului prin curier</li>
                </ol>
                <p className="mt-2">Deschiderea coletului și operațiunea de service sunt filmate, pentru transparență și documentarea stării dispozitivului.</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Timp de reparație</h2>
                <p>
                  Reparația este realizată în aceeași zi în care telefonul ajunge în service, în funcție de: starea dispozitivului, complexitatea intervenției, necesitatea unor reparații suplimentare. Timpul de transport nu este inclus în timpul efectiv de reparație.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Manopera și costuri</h2>
                <p>Costul manoperei include:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>intervenția de service</li>
                  <li>testarea telefonului după reparație</li>
                  <li>transportul dus–întors prin curier</li>
                </ul>
                <p className="mt-2">Costul display-ului și al altor componente se achiziționează separat.</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Reparații suplimentare</h2>
                <p>
                  În cadrul aceleiași intervenții, pot fi efectuate și alte reparații, precum: înlocuire conector de încărcare, înlocuire bandă flex, înlocuire difuzor, alte intervenții compatibile plăcii de bază. Aceste servicii se efectuează doar după evaluare și confirmarea explicită a clientului, iar costurile se comunică separat.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Defecte preexistente</h2>
                <p>Nu ne asumăm răspunderea pentru:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>defecte cauzate de contactul cu lichide</li>
                  <li>oxidații</li>
                  <li>lovituri puternice</li>
                  <li>probleme existente ale plăcii de bază</li>
                  <li>alte defecte constatate pe parcursul reparației, dar care nu au legătură directă cu serviciul solicitat</li>
                </ul>
                <p className="mt-2">Clientul va fi informat dacă sunt identificate astfel de probleme.</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Capac spate din sticlă</h2>
                <p>
                  În cazul telefoanelor cu capac spate din sticlă, există riscul ca acesta să se crape sau să se zgârie în timpul demontării, mai ales dacă telefonul a fost anterior lovit, tensionat sau reparat. ecranul.ro nu își asumă răspunderea pentru eventualele deteriorări ale capacului spate apărute în timpul demontării necesare reparației.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Codul de deblocare și datele personale</h2>
                <p>
                  Pentru testarea completă a telefonului după reparație, clientul este de acord să furnizeze codul de deblocare al dispozitivului. Codul: este utilizat exclusiv pentru testare tehnică; nu este stocat; nu este folosit pentru accesarea datelor personale. Recomandăm realizarea unui backup înainte de trimiterea telefonului în service.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">10. Date personale</h2>
                <p>
                  Datele personale sunt prelucrate exclusiv în scopul prestării serviciului, conform Politicii de Confidențialitate ecranul.ro.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">11. Limitarea răspunderii</h2>
                <p>ecranul.ro nu este responsabil pentru:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>pierderea datelor personale</li>
                  <li>defecte preexistente</li>
                  <li>întârzieri cauzate de firmele de curierat</li>
                  <li>situații de forță majoră</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">12. Acceptarea termenilor</h2>
                <p>
                  Plasarea comenzii pentru serviciul de service prin curier reprezintă acceptarea integrală a prezentelor Termeni și Condiții.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pentru întrebări despre service prin curier: <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700 font-semibold">ecranul@yahoo.com</a> sau telefon <a href="tel:0799665665" className="text-primary-600 hover:text-primary-700 font-semibold">0799665665</a>. Consultați și <Link href="/termeni-conditii" className="text-primary-600 hover:text-primary-700 font-semibold">Termenii și Condițiile</Link>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
