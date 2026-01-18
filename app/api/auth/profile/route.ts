import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { isSupabaseConfigured } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function PUT(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { userId, first_name, last_name, phone, country, county, city, address } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!first_name || !last_name || !phone || !country || !county || !city || !address) {
      return NextResponse.json(
        { error: 'Toate câmpurile sunt obligatorii' },
        { status: 400 }
      )
    }

    // Update user
    const updatedUser = await db.update('users', parseInt(userId), {
      first_name,
      last_name,
      phone,
      country,
      county,
      city,
      address,
      updated_at: new Date().toISOString(),
    })

    // Return user without password
    const { password_hash, ...userWithoutPassword } = updatedUser as any

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'Datele au fost actualizate cu succes',
    })
  } catch (error: any) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Eroare la actualizarea datelor', details: error.message },
      { status: 500 }
    )
  }
}
