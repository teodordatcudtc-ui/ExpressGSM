// Email Service - SMTP with Nodemailer
import nodemailer from 'nodemailer'

/** Email unde primești notificări la comenzi noi (proprietar) */
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'ecranul@yahoo.com'

/** Adresa de la care se trimit emailurile afacerii (domeniu) */
const BUSINESS_FROM = process.env.SMTP_FROM || 'ecranul@yahoo.com'

export interface OrderEmailData {
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  items: Array<{
    product_name: string
    quantity: number
    price: number
  }>
  totalAmount: number
  orderDate: string
  /** Metodă livrare: ridicare_personala | curier_rapid */
  deliveryMethod?: string
  /** Metodă plată: ramburs | card_online */
  paymentMethod?: string
  /** Status plată: pending | platita | paid */
  paymentStatus?: string
}

function deliveryMethodLabel(value?: string): string {
  if (value === 'ridicare_personala') return 'Ridicare personală din depozit (Pajurei 7, București – gratuit)'
  if (value === 'curier_rapid') return 'Curier rapid – Livrare la adresă (25,00 lei)'
  if (value === 'curier_verificare') return 'Curier cu verificare colet (45,00 lei)'
  return value || '—'
}
function paymentMethodLabel(value?: string): string {
  if (value === 'ramburs') return 'La ramburs'
  if (value === 'card_online') return 'Plată cu cardul online'
  return value || '—'
}
function paymentStatusLabel(value?: string): string {
  if (value === 'platita' || value === 'paid') return 'Plătit'
  if (value === 'pending') return 'În așteptare'
  return value ? String(value) : '—'
}

// Create SMTP transporter (Gmail: parola de aplicație fără spații; pe Vercel trebuie await la send înainte de răspuns)
function createTransporter() {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, '')

  if (!host || !user || !pass) {
    console.warn('[email] SMTP incomplet (lipsește HOST / USER / PASS):', {
      SMTP_HOST: Boolean(host),
      SMTP_USER: Boolean(user),
      SMTP_PASS: Boolean(pass),
    })
    return null
  }

  const auth = { user, pass }
  const connectionTimeout = 25_000

  if (host === 'smtp.gmail.com') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth,
      connectionTimeout,
    })
  }

  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth,
    connectionTimeout,
    ...(port === 587 ? { requireTLS: true } : {}),
  })
}

function logSmtpError(context: string, error: unknown): void {
  const e = error as { message?: string; response?: string; responseCode?: number; command?: string }
  console.error(`[email] ${context}:`, e?.message || error)
  if (e?.responseCode != null || e?.response) {
    console.error('[email] SMTP response:', e.responseCode, e.response?.slice?.(0, 500))
  }
}

