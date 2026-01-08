# Configurare Email SMTP - ecranul.ro

## Opțiunea 1: Gmail SMTP (Recomandat pentru început) ⭐

Gmail oferă SMTP gratuit, perfect pentru început.

### Pași:

1. **Activează "App Passwords" în Gmail**
   - Mergi la [Google Account](https://myaccount.google.com/)
   - Click pe **Security** (Securitate)
   - Activează **2-Step Verification** (dacă nu este deja activat)
   - Mergi la **App Passwords** (Parole pentru aplicații)
   - Click **"Select app"** → Alege **"Mail"**
   - Click **"Select device"** → Alege **"Other (Custom name)"**
   - Scrie: **"ecranul.ro"**
   - Click **"Generate"**
   - **Copiază parola generată** (16 caractere, fără spații)

2. **Configurează variabilele de mediu**

   **Local (.env.local):**
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   SMTP_FROM=noreply@ecranul.ro
   ```

   **Vercel (Environment Variables):**
   - Mergi la Vercel Dashboard → Proiect → Settings → Environment Variables
   - Adaugă:
     - `SMTP_HOST` = `smtp.gmail.com`
     - `SMTP_PORT` = `587`
     - `SMTP_USER` = email-ul tău Gmail
     - `SMTP_PASS` = parola de aplicație generată (16 caractere)
     - `SMTP_FROM` = `noreply@ecranul.ro` sau email-ul tău Gmail

3. **Redeploy aplicația pe Vercel**

## Opțiunea 2: Outlook/Hotmail SMTP

1. **Configurează variabilele:**

   **Local (.env.local):**
   ```bash
   SMTP_HOST=smtp-mail.outlook.com
   SMTP_PORT=587
   SMTP_USER=your-email@outlook.com
   SMTP_PASS=your-password
   SMTP_FROM=noreply@ecranul.ro
   ```

   **Vercel:**
   - Adaugă aceleași variabile în Environment Variables

## Opțiunea 3: SMTP Personal (Hosting, cPanel, etc.)

Dacă ai hosting cu cPanel sau alt serviciu SMTP:

1. **Obține setările SMTP de la provider**
   - De obicei: `smtp.yourdomain.com` sau `mail.yourdomain.com`
   - Port: `587` (TLS) sau `465` (SSL)

2. **Configurează variabilele:**

   ```bash
   SMTP_HOST=smtp.yourdomain.com
   SMTP_PORT=587
   SMTP_USER=noreply@yourdomain.com
   SMTP_PASS=your-email-password
   SMTP_FROM=noreply@yourdomain.com
   ```

## Testare

După configurare:

1. **Plasează o comandă de test**
2. **Verifică că email-ul ajunge în inbox**
3. **Verifică și spam-ul** (primul email poate ajunge acolo)

## Notă Importantă

- **Gmail** are limite: **500 email-uri/zi** pentru conturi gratuite
- Pentru volume mai mari, consideră un serviciu dedicat (SendGrid, Mailgun, etc.)
- **SMTP_FROM** poate fi diferit de **SMTP_USER** (dacă serverul tău permite)

## Troubleshooting

### Email-urile nu se trimit:

1. **Verifică că toate variabilele sunt setate corect**
2. **Verifică că parola de aplicație (Gmail) este corectă**
3. **Verifică logs-urile în Vercel** pentru erori
4. **Testează local** cu `.env.local` înainte de deploy

### Email-urile ajung în spam:

1. **Folosește un domeniu verificat** (nu Gmail generic)
2. **Configurează SPF și DKIM** în DNS
3. **Evită cuvinte de spam** în subiect/conținut

## Template Email

Template-ul HTML este generat automat în `lib/email.ts` și include:
- Design modern și responsive
- Detalii complete despre comandă
- Lista produselor
- Totalul comenzii
- Informații de contact
