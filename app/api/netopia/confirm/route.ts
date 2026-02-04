import { NextResponse } from 'next/server'
import db from '@/lib/db'
import {
  decryptIpn,
  parseIpnXml,
  buildConfirmResponseXml,
} from '@/lib/netopia'

export const dynamic = 'force-dynamic'

/**
 * POST /api/netopia/confirm
 * IPN (Instant Payment Notification) from Netopia.
 * Body: env_key, data, iv, cipher (form POST).
 * On success (action=confirmed, errorCode=0): set order payment_status to 'platita'.
 * Response: XML <crc>...</crc> as required by Netopia.
 */
export async function POST(request: Request) {
  const privateKey = process.env.NETOPIA_PRIVATE_KEY
  if (!privateKey) {
    return new NextResponse(
      buildConfirmResponseXml(1, 'Netopia private key not configured'),
      { status: 500, headers: { 'Content-Type': 'application/xml' } }
    )
  }

  try {
    let envKey: string | undefined
    let data: string | undefined
    let iv: string | undefined
    let cipher: string | undefined

    const contentType = request.headers.get('content-type') || ''
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text()
      const params = new URLSearchParams(text)
      envKey = params.get('env_key') ?? params.get('envKey') ?? undefined
      data = params.get('data') ?? undefined
      iv = params.get('iv') ?? undefined
      cipher = params.get('cipher') ?? undefined
    } else {
      const formData = await request.formData()
      envKey = formData.get('env_key')?.toString() ?? formData.get('envKey')?.toString()
      data = formData.get('data')?.toString()
      iv = formData.get('iv')?.toString()
      cipher = formData.get('cipher')?.toString() ?? undefined
    }
    cipher = cipher || 'aes-256-cbc'

    if (!envKey || !data || !iv) {
      return new NextResponse(
        buildConfirmResponseXml(2, 'Missing env_key, data or iv'),
        { status: 400, headers: { 'Content-Type': 'application/xml' } }
      )
    }

    const privateKeyPem = privateKey.replace(/\\n/g, '\n')
    const decrypted = decryptIpn(privateKeyPem, iv, envKey, data, cipher)
    const ipn = await parseIpnXml(decrypted)

    const orderNumber = ipn.orderId
    if (!orderNumber) {
      return new NextResponse(
        buildConfirmResponseXml(3, 'Missing order id in IPN'),
        { status: 400, headers: { 'Content-Type': 'application/xml' } }
      )
    }

    const orders = (await db.getWhere('orders', { order_number: orderNumber })) as any[]
    const order = orders?.[0]
    if (!order) {
      return new NextResponse(
        buildConfirmResponseXml(4, `Order not found: ${orderNumber}`),
        { status: 404, headers: { 'Content-Type': 'application/xml' } }
      )
    }

    if (ipn.errorCode !== 0) {
      return new NextResponse(
        buildConfirmResponseXml(0, `Payment not approved: ${ipn.errorMessage || ipn.errorCode}`),
        { status: 200, headers: { 'Content-Type': 'application/xml' } }
      )
    }

    const isConfirmed =
      ipn.action === 'confirmed' || ipn.action === 'confirmat'
    if (isConfirmed) {
      await db.update('orders', order.id, { payment_status: 'platita' })
      const { sendPaymentConfirmedEmails } = await import('@/lib/email')
      sendPaymentConfirmedEmails({
        orderNumber: order.order_number,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
      }).catch((err) => console.error('Payment confirmed email error:', err))
      return new NextResponse(
        buildConfirmResponseXml(0, 'OK'),
        { status: 200, headers: { 'Content-Type': 'application/xml' } }
      )
    }

    if (['canceled', 'credit'].includes(ipn.action)) {
      return new NextResponse(
        buildConfirmResponseXml(0, `Action: ${ipn.action}`),
        { status: 200, headers: { 'Content-Type': 'application/xml' } }
      )
    }

    return new NextResponse(
      buildConfirmResponseXml(0, `Action recorded: ${ipn.action}`),
      { status: 200, headers: { 'Content-Type': 'application/xml' } }
    )
  } catch (error: any) {
    console.error('Netopia IPN confirm error:', error)
    return new NextResponse(
      buildConfirmResponseXml(5, error?.message || 'Decryption or parse error'),
      { status: 500, headers: { 'Content-Type': 'application/xml' } }
    )
  }
}
