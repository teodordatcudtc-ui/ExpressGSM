# Express GSM Network - Website

Site web modern și profesional pentru service GSM, construit cu Next.js 14, React, TypeScript și Tailwind CSS.

## 🚀 Caracteristici

- **Design Modern**: Interfață profesională cu nuanțe de albastru și animații subtile
- **Responsive**: Optimizat pentru desktop, tabletă și mobil
- **SEO Optimizat**: Meta tags, structured data și optimizări pentru motoarele de căutare
- **Performanță**: Viteza de încărcare optimizată cu Next.js
- **Animații Smooth**: Micro-animații și tranziții folosind Framer Motion
- **Formular de Contact**: Validare live cu react-hook-form
- **🛒 Magazin Online**: Sistem complet de e-commerce cu categorii de produse
- **🛍️ Coș de Cumpărături**: Coș persistent cu gestionare cantități
- **💳 Checkout**: Formular de checkout complet cu validare
- **📦 Dashboard Admin**: Panou administrativ pentru gestionarea produselor și comenzilor
- **💾 Baza de Date SQLite**: Sistem de stocare locală pentru produse, categorii și comenzi

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
│   ├── shop/              # Pagina Magazin
│   ├── checkout/          # Pagina Checkout
│   ├── admin/             # Dashboard Admin
│   │   └── orders/        # Detalii comenzi
│   ├── api/               # API Routes
│   │   ├── categories/    # API categorii
│   │   ├── products/      # API produse
│   │   ├── orders/        # API comenzi
│   │   └── admin/         # API admin
│   ├── servicii/          # Pagina Servicii
│   ├── despre-noi/        # Pagina Despre Noi
│   ├── contact/           # Pagina Contact
│   ├── layout.tsx         # Layout principal
│   └── globals.css        # Stiluri globale
├── components/            # Componente reutilizabile
│   ├── Header.tsx         # Header cu navigare și coș
│   ├── Footer.tsx         # Footer
│   ├── Cart.tsx           # Componentă coș de cumpărături
│   ├── Hero.tsx           # Hero section
│   ├── ServicesSection.tsx
│   ├── ServicesDetail.tsx
│   ├── Testimonials.tsx   # Slider testimoniale
│   ├── LocationMap.tsx    # Hartă Google Maps
│   ├── ContactForm.tsx    # Formular contact
│   ├── AboutUs.tsx        # Pagina Despre Noi
│   └── CTA.tsx            # Call-to-action
├── lib/                   # Utilitare și configurații
│   └── db.ts              # Configurare baza de date SQLite
├── store/                 # State management
│   └── cartStore.ts       # Store pentru coș de cumpărături
├── data/                  # Baza de date SQLite (generată automat)
│   └── shop.db            # Fișier baza de date
├── public/                # Fișiere statice
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
- **Better-SQLite3**: Baza de date SQLite pentru Node.js
- **Zustand**: Gestionare state pentru coș de cumpărături

## 🛒 Funcționalități Magazin

### Pentru Clienți
- **Magazin cu Categorii**: Navigare prin categorii de produse (Ecrane, Baterii, Accesorii, Reparații)
- **Coș de Cumpărături**: Adăugare produse în coș, modificare cantități, ștergere produse
- **Checkout**: Formular complet de checkout cu validare date client
- **Procesare Comenzi**: Sistem funcțional de procesare comenzi (fără integrare plată externă)

### Pentru Admin
- **Dashboard Admin**: Acces la `/admin` pentru gestionarea produselor și comenzilor
- **Gestionare Produse**: Adăugare, editare, ștergere produse cu categorii, prețuri, stoc
- **Gestionare Comenzi**: Vizualizare comenzi, actualizare status, gestionare stoc

### Baza de Date
- **SQLite**: Baza de date este creată automat în directorul `data/shop.db`
- **Tabele**: Categorii, Produse, Comenzi, Items Comenzi
- **Inițializare**: Baza de date se inițializează automat cu categorii default la prima rulare

## 📝 Note

- Formularul de contact este configurat pentru simulare. Pentru funcționalitate completă, conectează-l la un serviciu de email (ex: SendGrid, Resend) sau un backend API.
- Hartă Google Maps este embedded și funcționează direct.
- Toate paginile sunt optimizate pentru SEO cu metadata corespunzătoare.
- **Plata**: Sistemul de comenzi funcționează complet, dar plata se presupune a fi efectuată la livrare (ramburs). Nu există integrare cu procesatori de plată externi.
- **Baza de Date**: Fișierul `data/shop.db` este generat automat și nu trebuie inclus în git (este deja în `.gitignore`).

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

