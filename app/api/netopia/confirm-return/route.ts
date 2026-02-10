import { NextResponse } from 'next/server'
import crypto from 'crypto'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

/**
 * POST /api/netopia/confirm-return
 * Body: { order_number: string, token: string }
 * Token = HMAC-SHA256(NETOPIA_SIGNATURE, order_number) - generat la start.
 * Marchează comanda ca plătită dacă token-ul e valid (confirmare la redirect de la Netopia).
 */
export async function POST(request: Request) {
  const sig = process.env.NETOPIA_SIGNATURE
  if (!sig) {
    return NextResponse.json({ error: 'Netopia not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const orderNumber = body?.order_number?.trim()
    const token = body?.token?.trim()

    if (!orderNumber || !token) {
      return NextResponse.json({ error: 'Lipsesc order_number sau token' }, { status: 400 })
    }

    const expectedToken = crypto.createHmac('sha256', sig).update(orderNumber).digest('hex')
    if (token !== expectedToken) {
      return NextResponse.json({ error: 'Token invalid' }, { status: 403 })
    }

    const orders = (await db.getWhere('orders', { order_number: orderNumber })) as any[]
    const order = orders?.[0]
    if (!order) {
      return NextResponse.json({ error: 'Comandă negăsită' }, { status: 404 })
    }

    if (order.payment_method !== 'card_online') {
      return NextResponse.json({ ok: true, message: 'Comanda nu este plată card' })
    }

    if (order.payment_status === 'platita' || order.payment_status === 'paid') {
      return NextResponse.json({ ok: true, message: 'Deja marcată ca plătită' })
    }

    await db.update('orders', order.id, { payment_status: 'platita' })

    try {
      const { sendPaymentConfirmedEmails } = await import('@/lib/email')
      sendPaymentConfirmedEmails({
        orderNumber: order.order_number,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
      }).catch(() => {})
    } catch (_) {}

    return NextResponse.json({ ok: true, message: 'Plată confirmată' })
  } catch (error: any) {
    console.error('Netopia confirm-return error:', error)
    return NextResponse.json({ error: error?.message || 'Eroare' }, { status: 500 })
  }
}
