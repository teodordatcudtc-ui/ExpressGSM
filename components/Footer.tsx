'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { FiPhone, FiMapPin, FiMail, FiClock, FiLock, FiShoppingBag } from 'react-icons/fi'
import { FaTiktok } from 'react-icons/fa'

const NTPIdentity = dynamic(() => import('ntp-logo-react').then((m) => m.default), { ssr: false })

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

          {/* Contact Info + Company data (ANPC/Netopia) */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiPhone className="w-5 h-5 mt-1 text-primary-400 shrink-0" />
                <a href="tel:0799665665" className="hover:text-primary-400 transition-colors">
                  0799665665
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <FiMail className="w-5 h-5 mt-1 text-primary-400 shrink-0" />
                <a href="mailto:ecranul@yahoo.com" className="hover:text-primary-400 transition-colors">
                  ecranul@yahoo.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 mt-1 text-primary-400 shrink-0" />
                <span>
                  Strada Pajurei 7, Sector 1<br />
                  București, 011318
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <FiClock className="w-5 h-5 mt-1 text-primary-400 shrink-0" />
                <span>
                  Luni - Vineri: 09:00 - 19:00<br />
                  Sâmbătă: 09:00 - 17:00
                </span>
              </li>
            </ul>
          </div>

          {/* Urmărește-ne: TikTok, OLX, Google Maps */}
          <div>
            <h4 className="text-white font-semibold mb-4">Urmărește-ne</h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.tiktok.com/@ecranul.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="TikTok ecranul.ro"
                title="TikTok"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a
                href="https://expressnetwork.olx.ro/home/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="OLX Express Network"
                title="OLX"
              >
                <FiShoppingBag className="w-5 h-5" />
              </a>
              <a
                href="https://www.google.com/maps/place/Express+Gsm+Network/@44.4807311,26.041028,17z/data=!4m10!1m2!2m1!1sexpress+network+!3m6!1s0x40b20308f1c15c63:0x8dff8f37ec1047ba!8m2!3d44.4807273!4d26.0436029!15sCg9leHByZXNzIG5ldHdvcmsiA4gBAVoRIg9leHByZXNzIG5ldHdvcmuSARhtb2JpbGVfcGhvbmVfcmVwYWlyX3Nob3DgAQA!16s%2Fg%2F11rtqyc6wg?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Locație Google Maps"
                title="Google Maps"
              >
                <FiMapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links and Badges (ANPC SAL + SOL + Netopia) */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col gap-4 mb-4">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm">
              <Link href="/informatii-legale" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                Informații legale
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link href="/termeni-conditii" className="text-gray-400 hover:text-primary-400 transition-colors">
                Termeni și Condiții
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link href="/politica-confidentialitate" className="text-gray-400 hover:text-primary-400 transition-colors">
                Politica de confidențialitate
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link href="/politica-cookie" className="text-gray-400 hover:text-primary-400 transition-colors">
                Politica Cookie-uri
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link href="/politica-livrare" className="text-gray-400 hover:text-primary-400 transition-colors">
                Politica de livrare
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link href="/politica-retur" className="text-gray-400 hover:text-primary-400 transition-colors">
                Politica de retur
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link href="/garantii" className="text-gray-400 hover:text-primary-400 transition-colors">
                Garanții
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link href="/formular-retur" className="text-gray-400 hover:text-primary-400 transition-colors">
                Formular retur
              </Link>
            </div>

            {/* Măsurile ANPC (SAL) + SOL + Logo NETOPIA - Ordin 449/2022 */}
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4">
              <a
                href="https://anpc.ro/ce-este-sal/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity inline-block"
                title="Măsurile ANPC de informare a consumatorilor - Soluționarea alternativă a litigiilor (SAL)"
              >
                <Image
                  src="/anpc-badge.png"
                  alt="ANPC - Soluționarea alternativă a litigiilor (SAL)"
                  width={250}
                  height={50}
                  className="h-[50px] w-auto object-contain max-w-[250px]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </a>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity inline-block"
                title="Platforma SOL - Soluționare Online Litigii"
              >
                <Image
                  src="/sol-badge.png"
                  alt="SOL - Platforma Online de Soluționare Alternativă a Litigiilor"
                  width={250}
                  height={50}
                  className="h-[50px] w-auto object-contain max-w-[250px]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </a>
              <a
                href="https://www.netopia.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block [&_svg]:max-h-10 [&_svg]:w-auto"
                title="Plată securizată cu NETOPIA Payments"
              >
                <NTPIdentity color="#9ca3af" version="horizontal" secret="160327" />
              </a>
            </div>
          </div>

          {/* Copyright + date firmă (ANPC/Netopia) */}
          <div className="text-center text-gray-400 text-sm space-y-1">
            <p>
              <Link href="/informatii-legale" className="hover:text-primary-400 transition-colors">
                LNV NETWORK S.R.L.
              </Link>
              {' | '}
              CUI: 51621916
              {' | '}
              Nr. Reg. Com.: J40/2025/26536005
            </p>
            <p>&copy; {new Date().getFullYear()} ecranul.ro. Toate drepturile rezervate.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

