/**
 * Netopia Payments (Mobilpay) - encrypt payment request & decrypt IPN
 * Compatible with https://secure.mobilpay.ro and sandbox.
 */
import crypto from 'crypto'
import forge from 'node-forge'
import { parseStringPromise } from 'xml2js'

const ALGORITHM = 'aes-256-cbc'

export interface NetopiaPaymentPayload {
  orderId: string
  amount: number
  currency: string
  details: string
  returnUrl: string
  confirmUrl: string
  billing: {
    first_name: string
    last_name: string
    address: string
    email: string
    mobile_phone: string
  }
  shipping?: {
    first_name: string
    last_name: string
    address: string
    email: string
    mobile_phone: string
  }
}

function buildPaymentXml(payload: NetopiaPaymentPayload, signature: string): string {
  const date = new Date()
  const orderAttrs = `id="${escapeXml(payload.orderId)}" timestamp="${date.getTime()}" type="card"`
  const invoiceAttrs = `currency="${escapeXml(payload.currency)}" amount="${payload.amount}"`
  const billing = payload.billing
  const shipping = payload.shipping || payload.billing

  return `<?xml version="1.0" encoding="utf-8"?>
<order ${orderAttrs}>
  <signature>${escapeXml(signature)}</signature>
  <url>
    <return>${escapeXml(payload.returnUrl)}</return>
    <confirm>${escapeXml(payload.confirmUrl)}</confirm>
  </url>
  <invoice ${invoiceAttrs}>
    <details>${escapeXml(payload.details)}</details>
    <contact_info>
      <billing type="person">
        <first_name>${escapeXml(billing.first_name)}</first_name>
        <last_name>${escapeXml(billing.last_name)}</last_name>
        <address>${escapeXml(billing.address)}</address>
        <email>${escapeXml(billing.email)}</email>
        <mobile_phone>${escapeXml(billing.mobile_phone)}</mobile_phone>
      </billing>
      <shipping type="person">
        <first_name>${escapeXml(shipping.first_name)}</first_name>
        <last_name>${escapeXml(shipping.last_name)}</last_name>
        <address>${escapeXml(shipping.address)}</address>
        <email>${escapeXml(shipping.email)}</email>
        <mobile_phone>${escapeXml(shipping.mobile_phone)}</mobile_phone>
      </shipping>
    </contact_info>
  </invoice>
  <ipn_cipher>${ALGORITHM}</ipn_cipher>
</order>`
}

function escapeXml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Encrypt payment request for Netopia (same logic as official Node sample).
 * Returns form fields to POST to secure.mobilpay.ro or sandbox.
 */
export function encryptPaymentRequest(
  publicKeyPem: string,
  payload: NetopiaPaymentPayload,
  signature: string
): { env_key: string; data: string; iv: string; cipher: string } {
  const key = crypto.randomBytes(32)
  const iv = crypto.randomBytes(16)
  const xml = buildPaymentXml(payload, signature)

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  let encrypted = cipher.update(xml, 'utf8', 'base64')
  encrypted += cipher.final('base64')

  const publicKey = crypto.createPublicKey({
    key: publicKeyPem,
    format: 'pem',
  })
  const envKey = crypto.publicEncrypt(
    { key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    key
  )

  return {
    iv: iv.toString('base64'),
    env_key: envKey.toString('base64'),
    data: encrypted,
    cipher: ALGORITHM,
  }
}

/**
 * Decrypt IPN body from Netopia (env_key, data, iv, cipher).
 * Uses node-forge for RSA private decrypt like the official sample.
 */
export function decryptIpn(
  privateKeyPem: string,
  iv: string,
  envKey: string,
  data: string,
  cipher: string
): string {
  const keyBuffer = Buffer.from(envKey, 'base64')
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem)
  const symmetricKey = Buffer.from(
    privateKey.decrypt(keyBuffer.toString('binary'), 'RSAES-PKCS1-V1_5'),
    'binary'
  )
  const decipher = crypto.createDecipheriv(
    cipher,
    symmetricKey,
    Buffer.from(iv, 'base64')
  )
  let dec = decipher.update(data, 'base64', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

export interface IpnParsed {
  orderId: string
  action: string
  errorCode: number
  errorMessage?: string
}

/**
 * Parse decrypted IPN XML and extract order id, action, error code.
 * Netopia sends e.g. <order id="..."> with <notification><action>confirmed</action><error_code>0</error_code></notification>
 */
export async function parseIpnXml(decryptedXml: string): Promise<IpnParsed> {
  const result = await parseStringPromise(decryptedXml, {
    explicitArray: false,
    ignoreAttrs: false,
  })

  const root = result?.order || result?.payment || result?.mobilpay || result
  const rootObj = typeof root === 'object' && root !== null ? root : {}
  const attrs = (rootObj as any)?.$ || {}
  let orderId = attrs.id || (rootObj as any)?.id
  if (typeof orderId === 'object') orderId = orderId?._ ?? orderId
  orderId = String(orderId ?? '').trim()

  const notify = (rootObj as any)?.notification || (rootObj as any)?.notify || rootObj
  let action = (notify?.action?._ ?? notify?.action ?? '').toString().toLowerCase()
  let errorCode = parseInt(
    (notify?.error_code?._ ?? notify?.error_code ?? '1').toString(),
    10
  )
  const errorMessage =
    (notify?.error_message?._ ?? notify?.error_message ?? '').toString()

  if (!orderId && decryptedXml.includes('id=')) {
    const idMatch = decryptedXml.match(/<order[^>]+id=["']([^"']+)["']/i) ||
      decryptedXml.match(/id=["']([^"']+)["']/i)
    if (idMatch) orderId = idMatch[1].trim()
  }
  if (!orderId && /ORD-/.test(decryptedXml)) {
    const ordMatch = decryptedXml.match(/(ORD-\d+-[A-Z0-9]+)/i)
    if (ordMatch) orderId = ordMatch[1].trim()
  }
  if (!action && decryptedXml.includes('action')) {
    const actionMatch = decryptedXml.match(/<action[^>]*>([^<]+)</i)
    if (actionMatch) action = actionMatch[1].trim().toLowerCase()
  }

  return {
    orderId,
    action,
    errorCode: isNaN(errorCode) ? 1 : errorCode,
    errorMessage,
  }
}

/**
 * Build merchant response XML for IPN confirm (Netopia expects this).
 */
export function buildConfirmResponseXml(errorCode: number, message: string): string {
  const errAttr =
    errorCode !== 0
      ? ` error_type="2" error_code="${escapeXml(String(errorCode))}"`
      : ''
  return `<?xml version="1.0" encoding="utf-8"?><crc${errAttr}>${escapeXml(message)}</crc>`
}
