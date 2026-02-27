import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { isSupabaseConfigured } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const allowedTables = ['categories', 'products', 'orders', 'order_items']

export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json([], {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      })
    }
    const { searchParams } = new URL(request.url)
    const tableName = searchParams.get('name')

    if (!tableName || !allowedTables.includes(tableName)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 })
    }

    // Get all data from the table
    const data = await db.getAll(tableName, 'id DESC')

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (error: any) {
    console.error('Error fetching table data:', error)
    return NextResponse.json({ error: 'Failed to fetch table data', details: error.message }, { status: 500 })
  }
}
