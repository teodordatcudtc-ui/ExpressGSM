import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { ensureAdminRequest } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const unauthorized = ensureAdminRequest(request)
    if (unauthorized) return unauthorized

    const categories = await db.getWhere('categories', { slug: 'reparatii' })
    
    if (categories.length === 0) {
      return NextResponse.json({ message: 'Reparații category not found' })
    }

    const reparatiiCategory = categories[0] as any

    // Delete products in this category
    const products = (await db.getWhere('products', { category_id: reparatiiCategory.id })) as any[]
    let deletedProducts = 0
    
    for (const product of products) {
      await db.delete('products', product.id)
      deletedProducts++
    }
    
    // Delete the category
    await db.delete('categories', reparatiiCategory.id)

    return NextResponse.json({ 
      message: 'Reparații category removed',
      deletedProducts
    })
  } catch (error: any) {
    console.error('Error removing Reparații category:', error)
    return NextResponse.json({ error: 'Failed to remove category', details: error.message }, { status: 500 })
  }
}
