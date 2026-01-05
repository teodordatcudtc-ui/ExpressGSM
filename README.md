# Express GSM Network - Website

Site web modern și profesional pentru service GSM, construit cu Next.js 14, React, TypeScript și Tailwind CSS.

## 🚀 Caracteristici

- **Design Modern**: Interfață profesională cu nuanțe de albastru și animații subtile
- **Responsive**: Optimizat pentru desktop, tabletă și mobil
- **SEO Optimizat**: Meta tags, structured data și optimizări pentru motoarele de căutare
- **Performanță**: Viteza de încărcare optimizată cu Next.js
- **Animații Smooth**: Micro-animații și tranziții folosind Framer Motion
- **Formular de Contact**: Validare live cu react-hook-form

## 📋 Cerințe

- Node.js 18.x sau mai nou
- npm sau yarn

## 🛠️ Instalare

1. **Clonează repository-ul** (dacă este cazul) sau navighează în directorul proiectului:
```bash
cd express-gsm-network
```

2. **Instalează dependențele**:
```bash
npm install
```
sau
```bash
yarn install
```

## 🏃 Rulare Locală

Pentru a rula site-ul în modul de dezvoltare:

```bash
npm run dev
```
sau
```bash
yarn dev
```

Site-ul va fi disponibil la: [http://localhost:3000](http://localhost:3000)

## 📦 Build pentru Producție

Pentru a crea un build optimizat pentru producție:

```bash
npm run build
```
sau
```bash
yarn build
```

Pentru a rula build-ul de producție local:

```bash
npm start
```
sau
```bash
yarn start
```

## 🌐 Deploy

### Vercel (Recomandat)

1. **Instalează Vercel CLI** (opțional):
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

Sau conectează repository-ul direct pe [Vercel](https://vercel.com) pentru deploy automat.

### Netlify

1. **Instalează Netlify CLI**:
```bash
npm i -g netlify-cli
```

2. **Build și deploy**:
```bash
npm run build
netlify deploy --prod
```

### Alte Platforme

Site-ul poate fi deployat pe orice platformă care suportă Next.js:
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

## 📁 Structura Proiectului

```
express-gsm-network/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Pagina principală (Home)
│   ├── servicii/          # Pagina Servicii
│   ├── despre-noi/        # Pagina Despre Noi
│   ├── contact/           # Pagina Contact
│   ├── layout.tsx         # Layout principal
│   └── globals.css        # Stiluri globale
├── components/            # Componente reutilizabile
│   ├── Header.tsx         # Header cu navigare
│   ├── Footer.tsx         # Footer
│   ├── Hero.tsx           # Hero section
│   ├── ServicesSection.tsx
│   ├── ServicesDetail.tsx
│   ├── Testimonials.tsx   # Slider testimoniale
│   ├── LocationMap.tsx    # Hartă Google Maps
│   ├── ContactForm.tsx    # Formular contact
│   ├── AboutUs.tsx        # Pagina Despre Noi
│   └── CTA.tsx            # Call-to-action
├── public/                # Fișiere statice (dacă există)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🎨 Personalizare

### Culori

Culorile pot fi modificate în `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Nuanțe de albastru
  },
  accent: {
    orange: '#f97316',
    green: '#10b981',
  },
}
```

### Conținut

- **Informații de contact**: Modifică în componentele `Header.tsx`, `Footer.tsx`, `LocationMap.tsx` și `ContactForm.tsx`
- **Servicii**: Editează array-ul `services` în `ServicesSection.tsx` și `ServicesDetail.tsx`
- **Testimoniale**: Modifică array-ul `testimonials` în `Testimonials.tsx`

## 📱 Informații de Contact

- **Telefon**: 0799665665
- **Adresă**: Bulevardul Bucureștii Noi 50a, București 013152
- **Program**: Luni-Vineri: 09:00-19:00, Sâmbătă: 09:00-17:00

## 🔧 Tehnologii Utilizate

- **Next.js 14**: Framework React pentru producție
- **React 18**: Biblioteca UI
- **TypeScript**: Tipare statice pentru JavaScript
- **Tailwind CSS**: Framework CSS utility-first
- **Framer Motion**: Biblioteca pentru animații
- **React Hook Form**: Gestionare formulare
- **React Icons**: Iconițe

## 📝 Note

- Formularul de contact este configurat pentru simulare. Pentru funcționalitate completă, conectează-l la un serviciu de email (ex: SendGrid, Resend) sau un backend API.
- Hartă Google Maps este embedded și funcționează direct.
- Toate paginile sunt optimizate pentru SEO cu metadata corespunzătoare.

## 🐛 Troubleshooting

### Eroare la instalare
Dacă întâmpini probleme la instalare, șterge `node_modules` și `package-lock.json`, apoi rulează din nou:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port deja folosit
Dacă portul 3000 este ocupat, Next.js va folosi automat următorul port disponibil.

## 📄 Licență

Acest proiect este proprietate privată a Express GSM Network.

---

**Dezvoltat cu ❤️ pentru Express GSM Network**

