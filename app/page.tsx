import { Metadata } from 'next'
import Hero from '@/components/Hero'
import ServicesSection from '@/components/ServicesSection'
import Testimonials from '@/components/Testimonials'
import LocationMap from '@/components/LocationMap'
import CTA from '@/components/CTA'

export const metadata: Metadata = {
  title: 'Express GSM Network - Reparații Telefoane București | Service GSM Profesional',
  description: 'Service GSM profesional în București. Reparații telefoane rapide, vânzări accesorii, ecrane și baterii. Servicii de calitate la Bulevardul Bucureștii Noi 50a.',
  keywords: 'reparații telefoane București, service GSM, accesorii telefoane, ecrane telefoane, baterii telefoane, Express GSM Network, service iPhone, service Samsung',
  openGraph: {
    title: 'Express GSM Network - Service GSM Profesional București',
    description: 'Reparații telefoane rapide și accesorii GSM de calitate în București',
    type: 'website',
    locale: 'ro_RO',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <CTA />
      <Testimonials />
      <LocationMap />
    </>
  )
}

