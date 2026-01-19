import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { isSupabaseConfigured } from '@/lib/supabase'

export async function POST() {
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

    const categoriesCreated: string[] = []

    // 1. Create main categories for SHOP
    const mainCategories = [
      { name: 'Telefoane', slug: 'telefoane', description: 'Telefoane noi și second-hand de toate mărcile' },
      { name: 'Display', slug: 'display', description: 'Ecrane și display-uri pentru toate modelele' },
      { name: 'Promoția zilei', slug: 'promotia-zilei', description: 'Produse la prețuri speciale' },
    ]

    const createdMainCategories: any[] = []
    for (const cat of mainCategories) {
      try {
        const existing = await db.getWhere('categories', { slug: cat.slug })
        if (existing.length === 0) {
          const created = await db.insert('categories', { ...cat, parent_id: null })
          createdMainCategories.push(created)
          categoriesCreated.push(cat.name)
        } else {
          createdMainCategories.push(existing[0])
        }
      } catch (error: any) {
        // If category exists, try to get it
        if (error.code === '23505') {
          const existing = await db.getWhere('categories', { slug: cat.slug })
          if (existing.length > 0) {
            createdMainCategories.push(existing[0])
          }
        }
      }
    }

    // 2. Create subcategories for TELEFOANE
    const telefoaneCategory = createdMainCategories.find(c => c.slug === 'telefoane')
    if (telefoaneCategory) {
      const telefoaneSubcats = [
        'iPhone',
        'Samsung',
        'Huawei',
        'Xiaomi',
        'Redmi',
        'Motorola',
        'Oppo',
        'Cu butoane',
        '100-200 LEI',
      ]

      for (const subcatName of telefoaneSubcats) {
        const slug = `telefoane-${subcatName.toLowerCase().replace(/\s+/g, '-').replace('&', 'si')}`
        try {
          const existing = await db.getWhere('categories', { slug })
          if (existing.length === 0) {
            await db.insert('categories', {
              name: subcatName,
              slug,
              description: `Telefoane ${subcatName}`,
              parent_id: telefoaneCategory.id,
            })
            categoriesCreated.push(`${telefoaneCategory.name} > ${subcatName}`)
          }
        } catch (error: any) {
          // Skip if already exists
          if (error.code !== '23505') {
            console.error(`Error creating subcategory ${subcatName}:`, error)
          }
        }
      }
    }

    // 3. Create subcategories for DISPLAY
    const displayCategory = createdMainCategories.find(c => c.slug === 'display')
    if (displayCategory) {
      const displaySubcats = [
        'iPhone',
        'Samsung',
        'Huawei',
        'Redmi',
        'Motorola',
        'Oppo',
      ]

      for (const subcatName of displaySubcats) {
        const slug = `display-${subcatName.toLowerCase().replace(/\s+/g, '-')}`
        try {
          const existing = await db.getWhere('categories', { slug })
          if (existing.length === 0) {
            await db.insert('categories', {
              name: subcatName,
              slug,
              description: `Display pentru ${subcatName}`,
              parent_id: displayCategory.id,
            })
            categoriesCreated.push(`${displayCategory.name} > ${subcatName}`)
          }
        } catch (error: any) {
          // Skip if already exists
          if (error.code !== '23505') {
            console.error(`Error creating subcategory ${subcatName}:`, error)
          }
        }
      }
    }

    // 4. Create categories for REPARAȚII
    const reparatiiCategories = [
      { name: 'Reparații Display', slug: 'reparatii-display', description: 'Reparații și înlocuire display-uri' },
      { name: 'Reparații Placă Bază', slug: 'reparatii-placa-baza', description: 'Reparații plăci de bază și componente electronice' },
      { name: 'Reparații Baterie', slug: 'reparatii-baterie', description: 'Reparații și înlocuire baterii' },
      { name: 'Reparații Difuzor', slug: 'reparatii-difuzor', description: 'Reparații difuzoare și componente audio' },
      { name: 'Reparații Încărcare', slug: 'reparatii-incarcare', description: 'Reparații porturi de încărcare și componente de alimentare' },
      { name: 'Reparații Camere', slug: 'reparatii-camere', description: 'Reparații camere foto și componente optice' },
    ]

    for (const cat of reparatiiCategories) {
      try {
        const existing = await db.getWhere('categories', { slug: cat.slug })
        if (existing.length === 0) {
          await db.insert('categories', { ...cat, parent_id: null })
          categoriesCreated.push(cat.name)
        }
      } catch (error: any) {
        // Skip if already exists
        if (error.code !== '23505') {
          console.error(`Error creating category ${cat.name}:`, error)
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Categories initialized successfully',
      categoriesCreated: categoriesCreated.length,
      details: categoriesCreated,
    })
  } catch (error: any) {
    console.error('Error initializing categories:', error)
    return NextResponse.json(
      { 
        error: 'Failed to initialize categories', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}
