import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, description, image, parent_id } = body

    if (!name || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const category = await db.insert('categories', {
      name,
      slug,
      description: description || null,
      image: image || null,
      parent_id: parent_id ? parseInt(parent_id) : null,
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error('Error creating category:', error)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Category with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create category', details: error.message }, { status: 500 })
  }
}
