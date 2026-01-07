import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(params.id) as any
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(params.id)

    return NextResponse.json({ ...order, items })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, payment_status } = body

    db.prepare(`
      UPDATE orders 
      SET status = ?, payment_status = ?
      WHERE id = ?
    `).run(status || 'pending', payment_status || 'pending', params.id)

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(params.id) as any
    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(params.id)

    return NextResponse.json({ ...order, items })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

