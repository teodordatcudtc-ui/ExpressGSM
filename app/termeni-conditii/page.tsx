'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiFileText } from 'react-icons/fi'

export default function TermsConditionsPage() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Înapoi la pagina principală</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <FiFileText className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">Termeni și Condiții</h1>
          </div>
          <p className="text-gray-600">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
        >
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termeni și Condiții</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Folosirea acestui site implică acceptarea termenilor și condițiilor de mai jos. Recomandăm citirea cu atenție a acestora. Ecranul.ro (SC Lnv Network SRL) își asumă dreptul de a modifica aceste prevederi fără o altă notificare. Cea mai recentă versiune poate fi accesată în această pagină.
              </p>
              <p>
                Accesul/vizitarea acestui website de către dumneavoastră se supune Termenilor și condițiilor de utilizare, și implică acceptul explicit al dumneavoastră cu privire la acestea și reprezintă înțelegerea dintre părți.
              </p>
              <p>Relația dintre părți este guvernată de următoarele acte normative:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>OG nr. 21/1992 privind protecția consumatorilor</li>
                <li>OUG nr. 34/2014 privind drepturile consumatorilor în cadrul contractelor încheiate cu profesioniștii</li>
                <li>Legea nr. 363/2007 privind combaterea practicilor incorecte ale comercianților în relația cu consumatorii și armonizarea reglementărilor cu legislația europeană privind protecția consumatorilor</li>
                <li>Legea 365/2002 privind comerțul electronic</li>
              </ul>
              <p>
                Ecranul.ro (SC Lnv Network SRL) garantează utilizatorului acces limitat, în interes personal (efectuarea de comenzi online, informare), pe site-ul Ecranul.ro (SC Lnv Network SRL) și nu îi conferă dreptul de a descărca sau de a modifica parțial sau integral site-ul, de a reproduce parțial sau integral site-ul, de a copia, de a vinde/revinde sau de a exploata site-ul în orice altă manieră, în scopuri comerciale sau fără acordul prealabil scris al acesteia.
              </p>
              <p>
                Întregul conținut al site-ului Ecranul.ro (SC Lnv Network SRL) – imagini, texte, grafice, simboluri, elemente de grafică web, email-uri, scripturi, programe și alte date – este proprietatea Ecranul.ro (SC Lnv Network SRL), și a furnizorilor săi și este apărat de Legea pentru protecția drepturilor de autor (legea nr. 8/1996) și de legile privind proprietatea intelectuală și industrială. Folosirea fără acordul Ecranul.ro (SC Lnv Network SRL) a oricăror elemente enumerate mai sus se pedepsește conform legislației în vigoare.
              </p>
              <p>
                Domeniul ecranul.ro este deținut de către SC Lnv Network SRL. Utilizarea acestei mărci, a domeniului sau a numelor de comercializare, siglelor și emblemelor, în formă directă sau „ascunsă” (de tipul, dar nu limitat la, meta taguri sau alte tehnici de indexare, căutare web) fără permisiunea prealabilă scrisă este interzisă și se pedepsește conform legii.
              </p>
              <p>
                Produsele prezentate pe ecranul.ro sunt importate și comercializate de SC Lnv Network SRL. Prețurile produselor pot fi schimbate oricând. Verificați prețul final de vânzare înainte de a achiziționa un produs.
              </p>
              <p>
                Toate fotografiile produselor prezentate au caracter informativ, pot diferi față de produsul vândut și pot arăta accesorii ce nu sunt incluse în pachetul standard al produsului. Toate fotografiile prezentate pot să nu fie actualizate la înfățișarea actuală a produselor. Fotografiile ambalajelor pot diferi în realitate față de cele din pozele de pe acest site. Designul, culorile, formele pot diferi în realitate față de cele din pozele de pe site. Specificațiile tehnice și caracteristicile descrise sunt cu titlu informativ, putând fi schimbate fără înștiințare prealabilă și nu constituie obligativitate contractuală. Toate prezentările nu obligă firma producătoare sau pe noi, comerciantul / furnizorul, în niciun fel față de client. Înainte de a achiziționa un produs cereți informații de actualitate și exacte despre produs, ignorând ceea ce este descris și prezentat în site.
              </p>
              <p>
                Unele informații din paginile web pot fi vechi / neactualizate, incomplete sau eronate. Nu ne asumăm nicio răspundere sau obligație vis-à-vis de posibilele consecințe ce ar rezulta din folosirea acestor informații. Folosirea pozelor sau a informațiilor de pe site-ul acesta fără a le verifica obligatoriu înainte de cumpărarea produselor este pe riscul exclusiv al clientului, acesta acceptând fără rezerve și irevocabil că ignorarea avertismentelor de mai sus i-ar putea crea neplăceri, pagube sau diverse alte pierderi de orice natură, pe care nu i le va putea imputa în niciun fel furnizorului sau producătorilor sau partenerilor furnizorului.
              </p>
              <p>
                Mărcile și denumirile comerciale ce apar în paginile web ce aparțin acestui domeniu și domeniilor conexe aparțin proprietarilor lor de drept. Furnizorul menționează aceste mărci (branduri) și denumiri comerciale numai pentru a identifica produsele respective. Furnizorul produselor respectă în totalitate și fără rezerve drepturile de proprietate intelectuală ale titularilor de drept.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pentru orice întrebări legate de Termenii și Condițiile:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong>{' '}
                <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700">ecranul@yahoo.com</a>
              </p>
              <p className="text-gray-700">
                <strong>Telefon:</strong>{' '}
                <a href="tel:0799665665" className="text-primary-600 hover:text-primary-700">0799665665</a>
              </p>
              <p className="text-gray-700">
                <strong>Adresă:</strong> Strada Pajurei 7, Sector 1, București, 011318
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              Consultați și <Link href="/politica-retur" className="text-primary-600 hover:text-primary-700 font-semibold">Politica de retur</Link>, <Link href="/garantii" className="text-primary-600 hover:text-primary-700 font-semibold">Garanțiile</Link> și <Link href="/politica-livrare#service-curier" className="text-primary-600 hover:text-primary-700 font-semibold">Service prin curier</Link>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
