import { NextResponse } from 'next/server'
import db from '@/lib/db'

// This endpoint removes the Reparații category and all its products
export async function POST() {
  try {
    const reparatiiCategory = db.prepare('SELECT id FROM categories WHERE slug = ?').get('reparatii') as { id: number } | undefined
    
    if (!reparatiiCategory) {
      return NextResponse.json({ message: 'Reparații category not found' })
    }

    // Delete products in this category
    const deletedProducts = db.prepare('DELETE FROM products WHERE category_id = ?').run(reparatiiCategory.id)
    
    // Delete the category
    db.prepare('DELETE FROM categories WHERE id = ?').run(reparatiiCategory.id)

    return NextResponse.json({ 
      message: 'Reparații category removed',
      deletedProducts: deletedProducts.changes 
    })
  } catch (error) {
    console.error('Error removing Reparații category:', error)
    return NextResponse.json({ error: 'Failed to remove category' }, { status: 500 })
  }
}

