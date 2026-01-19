import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const categories = await db.count('categories')
    const products = await db.count('products')
    const orders = await db.count('orders')
    const orderItems = await db.count('order_items')

    return NextResponse.json({
      categories,
      products,
      orders,
      orderItems,
    })
  } catch (error: any) {
    console.error('Error fetching database stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats', details: error.message }, { status: 500 })
  }
}
