# Suspendare Site

## Cum activezi suspendarea (Site Suspendat)

1. Adaugă în `.env.local`:
   ```
   SITE_SUSPENDED=true
   ```
2. Pe Vercel/hosting: **Settings** → **Environment Variables** → adaugă `SITE_SUSPENDED` = `true`
3. Redeploy aplicația

## Cum scoți suspendarea

1. Șterge variabila `SITE_SUSPENDED` din `.env.local`  
   SAU schimbă în: `SITE_SUSPENDED=false`
2. Pe Vercel: șterge variabila sau setează la `false`
3. Redeploy

**Atât.** Nu e nevoie să modifici codul.
