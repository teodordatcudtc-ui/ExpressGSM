import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ecranul.ro - Magazin Online Telefoane & Reparații GSM București',
  description: 'Magazin online de telefoane, tablete și laptopuri. Reparații GSM profesionale în București. Vânzări accesorii, ecrane, baterii. Servicii rapide și de calitate la Strada Pajurei 7, București.',
  keywords: 'magazin online telefoane, reparații telefoane București, service GSM, accesorii telefoane, ecrane telefoane, baterii telefoane, vânzări telefoane, ecranul.ro',
  authors: [{ name: 'ecranul.ro' }],
  openGraph: {
    title: 'ecranul.ro - Magazin Online Telefoane & Service GSM București',
    description: 'Magazin online de telefoane și reparații GSM profesionale în București',
    type: 'website',
    locale: 'ro_RO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

