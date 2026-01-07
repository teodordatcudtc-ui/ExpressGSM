import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const slug = searchParams.get('slug')
    const active = searchParams.get('active') !== 'false'

    let query = 'SELECT p.*, c.name as category_name, c.slug as category_slug FROM products p JOIN categories c ON p.category_id = c.id WHERE 1=1'
    const params: any[] = []

    if (slug) {
      query += ' AND p.slug = ?'
      params.push(slug)
    } else if (categoryId) {
      query += ' AND p.category_id = ?'
      params.push(categoryId)
    }

    if (active) {
      query += ' AND p.active = 1'
    }

    query += ' ORDER BY p.created_at DESC'

    const products = db.prepare(query).all(...params)
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, description, price, image, category_id, stock } = body

    if (!name || !slug || !price || !category_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = db.prepare(`
      INSERT INTO products (name, slug, description, price, image, category_id, stock)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(name, slug, description || '', price, image || '', category_id, stock || 0)

    const product = db.prepare('SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ?').get(result.lastInsertRowid)

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error('Error creating product:', error)
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

