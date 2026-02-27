import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    // Get all categories with parent info
    const categories = await db.getAll('categories', 'name ASC')
    
    // Add parent info manually
    const categoriesWithParent = (categories as any[]).map((cat: any) => {
      const parent = (categories as any[]).find((p: any) => p.id === cat.parent_id)
      return {
        ...cat,
        parent_name: parent?.name || null,
        parent_slug: parent?.slug || null,
      }
    })
    
    // Sort: parent categories first
    categoriesWithParent.sort((a: any, b: any) => {
      if (a.parent_id === null && b.parent_id !== null) return -1
      if (a.parent_id !== null && b.parent_id === null) return 1
      return a.name.localeCompare(b.name)
    })
    
    return NextResponse.json(categoriesWithParent, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (error: any) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories', details: error.message }, { status: 500 })
  }
}
