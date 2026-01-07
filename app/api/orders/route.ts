import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const orders = db.prepare(`
      SELECT o.*, 
        COUNT(oi.id) as item_count
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `).all()

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customer_name, customer_email, customer_phone, customer_address, items, total_amount } = body

    if (!customer_name || !customer_email || !customer_phone || !customer_address || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    const insertOrder = db.transaction(() => {
      // Insert order
      const orderResult = db.prepare(`
        INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, customer_address, total_amount)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(orderNumber, customer_name, customer_email, customer_phone, customer_address, total_amount)

      const orderId = orderResult.lastInsertRowid

      // Insert order items
      const insertItem = db.prepare(`
        INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
        VALUES (?, ?, ?, ?, ?)
      `)

      for (const item of items) {
        insertItem.run(orderId, item.product_id, item.product_name, item.quantity, item.price)
        
        // Update stock
        db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(item.quantity, item.product_id)
      }

      return orderId
    })

    const orderId = insertOrder()

    // Fetch complete order
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId) as any
    const orderItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(orderId)

    return NextResponse.json({ ...order, items: orderItems }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

