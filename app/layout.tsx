import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Express GSM Network - Reparații Telefoane & Accesorii București',
  description: 'Service GSM profesional în București. Reparații telefoane, vânzări accesorii, ecrane, baterii. Servicii rapide și de calitate la Bulevardul Bucureștii Noi 50a.',
  keywords: 'reparații telefoane București, service GSM, accesorii telefoane, ecrane telefoane, baterii telefoane, Express GSM Network',
  authors: [{ name: 'Express GSM Network' }],
  openGraph: {
    title: 'Express GSM Network - Service GSM București',
    description: 'Reparații telefoane profesionale și accesorii GSM în București',
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

