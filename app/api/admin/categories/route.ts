import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, description, image } = body

    if (!name || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = db.prepare(`
      INSERT INTO categories (name, slug, description, image)
      VALUES (?, ?, ?, ?)
    `).run(name, slug, description || '', image || '')

    const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid)

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error('Error creating category:', error)
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'Category with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}

