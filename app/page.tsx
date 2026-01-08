import { Metadata } from 'next'
import Hero from '@/components/Hero'
import ProductCarousel from '@/components/ProductCarousel'
import ServicesSection from '@/components/ServicesSection'
import Testimonials from '@/components/Testimonials'
import LocationMap from '@/components/LocationMap'
import CTA from '@/components/CTA'

export const metadata: Metadata = {
  title: 'ecranul.ro - Reparații Telefoane București | Service GSM Profesional',
  description: 'Service GSM profesional în București. Reparații telefoane rapide, vânzări accesorii, ecrane și baterii. Servicii de calitate la Strada Pajurei 7, București.',
  keywords: 'reparații telefoane București, service GSM, accesorii telefoane, ecrane telefoane, baterii telefoane, ecranul.ro, service iPhone, service Samsung',
  openGraph: {
    title: 'ecranul.ro - Service GSM Profesional București',
    description: 'Reparații telefoane rapide și accesorii GSM de calitate în București',
    type: 'website',
    locale: 'ro_RO',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCarousel />
      <ServicesSection />
      <CTA />
      <Testimonials />
      <LocationMap />
    </>
  )
}

