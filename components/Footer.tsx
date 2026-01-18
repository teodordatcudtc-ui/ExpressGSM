'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FiPhone, FiMapPin, FiMail, FiFacebook, FiInstagram, FiClock, FiLock } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">ecranul.ro</h3>
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
                  Strada Pajurei 7<br />
                  București
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

        {/* Legal Links and Badges */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            {/* Legal Links - Left */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              <Link href="/politica-cookie" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Politica de Utilizare Cookie-uri
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link href="/termeni-conditii" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Termeni și Condiții
              </Link>
            </div>

            {/* ANPC Badges - Right */}
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4">
              <a
                href="https://anpc.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity inline-block"
                title="Autoritatea Națională pentru Protecția Consumatorilor"
              >
                <Image
                  src="/anpc-badge.png"
                  alt="ANPC - Autoritatea Națională pentru Protecția Consumatorilor"
                  width={80}
                  height={40}
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    // Fallback dacă imaginea nu există
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </a>
              <a
                href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity inline-block"
                title="Platforma Online de Soluționare Alternativă a Litigiilor"
              >
                <Image
                  src="/sol-badge.png"
                  alt="SOL - Platforma Online de Soluționare Alternativă a Litigiilor"
                  width={80}
                  height={40}
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    // Fallback dacă imaginea nu există
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} ecranul.ro. Toate drepturile rezervate.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

