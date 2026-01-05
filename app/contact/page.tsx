import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import LocationMap from '@/components/LocationMap'

export const metadata: Metadata = {
  title: 'Contact - Express GSM Network | Programează o Reparație București',
  description: 'Contactează Express GSM Network pentru reparații telefoane, accesorii sau consultanță. Telefon: 0799665665. Adresă: Bulevardul Bucureștii Noi 50a, București.',
  keywords: 'contact Express GSM Network, programare reparație telefon, service GSM București, telefon service GSM',
}

export default function ContactPage() {
  return (
    <div className="pt-8">
      <ContactForm />
      <LocationMap />
    </div>
  )
}

