import { Metadata } from 'next'
import Hero from '@/components/Hero'
import ShopSection from '@/components/ShopSection'
import ServicesSection from '@/components/ServicesSection'
import Testimonials from '@/components/Testimonials'
import LocationMap from '@/components/LocationMap'
import CTA from '@/components/CTA'

export const metadata: Metadata = {
  title: 'ecranul.ro - Magazin Online Telefoane & Reparații GSM București',
  description: 'Magazin online de telefoane, tablete și laptopuri. Reparații GSM profesionale în București. Vânzări accesorii, ecrane și baterii. Servicii de calitate la Strada Pajurei 7, București.',
  keywords: 'magazin online telefoane, reparații telefoane București, service GSM, accesorii telefoane, ecrane telefoane, baterii telefoane, vânzări telefoane, ecranul.ro, service iPhone, service Samsung',
  openGraph: {
    title: 'ecranul.ro - Magazin Online Telefoane & Service GSM București',
    description: 'Magazin online de telefoane și reparații GSM profesionale în București',
    type: 'website',
    locale: 'ro_RO',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <ShopSection />
      <ServicesSection />
      <CTA />
      <Testimonials />
      <LocationMap />
    </>
  )
}

