import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if category is used in products
    const products = await db.getWhere('products', { category_id: parseInt(params.id) })
    
    if (products.length > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete category: it is used by products. Delete or move products first.' 
      }, { status: 400 })
    }

    // Delete the category
    await db.delete('categories', parseInt(params.id))
    
    return NextResponse.json({ success: true, message: 'Category deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category', details: error.message }, { status: 500 })
  }
}
