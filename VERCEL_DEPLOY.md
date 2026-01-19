# Deploy pe Vercel - Probleme și Soluții

## Problema

SQLite nu funcționează corect pe Vercel din cauza limitărilor serverless:
- Sistemul de fișiere este read-only (exceptând `/tmp`)
- Funcțiile serverless sunt stateless
- Baza de date nu persistă între invocări

## Soluții

### Opțiunea 1: Folosirea `/tmp` (Temporară - Nu Recomandată)

Am creat `lib/db-vercel.ts` care folosește `/tmp` pe Vercel. **PROBLEMA**: Datele se pierd la fiecare redeploy sau restart.

**Pentru a folosi această opțiune:**
1. Schimbă importurile din `lib/db.ts` în `lib/db-vercel.ts` în toate fișierele API

### Opțiunea 2: Vercel Postgres (Recomandată)

Vercel Postgres este integrat nativ cu Vercel și funcționează perfect pentru aplicații serverless.

**Pași:**
1. În dashboard-ul Vercel, mergi la proiectul tău
2. Click pe "Storage" → "Create Database" → "Postgres"
3. Instalează `@vercel/postgres`: `npm install @vercel/postgres`
4. Folosește SQL-ul compatibil cu PostgreSQL

### Opțiunea 3: Turso (SQLite Serverless)

Turso oferă SQLite ca serviciu serverless, perfect compatibil cu Vercel.

**Pași:**
1. Creează cont pe [turso.tech](https://turso.tech)
2. Creează o bază de date
3. Instalează `@libsql/client`: `npm install @libsql/client`
4. Configurează conexiunea cu Turso

### Opțiunea 4: Railway sau Render (Alternativă la Vercel)

Aceste platforme suportă SQLite nativ:
- **Railway**: `railway.app` - Suportă SQLite complet
- **Render**: `render.com` - Suportă SQLite cu persistență

## Recomandare

Pentru un proiect de producție, recomand **Vercel Postgres** sau **Turso** pentru că:
- Sunt integrate perfect cu Vercel
- Datele persistă permanent
- Performanță excelentă
- Gratuit pentru proiecte mici

## Notă Importantă

Dacă vrei să rămâi cu SQLite local, consideră să folosești **Railway** sau **Render** în loc de Vercel pentru hosting.

