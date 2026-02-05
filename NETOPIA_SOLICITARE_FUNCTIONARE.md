# Netopia – Solicitare de funcționare (formular testare)

## 1. Dezvoltare – ce ai făcut deja
- **Modul test**: este activ (redirect la `https://sandboxsecure.mobilpay.ro/`).
- **Cele patru chei**: sunt încărcate (Signature, Public Key, Private Key; sandbox).

## 2. Cum completezi formularul de testare

### URL de testare * (obligatoriu)
- Dacă site-ul este deja live: **https://www.ecranul.ro** (sau domeniul tău exact).
- Dacă testezi pe alt domeniu (ex. Vercel): pune URL-ul complet al site-ului unde ai făcut implementarea, ex. `https://express-gsm-xxx.vercel.app`.

### Check-out ca vizitator
- **Da** – site-ul permite finalizarea comenzii **fără cont** (checkout ca vizitator).
- Nu este nevoie de utilizator/parolă pentru testare: testerul poate merge la Magazin → Adaugă în coș → Checkout și completa doar datele din formular (nume, email, telefon, adresă), fără să se înregistreze.

### Nume utilizator cont client / Parolă cont client
- Poți **lăsa goale** dacă ai bifat/selectat că există check-out ca vizitator.
- Dacă formularul cere obligatoriu un cont: poți crea un cont de test (ex. `test@ecranul.ro` / o parolă de test) și îl pui aici doar pentru ei.

### Comentarii / Detalii suplimentare
Poți scrie ceva de genul:

```
Implementare Next.js. Modul sandbox activ, chei încărcate.
Check-out ca vizitator: da – comanda se poate finaliza fără cont (formular cu nume, email, telefon, adresă).
URL return după plată: https://www.ecranul.ro/checkout/return
URL confirm (IPN): https://www.ecranul.ro/api/netopia/confirm
```

---

## 3. Pași pentru tester (Netopia)

1. Acces **URL de testare** (ex. https://www.ecranul.ro).
2. Mergi la **Magazin**, adaugă un produs în coș.
3. Click **Finalizare comandă** / Checkout.
4. Completează formularul (nume, email, telefon, adresă) **fără** să se înregistreze.
5. Alege metoda de livrare și **Plată cu cardul (Netopia)**.
6. Urmează redirect la sandbox Netopia; folosește datele de card de test furnizate de Netopia.
7. După plată, revine pe site la pagina de confirmare.

---

## 4. După aprobare

Când treci în producție:
- Înlocuiești cheile de sandbox cu cele de **live** în mediul de deploy (ex. Vercel).
- Setezi `NETOPIA_SANDBOX=false`.
- Asigură-te că URL-ul de confirm (IPN) este accesibil public (HTTPS).
