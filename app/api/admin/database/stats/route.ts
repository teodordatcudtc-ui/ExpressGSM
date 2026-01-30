import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { isSupabaseConfigured } from '@/lib/supabase'

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        categories: 0,
        products: 0,
        orders: 0,
        orderItems: 0,
      })
    }
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
