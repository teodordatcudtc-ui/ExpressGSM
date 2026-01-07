import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

const allowedTables = ['categories', 'products', 'orders', 'order_items']

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tableName = searchParams.get('name')

    if (!tableName || !allowedTables.includes(tableName)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 })
    }

    // Get all data from the table
    const data = db.prepare(`SELECT * FROM ${tableName} ORDER BY id DESC`).all()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching table data:', error)
    return NextResponse.json({ error: 'Failed to fetch table data' }, { status: 500 })
  }
}

