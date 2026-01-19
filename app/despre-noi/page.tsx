import { Metadata } from 'next'
import AboutUs from '@/components/AboutUs'

export const metadata: Metadata = {
  title: 'Despre Noi - ecranul.ro | Service GSM Profesional București',
  description: 'ecranul.ro - Service GSM profesional în București cu experiență în reparații telefoane și accesorii. Echipa noastră oferă servicii de calitate cu garanție.',
  keywords: 'despre ecranul.ro, service GSM București, echipă reparații telefoane, valori business GSM',
}

export default function DespreNoiPage() {
  return (
    <div className="pt-8">
      <AboutUs />
    </div>
  )
}

