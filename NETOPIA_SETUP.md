# Configurare Netopia Payments (plată cu cardul)

## Variabile de mediu

Adaugă în `.env.local` (sau în setările de pe Vercel/hosting):

```env
# Semnătura din contul Netopia (Setări tehnice)
NETOPIA_SIGNATURE=XXXX-XXXX-XXXX-XXXX-XXXX

# Cheie publică (conținutul fișierului descărcat; poți pune newline-uri reale sau \n)
NETOPIA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----"

# Cheie privată (confidențială; la fel, newline-uri reale sau \n)
NETOPIA_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----"

# Opțional: true pentru SANDBOX (test), lipsă sau false pentru producție
NETOPIA_SANDBOX=true
```

- **Semnătura** o copiezi din Setări tehnice din contul Netopia.
- **Cheia publică** și **cheia privată** le descarci din același ecran (butoanele DESCARCĂ). Pentru mediul de **test** folosești cheile din SANDBOX, nu cele de producție.

## Flux

1. Clientul alege „Plată cu cardul online” la checkout și plasează comanda.
2. Se creează comanda în baza de date cu `payment_method: card_online` și `payment_status: pending`.
3. Utilizatorul este redirecționat la pagina Netopia pentru plată.
4. După plată, Netopia trimite un IPN (POST) către `/api/netopia/confirm`. La **action = confirmed** și **error_code = 0** comanda este actualizată cu `payment_status: platita`.
5. Utilizatorul este redirecționat la `/checkout/return?order_number=...` și apoi la pagina de confirmare a comenzii.

## URL-uri importante

- **Return URL** (redirect utilizator după plată): `https://domeniul-tau.ro/checkout/return?order_number=...` (generat automat).
- **Confirm URL** (IPN): `https://domeniul-tau.ro/api/netopia/confirm`. Trebuie accesibil din internet (Netopia face POST aici).

## Admin

În panoul admin, comenzile plătite cu cardul și confirmate de Netopia au **Status plată: platita** (badge verde).
