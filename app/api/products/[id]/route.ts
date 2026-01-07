import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = db.prepare(`
      SELECT p.*, c.name as category_name, c.slug as category_slug 
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ?
    `).get(params.id)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, slug, description, price, image, category_id, stock, active } = body

    db.prepare(`
      UPDATE products 
      SET name = ?, slug = ?, description = ?, price = ?, image = ?, category_id = ?, stock = ?, active = ?
      WHERE id = ?
    `).run(name, slug, description, price, image, category_id, stock, active ? 1 : 0, params.id)

    const product = db.prepare('SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ?').get(params.id)

    return NextResponse.json(product)
  } catch (error: any) {
    console.error('Error updating product:', error)
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if product is used in any orders
    const orderItemsCount = db.prepare('SELECT COUNT(*) as count FROM order_items WHERE product_id = ?').get(params.id) as { count: number }
    
    if (orderItemsCount.count > 0) {
      // If product is used in orders, deactivate it instead of deleting
      // This preserves order history
      db.prepare('UPDATE products SET active = 0 WHERE id = ?').run(params.id)
      return NextResponse.json({ 
        success: true, 
        message: 'Product deactivated (used in orders)',
        deactivated: true 
      })
    } else {
      // If not used in orders, delete it completely
      db.prepare('DELETE FROM products WHERE id = ?').run(params.id)
      return NextResponse.json({ 
        success: true,
        message: 'Product deleted',
        deactivated: false 
      })
    }
  } catch (error: any) {
    console.error('Error deleting product:', error)
    if (error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
      // Fallback: if foreign key constraint still fails, deactivate instead
      db.prepare('UPDATE products SET active = 0 WHERE id = ?').run(params.id)
      return NextResponse.json({ 
        success: true, 
        message: 'Product deactivated due to constraints',
        deactivated: true 
      })
    }
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}

