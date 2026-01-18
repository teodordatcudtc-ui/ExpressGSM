import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { 
          error: 'Database not configured', 
          message: 'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local' 
        },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const slug = searchParams.get('slug')
    const active = searchParams.get('active') !== 'false'
    const includeSubcategories = searchParams.get('includeSubcategories') === 'true'

    let query = supabase
      .from('products')
      .select(`
        *,
        categories (*)
      `)

    if (slug) {
      query = query.eq('slug', slug)
    } else if (categoryId) {
      if (includeSubcategories) {
        // Get subcategories
        const { data: subcats } = await supabase
          .from('categories')
          .select('id')
          .eq('parent_id', parseInt(categoryId))
        
        const subcatIds = (subcats as any[])?.map((c: any) => c.id) || []
        query = query.in('category_id', [parseInt(categoryId), ...subcatIds])
      } else {
        query = query.eq('category_id', parseInt(categoryId))
      }
    }

    if (active) {
      query = query.eq('active', 1)
    }

    query = query.order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) throw error

    // Transform to match expected format
    const products = (data || []).map((product: any) => {
      const category = product.categories
      return {
        ...product,
        category_name: category?.name,
        category_slug: category?.slug,
        category_parent_id: category?.parent_id,
      }
    })

    return NextResponse.json(products)
  } catch (error: any) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products', details: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, description, price, image, category_id, stock, active } = body

    if (!name || !slug || !price || !category_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const productData = {
      name,
      slug,
      description: description || null,
      price: parseFloat(price),
      image: image || null,
      category_id: parseInt(category_id),
      stock: parseInt(stock) || 0,
      active: active !== undefined ? (active ? 1 : 0) : 1,
    }

    const product = (await db.insert('products', productData)) as any

    // Get category name
    const category = (await db.getById('categories', product.category_id)) as any

    return NextResponse.json({
      ...product,
      category_name: category.name,
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating product:', error)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create product', details: error.message }, { status: 500 })
  }
}
