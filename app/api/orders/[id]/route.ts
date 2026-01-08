import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const order = await db.getById('orders', parseInt(params.id))
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const items = await db.getWhere('order_items', { order_id: order.id })

    return NextResponse.json({ ...order, items })
  } catch (error: any) {
    console.error('Error fetching order:', error)
    return NextResponse.json({ error: 'Failed to fetch order', details: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, payment_status } = body

    const order = await db.update('orders', parseInt(params.id), {
      status: status || 'pending',
      payment_status: payment_status || 'pending',
    })

    const items = await db.getWhere('order_items', { order_id: order.id })

    return NextResponse.json({ ...order, items })
  } catch (error: any) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order', details: error.message }, { status: 500 })
  }
}
