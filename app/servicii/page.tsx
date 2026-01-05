import { Metadata } from 'next'
import ServicesDetail from '@/components/ServicesDetail'

export const metadata: Metadata = {
  title: 'Servicii GSM - Reparații Telefoane, Accesorii, Ecrane | Express GSM Network',
  description: 'Servicii complete GSM: reparații telefoane, înlocuire ecrane, baterii, accesorii premium. Diagnostic gratuit. Service profesional în București.',
  keywords: 'reparații telefoane, înlocuire ecrane, baterii telefoane, accesorii GSM, service iPhone, service Samsung, diagnostic gratuit',
}

export default function ServiciiPage() {
  return (
    <div className="pt-8">
      <ServicesDetail />
    </div>
  )
}

