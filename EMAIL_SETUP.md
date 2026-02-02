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
   SMTP_FROM=contact@ecranul.ro
   OWNER_EMAIL=ecranul@yahoo.com
   ```

   **Vercel (Environment Variables):**
   - Mergi la Vercel Dashboard → Proiect → Settings → Environment Variables
   - Adaugă:
     - `SMTP_HOST` = `smtp.gmail.com`
     - `SMTP_PORT` = `587`
     - `SMTP_USER` = email-ul tău Gmail
     - `SMTP_PASS` = parola de aplicație generată (16 caractere)
     - `SMTP_FROM` = `contact@ecranul.ro` (sau email-ul tău Gmail dacă nu ai domeniu)
     - `OWNER_EMAIL` = `ecranul@yahoo.com` (unde primești notificări la comenzi noi)

3. **Redeploy aplicația pe Vercel**

## Opțiunea 2: Outlook/Hotmail SMTP

1. **Configurează variabilele:**

   **Local (.env.local):**
   ```bash
   SMTP_HOST=smtp-mail.outlook.com
   SMTP_PORT=587
   SMTP_USER=your-email@outlook.com
   SMTP_PASS=your-password
   SMTP_FROM=contact@ecranul.ro
   OWNER_EMAIL=ecranul@yahoo.com
   ```

   **Vercel:**
   - Adaugă aceleași variabile în Environment Variables

## Opțiunea 3: Email de la domeniu (contact@ecranul.ro) – cPanel

Dacă ai hosting cu **cPanel** și vrei să trimiți emailuri de la **contact@ecranul.ro**:

### 1. Creează adresa contact@ecranul.ro în cPanel

1. Intră în **cPanel** (de la providerul de hosting).
2. Caută secțiunea **Email** → **Email Accounts**.
3. Click pe **Create** / **Creează**.
4. La **Email**: scrie `contact` (domeniul ecranul.ro e deja ales).
5. Setează o **parolă** puternică pentru acest cont și salvează-o undeva sigur.
6. Finalizează crearea contului.

### 2. Conectează site-ul la acest email (SMTP)

Aplicația trimite emailuri prin SMTP. Trebuie să folosești exact contul **contact@ecranul.ro** și parola lui.

**Unde vezi SMTP_HOST și SMTP_PORT:**

1. În **Email Accounts**, apasă **„Connect Devices”** lângă **contact@ecranul.ro**.
2. Pe pagina care se deschide sunt setările pentru clientul de email:
   - **Outgoing Server** / **Server pentru trimitere** = **SMTP_HOST** (ex: `mail.ecranul.ro` sau `ecranul.ro`)
   - **Port** pentru SMTP = **SMTP_PORT** (de obicei **587** cu TLS sau **465** cu SSL)

**Setări tipice pentru cPanel:**

- **SMTP_HOST**: de obicei `mail.ecranul.ro` sau `ecranul.ro` (exact cum apare la „Outgoing Server” în Connect Devices).
- **SMTP_PORT**: `587` (TLS) sau `465` (SSL) – vezi în aceeași pagină ce port e indicat pentru SMTP.
- **Utilizator**: `contact@ecranul.ro`
- **Parolă**: parola pe care ai setat-o la pasul 1.

**Variabile de mediu (.env.local și Vercel):**

```bash
SMTP_HOST=mail.ecranul.ro
SMTP_PORT=587
SMTP_USER=contact@ecranul.ro
SMTP_PASS=parola_contului_contact
SMTP_FROM=contact@ecranul.ro
```

După ce le pui, **redeploy** pe Vercel ca să se aplice. De atunci, toate emailurile (confirmări comenzi, notificări) vor apărea trimise de la **contact@ecranul.ro**.

### 3. Unde primești notificările la comenzi noi

La fiecare comandă nouă, **proprietarul** primește un email la adresa **ecranul@yahoo.com** (notificare „Comandă nouă”). Această adresă e setată în cod; o poți schimba cu variabila de mediu:

```bash
OWNER_EMAIL=ecranul@yahoo.com
```

Dacă vrei notificările pe alt email, pune acolo adresa dorită (ex: `contact@ecranul.ro`).

---

## Opțiunea 4: SMTP generic (alt hosting / provider)

Dacă ai alt serviciu SMTP (nu neapărat cPanel):

1. **Obține setările SMTP de la provider**
   - De obicei: `smtp.yourdomain.com` sau `mail.yourdomain.com`
   - Port: `587` (TLS) sau `465` (SSL)

2. **Configurează variabilele:**

   ```bash
   SMTP_HOST=smtp.yourdomain.com
   SMTP_PORT=587
   SMTP_USER=contact@ecranul.ro
   SMTP_PASS=your-email-password
   SMTP_FROM=contact@ecranul.ro
   OWNER_EMAIL=ecranul@yahoo.com
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
