import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, description, image, parent_id } = body

    if (!name || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const basePayload = {
      name,
      slug,
      description: description || null,
      image: image || null,
      parent_id: parent_id ? parseInt(parent_id) : null,
    }

    let category: unknown
    try {
      // Some schemas/policies expose only active categories; ensure new rows are visible.
      category = await db.insert('categories', {
        ...basePayload,
        active: 1,
      })
    } catch (insertError: any) {
      // Backward-compatible fallback for schemas without `active` on categories.
      const isMissingActiveColumn =
        insertError?.code === '42703' ||
        String(insertError?.message || '').toLowerCase().includes('column') &&
          String(insertError?.message || '').toLowerCase().includes('active')

      if (!isMissingActiveColumn) throw insertError
      category = await db.insert('categories', basePayload)
    }

    // Invalidate cached pages that render categories client/server-side.
    revalidatePath('/')
    revalidatePath('/shop')
    revalidatePath('/admin')
    revalidatePath('/admin/database')

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error('Error creating category:', error)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Category with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create category', details: error.message }, { status: 500 })
  }
}
