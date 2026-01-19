# Setup Supabase - ecranul.ro

## Pasul 1: Creează Cont Supabase

1. Mergi pe [supabase.com](https://supabase.com)
2. Creează un cont (gratuit)
3. Creează un proiect nou
4. Așteaptă ~2 minute până se creează

## Pasul 2: Obține Credențialele

1. Mergi la **Settings** → **API**
2. Copiază:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon/public key**

## Pasul 3: Configurează .env.local

Creează fișierul `.env.local` în root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Pasul 4: Rulează SQL-ul pentru Baza de Date

1. Mergi la **SQL Editor** în Supabase Dashboard
2. Click pe **"New Query"**
3. Copiază tot conținutul din `supabase-schema.sql`
4. Click **"Run"** sau apasă `Ctrl+Enter`
5. Verifică că apare mesajul "Success"

## Pasul 5: Configurează Storage pentru Imagini

1. Mergi la **Storage** în Supabase Dashboard
2. Click pe **"New bucket"**
3. Nume: **`products`**
4. **Public bucket**: DA (bifează checkbox-ul!)
5. Click **"Create bucket"**
6. Mergi la **SQL Editor** din nou
7. Rulează SQL-ul din `supabase-storage-setup.sql`

## Pasul 6: Configurează Variabilele pe Vercel

Dacă folosești Vercel:

1. Mergi la **Vercel Dashboard** → Proiectul tău → **Settings** → **Environment Variables**
2. Adaugă:
   - `NEXT_PUBLIC_SUPABASE_URL` = URL-ul tău Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Cheia ta anon
3. Click **"Save"**
4. **Redeploy** aplicația

## Pasul 7: Testează

1. Restart aplicația local: `npm run dev`
2. Verifică în consolă: ar trebui să vezi conexiunea la Supabase
3. Testează adăugarea unui produs cu imagine în admin

## Gata!

Totul ar trebui să funcționeze acum. Imagini se vor stoca în Supabase Storage și vor fi accesibile public.
