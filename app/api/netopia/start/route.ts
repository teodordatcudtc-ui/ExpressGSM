import { NextResponse } from 'next/server'
import crypto from 'crypto'
import db from '@/lib/db'
import { encryptPaymentRequest, type NetopiaPaymentPayload } from '@/lib/netopia'

export const dynamic = 'force-dynamic'

function getReturnToken(orderNumber: string, signature: string): string {
  return crypto.createHmac('sha256', signature).update(orderNumber).digest('hex')
}

function getBaseUrl(request: Request): string {
  const url = new URL(request.url)
  const host = request.headers.get('x-forwarded-host') || url.host
  const proto = request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '')
  return `${proto}://${host}`
}

/**
 * POST /api/netopia/start
 * Body: { orderId: number } (our DB order id)
 * Returns encrypted form data to POST to Netopia, and formAction URL.
 */
export async function POST(request: Request) {
  try {
    const sig = process.env.NETOPIA_SIGNATURE
    const publicKey = process.env.NETOPIA_PUBLIC_KEY
    if (!sig || !publicKey) {
      return NextResponse.json(
        { error: 'Netopia not configured (NETOPIA_SIGNATURE, NETOPIA_PUBLIC_KEY)' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const orderId = body.orderId != null ? parseInt(String(body.orderId), 10) : NaN
    if (!Number.isFinite(orderId)) {
      return NextResponse.json({ error: 'Missing or invalid orderId' }, { status: 400 })
    }

    const order = (await db.getById('orders', orderId)) as any
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    if (order.payment_method !== 'card_online') {
      return NextResponse.json({ error: 'Order is not card payment' }, { status: 400 })
    }

    const baseUrl = getBaseUrl(request)
    const amount = parseFloat(order.total_amount)
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid order amount' }, { status: 400 })
    }

    const nameParts = (order.customer_name || 'Client').trim().split(/\s+/)
    const firstName = nameParts[0] || 'Client'
    const lastName = nameParts.slice(1).join(' ') || 'Client'
    const address = order.customer_address || '-'
    const email = order.customer_email || 'client@expressgsm.ro'
    const mobile = order.customer_phone || ''

    const returnToken = getReturnToken(order.order_number, sig)
    const payload: NetopiaPaymentPayload = {
      orderId: order.order_number,
      amount,
      currency: 'RON',
      details: `Comandă ${order.order_number}`,
      returnUrl: `${baseUrl}/checkout/return?order_number=${encodeURIComponent(order.order_number)}&token=${returnToken}`,
      confirmUrl: `${baseUrl}/api/netopia/confirm`,
      billing: {
        first_name: firstName,
        last_name: lastName,
        address,
        email,
        mobile_phone: mobile,
      },
    }

    const publicKeyPem = publicKey.replace(/\\n/g, '\n')
    const form = encryptPaymentRequest(publicKeyPem, payload, sig)

    const sandbox = process.env.NETOPIA_SANDBOX === 'true'
    const formAction = sandbox
      ? 'https://sandboxsecure.mobilpay.ro'
      : 'https://secure.mobilpay.ro'

    return NextResponse.json({
      formAction,
      env_key: form.env_key,
      data: form.data,
      iv: form.iv,
      cipher: form.cipher,
    })
  } catch (error: any) {
    console.error('Netopia start error:', error)
    return NextResponse.json(
      { error: 'Failed to start payment', details: error?.message },
      { status: 500 }
    )
  }
}
