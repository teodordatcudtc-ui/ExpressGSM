'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiShield } from 'react-icons/fi'

export default function CookiePolicyPage() {
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
            <FiShield className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Politica de Utilizare Cookie-uri
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Ce sunt cookie-urile?</h2>
            <p className="text-gray-700 leading-relaxed">
              Cookie-urile sunt fișiere text mici care sunt stocate pe dispozitivul dvs. (computer, tabletă sau telefon mobil) 
              atunci când vizitați un site web. Acestea permit site-ului să-și amintească acțiunile și preferințele dvs. 
              (cum ar fi autentificarea, limba, dimensiunea fontului și alte preferințe de afișare) pe o perioadă de timp, 
              astfel încât nu trebuie să le reintroduceți de fiecare dată când reveniți pe site sau navigați de la o pagină la alta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cum folosim cookie-urile?</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Site-ul nostru folosește cookie-uri pentru:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Funcționalitate esențială: pentru a vă permite să navigați pe site și să utilizați funcțiile de bază</li>
              <li>Preferințe: pentru a-și aminti setările dvs. (limba, preferințele de afișare)</li>
              <li>Autentificare: pentru a vă menține conectat în contul dvs.</li>
              <li>Coș de cumpărături: pentru a păstra produsele adăugate în coș</li>
              <li>Analiză: pentru a înțelege cum utilizați site-ul și pentru a îmbunătăți experiența dvs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Tipuri de cookie-uri folosite</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookie-uri esențiale</h3>
                <p className="text-gray-700 leading-relaxed">
                  Aceste cookie-uri sunt necesare pentru funcționarea site-ului și nu pot fi dezactivate în sistemele noastre. 
                  Ele sunt de obicei setate doar ca răspuns la acțiunile pe care le faceți și care echivalează cu o solicitare de servicii, 
                  cum ar fi setarea preferințelor de confidențialitate, conectarea sau completarea formularelor.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookie-uri de performanță</h3>
                <p className="text-gray-700 leading-relaxed">
                  Aceste cookie-uri ne permit să numărăm vizitele și sursele de trafic, astfel încât să putem măsura și îmbunătăți 
                  performanța site-ului nostru. Ne ajută să știm care pagini sunt cele mai populare și mai puțin populare și să vedem 
                  cum vizitatorii se mișcă pe site.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookie-uri de funcționalitate</h3>
                <p className="text-gray-700 leading-relaxed">
                  Aceste cookie-uri permit site-ului să ofere funcționalitate și personalizare îmbunătățită. 
                  Pot fi setate de noi sau de furnizori terți ale căror servicii am adăugat pe paginile noastre.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Gestionarea cookie-urilor</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Puteți controla și/sau șterge cookie-urile după cum doriți. Puteți șterge toate cookie-urile care sunt deja pe computerul dvs. 
              și puteți seta majoritatea browserelor pentru a preveni plasarea acestora. Totuși, dacă faceți acest lucru, 
              este posibil să trebuiască să ajustați manual unele preferințe de fiecare dată când vizitați un site, 
              iar unele servicii și funcționalități pot să nu funcționeze.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Pentru a gestiona cookie-urile, consultați setările browserului dvs. Fiecare browser oferă o metodă diferită 
              de gestionare a cookie-urilor în preferințele sale.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Dacă aveți întrebări despre utilizarea cookie-urilor pe site-ul nostru, vă rugăm să ne contactați la:{' '}
              <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700 font-semibold">
                ecranul@yahoo.com
              </a>
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
