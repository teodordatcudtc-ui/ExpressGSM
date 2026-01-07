import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const categoriesCount = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number }
    const productsCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number }
    const ordersCount = db.prepare('SELECT COUNT(*) as count FROM orders').get() as { count: number }
    const orderItemsCount = db.prepare('SELECT COUNT(*) as count FROM order_items').get() as { count: number }

    return NextResponse.json({
      categories: categoriesCount.count,
      products: productsCount.count,
      orders: ordersCount.count,
      orderItems: orderItemsCount.count,
    })
  } catch (error) {
    console.error('Error fetching database stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}

