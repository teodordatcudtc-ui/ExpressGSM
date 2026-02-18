'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiPackage } from 'react-icons/fi'

export default function PoliticaReturPage() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <FiArrowLeft className="w-5 h-5" />
          Înapoi la pagina principală
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FiPackage className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">Politica de retur</h1>
          </div>
          <p className="text-gray-600">Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Această clauză se aplică conf. O.U.G. 34/2014, în cazul achiziționării de produse din acest site folosind tehnicile de comunicare la distanță.
            </p>
            <p>
              Aveți posibilitatea de a returna orice produs comandat, fără a specifica un motiv, în termen de 14 zile de la recepționarea acestuia. Pentru aceasta e necesar să inițiați o cerere de retur din meniul aferent aflat în partea de jos a paginii. E necesară completarea corectă a tuturor câmpurilor din formular.
            </p>
            <p><strong>Costurile de returnare vor fi suportate integral de către Dvs.</strong></p>
            <p className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <strong>ATENȚIE!!!</strong> Nu primim colete cu plată ramburs. NU ACCEPTĂM RETURURI NEAMBALATE CORESPUNZĂTOR. Toate retururile vor fi ambalate în cutie de carton și folie cu bule. Retururile vor fi expediate spre sediul nostru, la adresa specificată pe acest site. Retururile trimise numai în plic, sau plic cu bule, sau în cutii nesigilate vor fi refuzate.
            </p>
            <p>
              În urma completării formularului de retur, se va genera un document de transport și o cerere de ridicare către un curier. Aceasta e o facilitate pe care societatea noastră o pune la dispoziția clienților, pentru a ușura procesul de retur. Nu este o obligație. În cazul în care, din diverse motive, curierul nu ridică un colet pentru retur, expedierea respectivului colet cade în sarcina Dvs.
            </p>
            <p>
              După verificarea produsului de către un reprezentant al societății noastre, dacă acesta e eligibil pentru retur (produsul e nou, neutilizat, cu folii de protecție intacte, sigiliu de garanție intact, nedezlipit, nemodificat, în ambalajul original), returul va fi confirmat.
            </p>
            <p>
              Contravaloarea produsului se va returna sub formă de credit în magazinul nostru, urmând să fie folosită la ulterioarele comenzi. Dacă doriți returnarea banilor, aceasta se va face într-un cont pe care îl veți pune la dispoziție, în maxim 14 zile calendaristice.
            </p>
            <p>
              Dacă produsul returnat nu îndeplinește una sau mai multe dintre condițiile de retur, societatea noastră își rezervă dreptul de a refuza returul. În acest caz, produsul va fi expediat înapoi cumpărătorului pe cheltuiala acestuia din urmă.
            </p>
            <p>
              Consumatorul este responsabil doar pentru diminuarea valorii produselor care rezultă din manipulări, altele decât cele necesare pentru determinarea naturii, calităților și funcționării produselor. Dacă produsul este returnat într-o stare în care nu mai poate fi vândut ca nou, ne rezervăm dreptul de a solicita o taxă pentru readucerea în stadiul inițial (dacă este posibil) sau pentru a acoperi diferența de preț rezultată din vânzarea produsului ca second-hand. Dacă clientul nu este de acord cu această taxă i se va reexpedia produsul, pe cheltuiala acestuia. Această clauză se aplică conf. definițiilor cuprinse în Ordonanța de urgență nr. 34/2014, în cazul achiziționării de produse din acest site folosind tehnicile de comunicare la distanță.
            </p>
            <p>
              Valoarea produselor folosite, cu urme de uzură (pete, zgârieturi, îndoituri, fisuri, lovituri etc.) se acceptă retur numai după aducerea lor la conformitate, implicând costurile de igienizare, cosmetizare, reparație, înlocuire a eventualelor piese deteriorate și aducere la o formă comercială în vederea vânzării ca produs Recondiționat / Refurbished. Valoarea finală se stabilește în funcție de valoarea pieselor ce trebuie înlocuite și a manoperei de recondiționare sau ca diferența dintre valoarea inițială a produsului nou și valoarea de revânzare a produsului folosit.
            </p>
            <p>
              Valoarea produselor cu ambalajul original deteriorat (carton șifonat și/sau rupt și/sau tăiat și/sau găurit și/sau ud și/sau cu urme de etichete, bandă adezivă, pix, marker etc.) se diminuează cu valoarea aducerii la conformitate.
            </p>
            <p>
              Valoarea produselor cu ambalajul original lipsă sau incomplet (de exemplu: suporți de siguranță, elemente de protecție din carton sau polistiren etc.) se diminuează conform valorii aducerii la conformitate.
            </p>
            <p>
              Orice modificare a stării produselor sau deteriorarea ambalajului original al acestora ce face imposibilă vânzarea produsului ca nou, duce automat la aplicarea procedurii de returnare supusă unor taxe readucere a produselor la starea în care au fost livrate.
            </p>
            <p>
              Diminuarea se aplică între 10%-90% din valoarea inițială a produsului. Taxa de diminuare va fi comunicată către client la recepționarea produselor modificate.
            </p>
            <p>
              În cazul ridicării unui colet deteriorat la transport, implicit a produselor conținute în acesta, clientul trebuie să încheie proces verbal de constatare cu agentul curier (care să conțină detalii despre coletul și/sau produsele deteriorate).
            </p>
            <p>
              În cazul ridicării unui colet deteriorat, implicit a produselor conținute în acesta, fără a încheia proces verbal de constatare cu agentul curier, nu se va oferi garanție produselor deteriorate.
            </p>
          </div>

          <section className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact și formular retur</h2>
            <p className="text-gray-700 leading-relaxed">
              Pentru cerere de retur, utilizați <Link href="/formular-retur" className="text-primary-600 hover:text-primary-700 font-semibold">Formularul de retur</Link>. Pentru întrebări: <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700 font-semibold">ecranul@yahoo.com</a>, <a href="tel:0799665665" className="text-primary-600 hover:text-primary-700 font-semibold">0799665665</a>. Consultați și <Link href="/termeni-conditii" className="text-primary-600 hover:text-primary-700 font-semibold">Termenii și Condițiile</Link>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
