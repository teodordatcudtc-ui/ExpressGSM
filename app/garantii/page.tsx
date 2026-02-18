'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiShield } from 'react-icons/fi'

export default function GarantiiPage() {
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
            <h1 className="text-4xl font-bold text-gray-900">Garanții</h1>
          </div>
          <p className="text-gray-600">Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Toate produsele cumpărate prin intermediul acestui site beneficiază de garanție, termenul de garanție fiind de 1-24 luni de la cumpărare, în funcție de produsul achiziționat. Pentru piese de schimb nu se oferă garanție post-montaj. Vă rugăm să verificați înainte de montaj componentele comandate. Îndepărtarea sigiliilor duce la pierderea garanției! Excepție fac adezivii, care nu beneficiază de garanție datorită naturii lor, și acumulatorii, care beneficiază de garanție 90 zile de la data vânzării, chiar și după montaj.
            </p>
            <p>
              SC Lnv Network SRL nu își asumă răspunderea pentru defecțiunile produselor comercializate, survenite ca urmare a folosirii de către dvs. în necunoaștere de cauză, ori în condițiile montării necorespunzătoare a produselor. Pentru a beneficia de garanție, vă rugăm să ne anunțați și să ne trimiteți retur produsul în cel mai scurt timp.
            </p>
            <p>
              Nu fac obiectul garanției produsele care prezintă defecte fizice precum: lovituri, crăpături, ciobituri, etc., etichete sau sigilii de garanție deteriorate, îndepărtate sau modificate, produsele utilizate în condiții inadecvate (tensiuni de alimentare necorespunzătoare, supunerea la variații mari de temperatură și presiune, șocuri mecanice, manipulare incorectă, utilizarea produselor în condiții de umiditate, praf, noxe sau sub acțiunea substanțelor chimice, etc.), setări și instalări incorecte, surse defecte, prize fără împământare, pătrunderea de lichide, metale sau alte substanțe în interiorul echipamentelor, intervenția mecanică sau plastică asupra produselor, conectarea sau deconectarea anumitor componente în timpul funcționării echipamentelor. Accesoriile (cabluri de date, cabluri de încărcare, adaptoare, etc.) beneficiază de garanție 12 luni, însă numai dacă problemele survenite nu se datorează utilizării improprii. Astfel, accesoriile deteriorate fizic (rupte, îndoite, sparte, ciobite, arse, etc.) nu vor face obiectul garanției. De asemenea, garanția nu acoperă uzura în timp a produselor.
            </p>
            <p>
              Menționăm că se oferă garanție numai în cazul în care produsele au sigiliile de garanție întregi, astfel că vă rugăm să testați produsele înainte de a îndepărta sigiliile și foliile protectoare și înainte de a le monta. Sigiliul de garanție este aplicat de noi, direct pe produs. Acesta se prezintă sub forma unei ștampile cu ecranul.ro. Datorită faptului că aplicăm sigilii direct pe produse, nicio cutie nu se va livra sigilată. Personalul nostru le desigilează atunci când aplică sigiliul de garanție.
            </p>
            <p>
              Produsele vor fi înlocuite cu aceleași produse sau pot fi scăzute sau înlocuite cu produse diferite. Ne rezervăm dreptul de a alege varianta cea mai puțin costisitoare de rezolvare a retururilor.
            </p>
            <p>
              În cazul produselor returnate, clientul e direct răspunzător pentru integritatea produsului pe durata transportului. Vă rugăm să ambalați în folie cu bule și cutie de carton produsele pe care le trimiteți retur. Produsele ambalate necorespunzător nu vor fi stornate/înlocuite.
            </p>
          </div>

          <section className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pentru cerere de garanție sau retur: <a href="mailto:ecranul@yahoo.com" className="text-primary-600 hover:text-primary-700 font-semibold">ecranul@yahoo.com</a>, <a href="tel:0799665665" className="text-primary-600 hover:text-primary-700 font-semibold">0799665665</a>. Consultați <Link href="/politica-retur" className="text-primary-600 hover:text-primary-700 font-semibold">Politica de retur</Link> și <Link href="/termeni-conditii" className="text-primary-600 hover:text-primary-700 font-semibold">Termenii și Condițiile</Link>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
