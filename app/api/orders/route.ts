import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const orders = await db.getAll('orders', 'created_at DESC')
    
    // Get item counts for each order
    const ordersWithCounts = await Promise.all(
      orders.map(async (order: any) => {
        const count = await db.count('order_items', { order_id: order.id })
        return {
          ...order,
          item_count: count,
        }
      })
    )

    return NextResponse.json(ordersWithCounts)
  } catch (error: any) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders', details: error.message }, { status: 500 })
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

    // Insert order
    const order = await db.insert('orders', {
      order_number: orderNumber,
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      total_amount: parseFloat(total_amount),
    })

    // Insert order items and update stock
    for (const item of items) {
      await db.insert('order_items', {
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        price: parseFloat(item.price),
      })
      
      // Update stock
      const product = await db.getById('products', item.product_id)
      await db.update('products', item.product_id, {
        stock: (product.stock || 0) - item.quantity
      })
    }

    // Get order items
    const orderItems = await db.getWhere('order_items', { order_id: order.id })

    return NextResponse.json({ ...order, items: orderItems }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order', details: error.message }, { status: 500 })
  }
}
