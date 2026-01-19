# 🚀 Ghid Rapid de Pornire

## Pași Rapizi pentru a Rula Site-ul

### 1. Instalează Dependențele
```bash
npm install
```

### 2. Rulează Site-ul în Modul Dezvoltare
```bash
npm run dev
```

Site-ul va fi disponibil la: **http://localhost:3000**

### 3. Build pentru Producție
```bash
npm run build
npm start
```

## 📋 Checklist Pre-Deploy

- [ ] Verifică că toate informațiile de contact sunt corecte
- [ ] Testează formularul de contact (actualmente simulează trimiterea)
- [ ] Verifică că hartă Google Maps funcționează corect
- [ ] Testează site-ul pe diferite dispozitive (mobile, tabletă, desktop)
- [ ] Verifică viteza de încărcare
- [ ] Testează toate link-urile și navigarea

## 🔧 Configurare Formular Contact

Formularul de contact actualmente simulează trimiterea. Pentru funcționalitate completă:

1. **Opțiunea 1: Email API (Recomandat)**
   - Folosește un serviciu ca SendGrid, Resend sau Nodemailer
   - Configurează endpoint-ul în `components/ContactForm.tsx`

2. **Opțiunea 2: Backend API**
   - Creează un API route în Next.js (`app/api/contact/route.ts`)
   - Conectează formularul la acest endpoint

## 🌐 Deploy Rapid pe Vercel

1. **Instalează Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

Sau conectează repository-ul pe [vercel.com](https://vercel.com) pentru deploy automat.

## 📞 Informații de Contact în Site

Toate informațiile de contact sunt configurate în:
- `components/Header.tsx` - CTA buton
- `components/Footer.tsx` - Footer contact info
- `components/LocationMap.tsx` - Informații și hartă
- `components/ContactForm.tsx` - Formular contact

## ✅ Site-ul Include

- ✅ 4 pagini complete (Home, Servicii, Despre Noi, Contact)
- ✅ Design responsive (mobile, tabletă, desktop)
- ✅ SEO optimizat pentru toate paginile
- ✅ Animații moderne cu Framer Motion
- ✅ Formular de contact cu validare live
- ✅ Hartă Google Maps integrată
- ✅ Testimonials slider automat
- ✅ CTA fix în header

## 🎨 Personalizare Rapidă

### Schimbă Culorile
Editează `tailwind.config.js` → secțiunea `colors`

### Modifică Conținutul
- Servicii: `components/ServicesSection.tsx` și `components/ServicesDetail.tsx`
- Testimoniale: `components/Testimonials.tsx`
- Despre Noi: `components/AboutUs.tsx`

---

**Gata de deploy! 🎉**

