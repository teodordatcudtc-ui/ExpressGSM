import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { sendOrderConfirmationEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    let orders
    if (userId) {
      // Get orders for specific user
      orders = await db.getWhere('orders', { user_id: parseInt(userId) })
      // Sort by created_at DESC
      orders = (orders as any[]).sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    } else {
      // Get all orders (for admin)
      orders = await db.getAll('orders', 'created_at DESC')
    }
    
    // Get item counts for each order
    const ordersWithCounts = await Promise.all(
      (orders as any[]).map(async (order: any) => {
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
    const { customer_name, customer_email, customer_phone, customer_address, items, total_amount, user_id, delivery_method } = body

    if (!customer_name || !customer_email || !customer_phone || !customer_address || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const method = delivery_method === 'ridicare_personala' ? 'ridicare_personala' : 'curier_rapid'

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Insert order
    const orderData: Record<string, unknown> = {
      order_number: orderNumber,
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      total_amount: parseFloat(total_amount),
      user_id: user_id ? parseInt(user_id) : null,
      delivery_method: method,
    }
    const order = (await db.insert('orders', orderData)) as any

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
      const product = (await db.getById('products', item.product_id)) as any
      await db.update('products', item.product_id, {
        stock: (product.stock || 0) - item.quantity
      })
    }

    // Get order items
    const orderItems = (await db.getWhere('order_items', { order_id: order.id })) as any[]

    // Send confirmation email (don't wait for it, send in background)
    sendOrderConfirmationEmail({
      orderNumber: order.order_number,
      customerName: customer_name,
      customerEmail: customer_email,
      customerPhone: customer_phone,
      customerAddress: customer_address,
      items: orderItems.map((item: any) => ({
        product_name: item.product_name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: parseFloat(total_amount),
      orderDate: new Date(order.created_at).toLocaleDateString('ro-RO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }).catch((error) => {
      // Log error but don't fail the order
      console.error('Failed to send confirmation email:', error)
    })

    return NextResponse.json({ ...order, items: orderItems }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order', details: error.message }, { status: 500 })
  }
}
