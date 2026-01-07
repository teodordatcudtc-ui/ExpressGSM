import Link from 'next/link'
import { FiPhone, FiMapPin, FiMail, FiFacebook, FiInstagram, FiClock, FiLock } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Express GSM Network</h3>
            <p className="text-gray-400 mb-4">
              Service GSM profesional în București. Reparații rapide, accesorii de calitate și servicii complete pentru telefoane.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Link-uri Rapide</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">
                  Acasă
                </Link>
              </li>
              <li>
                <Link href="/servicii" className="hover:text-primary-400 transition-colors">
                  Servicii
                </Link>
              </li>
              <li>
                <Link href="/despre-noi" className="hover:text-primary-400 transition-colors">
                  Despre Noi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary-400 transition-colors">
                  Magazin
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-primary-400 transition-colors flex items-center gap-1">
                  <FiLock className="w-4 h-4" />
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiPhone className="w-5 h-5 mt-1 text-primary-400" />
                <a href="tel:0799665665" className="hover:text-primary-400 transition-colors">
                  0799665665
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 mt-1 text-primary-400" />
                <span>
                  Bulevardul Bucureștii Noi 50a<br />
                  București 013152
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <FiClock className="w-5 h-5 mt-1 text-primary-400" />
                <span>
                  Luni - Vineri: 09:00 - 19:00<br />
                  Sâmbătă: 09:00 - 17:00
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-4">Urmărește-ne</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Express GSM Network. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  )
}