// Generate HTML email template (forOwner = true includează "Status plată")
function generateOrderEmailHTML(data: OrderEmailData, options?: { forOwner?: boolean }): string {
  const forOwner = options?.forOwner === true
  const itemsHTML = data.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.product_name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${(item.price * item.quantity).toFixed(2)} RON</td>
    </tr>
  `).join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmare Comandă - ecranul.ro</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">ecranul.ro</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Confirmare Comandă</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Bună ziua, <strong>${data.customerName}</strong>!
              </p>
              
              <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Mulțumim pentru comanda ta! Am primit comanda cu numărul <strong style="color: #667eea;">${data.orderNumber}</strong> și o vom procesa în cel mai scurt timp.
              </p>
              
              <!-- Order Details -->
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 20px 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                  Detalii Comandă
                </h2>
                
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Număr comandă:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: bold; text-align: right;">${data.orderNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Data:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right;">${data.orderDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Telefon:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right;">${data.customerPhone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Adresă:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right;">${data.customerAddress}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Metodă livrare:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right;">${deliveryMethodLabel(data.deliveryMethod)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Metodă plată:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right;">${paymentMethodLabel(data.paymentMethod)}</td>
                  </tr>
                  ${forOwner ? `<tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Status plată:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 600; text-align: right;">${paymentStatusLabel(data.paymentStatus)}</td>
                  </tr>` : ''}
                </table>
              </div>
              
              <!-- Order Items -->
              <h3 style="color: #1f2937; font-size: 18px; margin: 30px 0 15px 0;">Produse comandate:</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; font-size: 14px; font-weight: 600; color: #1f2937; border-bottom: 2px solid #e5e7eb;">Produs</th>
                    <th style="padding: 12px; text-align: center; font-size: 14px; font-weight: 600; color: #1f2937; border-bottom: 2px solid #e5e7eb;">Cantitate</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px; font-weight: 600; color: #1f2937; border-bottom: 2px solid #e5e7eb;">Preț</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding: 15px 12px; text-align: right; font-size: 16px; font-weight: 600; color: #1f2937; border-top: 2px solid #e5e7eb;">
                      Total:
                    </td>
                    <td style="padding: 15px 12px; text-align: right; font-size: 18px; font-weight: bold; color: #667eea; border-top: 2px solid #e5e7eb;">
                      ${data.totalAmount.toFixed(2)} RON
                    </td>
                  </tr>
                </tfoot>
              </table>
              
              <!-- Footer Message -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0; border-radius: 4px;">
                <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.6;">
                  ${(data.paymentStatus === 'platita' || data.paymentStatus === 'paid')
    ? '<strong>Plata a fost confirmată.</strong> Vei fi contactat în curând pentru detalii despre livrare.'
    : data.paymentMethod === 'card_online'
      ? 'Plata cu cardul va fi confirmată după finalizarea tranzacției. Vei fi contactat în curând pentru detalii despre livrare.'
      : '<strong>Notă:</strong> Plata se va efectua la livrare (ramburs). Vei fi contactat în curând pentru confirmarea comenzii și detalii despre livrare.'}
                </p>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                Dacă ai întrebări despre comanda ta, te rugăm să ne contactezi la <a href="mailto:ecranul@yahoo.com" style="color: #667eea; text-decoration: none;">ecranul@yahoo.com</a> sau telefonic.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
                <strong>ecranul.ro</strong><br>
                București, Strada Pajurei 7
              </p>
              <p style="color: #9ca3af; font-size: 11px; margin: 0;">
                Acest email a fost trimis automat. Te rugăm să nu răspunzi la acest email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

// Trimite notificare către proprietar (ecranul@yahoo.com) când vine o comandă nouă
export async function sendOrderNotificationToOwner(data: OrderEmailData): Promise<void> {
  const transporter = createTransporter()
  if (!transporter) {
    console.log('📧 Notificare owner would be sent (SMTP not configured):', { to: OWNER_EMAIL, orderNumber: data.orderNumber })
    return
  }
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || BUSINESS_FROM
  try {
    await transporter.sendMail({
      from: `"ecranul.ro" <${fromEmail}>`,
      to: OWNER_EMAIL,
      subject: `🛒 Comandă nouă ${data.orderNumber} - ecranul.ro`,
      html: generateOrderEmailHTML(data, { forOwner: true }),
      text: `
Comandă nouă - ecranul.ro

Număr: ${data.orderNumber}
Client: ${data.customerName}
Email: ${data.customerEmail || '—'}
Telefon: ${data.customerPhone}
Adresă: ${data.customerAddress}
Metodă livrare: ${deliveryMethodLabel(data.deliveryMethod)}
Metodă plată: ${paymentMethodLabel(data.paymentMethod)}
Status plată: ${paymentStatusLabel(data.paymentStatus)}

Produse:
${data.items.map(item => `- ${item.product_name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} RON`).join('\n')}

Total: ${data.totalAmount.toFixed(2)} RON
Data: ${data.orderDate}
      `.trim(),
    })
    console.log(`✅ Notificare comandă trimisă către ${OWNER_EMAIL}`)
  } catch (error: any) {
    logSmtpError('Eroare trimitere notificare owner', error)
    throw error
  }
}

/** Notificare proprietar: plată card confirmată (Netopia IPN). Nu se trimite email către client. */
export async function sendPaymentConfirmedEmails(params: {
  orderNumber: string
  customerName: string
  customerEmail?: string | null
}): Promise<void> {
  const transporter = createTransporter()
  if (!transporter) {
    console.log('Payment confirmed notification skipped (SMTP not configured)')
    return
  }
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || BUSINESS_FROM
  const emailLine = params.customerEmail?.trim()
    ? `Email client: ${params.customerEmail.trim()}`
    : 'Email client: —'
  const text = [
    '[Proprietar] Plată confirmată (card online)',
    `Comandă: ${params.orderNumber}`,
    `Client: ${params.customerName}`,
    emailLine,
  ].join('\n')
  const html = `<div style="font-family: sans-serif;">
    <p><strong>Plată confirmată</strong> (plată cu cardul)</p>
    <p>Comandă: <strong>${params.orderNumber}</strong></p>
    <p>Client: ${params.customerName}</p>
    <p>${emailLine}</p>
    <p>— ecranul.ro</p>
  </div>`
  try {
    await transporter.sendMail({
      from: `"ecranul.ro" <${fromEmail}>`,
      to: OWNER_EMAIL,
      subject: `Plată confirmată – Comandă ${params.orderNumber}`,
      text,
      html,
    })
    console.log(`Payment confirmed notification sent to owner (${OWNER_EMAIL})`)
  } catch (error: any) {
    logSmtpError('sendPaymentConfirmedEmails', error)
    throw error
  }
}
