import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (*)
      `)
      .eq('id', parseInt(params.id))
      .single()

    if (error) throw error
    if (!data) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const category = data.categories
    const product = {
      ...data,
      category_name: category?.name,
      category_slug: category?.slug,
    }

    return NextResponse.json(product)
  } catch (error: any) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product', details: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, slug, description, price, image, category_id, stock, active } = body

    const updateData: Record<string, any> = {
      name,
      slug,
      description: description || null,
      price: parseFloat(price),
      image: image || null,
      category_id: parseInt(category_id),
      stock: parseInt(stock) || 0,
    }

    if (active !== undefined) {
      updateData.active = active ? 1 : 0
    }

    const product = await db.update('products', parseInt(params.id), updateData)

    // Get category name
    const category = await db.getById('categories', product.category_id)

    return NextResponse.json({
      ...product,
      category_name: category.name,
    })
  } catch (error: any) {
    console.error('Error updating product:', error)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update product', details: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if product is used in orders
    const orderItems = await db.getWhere('order_items', { product_id: parseInt(params.id) })
    
    if (orderItems.length > 0) {
      // Deactivate instead of delete
      await db.update('products', parseInt(params.id), { active: 0 })
      return NextResponse.json({ 
        success: true, 
        message: 'Product deactivated (used in orders)',
        deactivated: true 
      })
    } else {
      // Delete completely
      await db.delete('products', parseInt(params.id))
      return NextResponse.json({ 
        success: true,
        message: 'Product deleted',
        deactivated: false 
      })
    }
  } catch (error: any) {
    console.error('Error deleting product:', error)
    // Fallback: deactivate
    try {
      await db.update('products', parseInt(params.id), { active: 0 })
      return NextResponse.json({ 
        success: true, 
        message: 'Product deactivated',
        deactivated: true 
      })
    } catch (fallbackError: any) {
      return NextResponse.json({ error: 'Failed to delete product', details: fallbackError.message }, { status: 500 })
    }
  }
}
