import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import LocationMap from '@/components/LocationMap'

export const metadata: Metadata = {
  title: 'Contact - ecranul.ro | Programează o Reparație București',
  description: 'Contactează ecranul.ro pentru reparații telefoane, accesorii sau consultanță. Telefon: 0799665665. Adresă: Strada Pajurei 7, București.',
  keywords: 'contact ecranul.ro, programare reparație telefon, service GSM București, telefon service GSM',
}

export default function ContactPage() {
  return (
    <div className="pt-8">
      <ContactForm />
      <LocationMap />
    </div>
  )
}

