import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { isSupabaseConfigured } from '@/lib/supabase'
import * as bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { email, password, first_name, last_name, phone, country, county, city, address } = body

    // Validate required fields
    if (!email || !password || !first_name || !last_name || !phone || !country || !county || !city || !address) {
      return NextResponse.json(
        { error: 'Toate câmpurile sunt obligatorii' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUsers = await db.getWhere('users', { email })
    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Un cont cu acest email există deja' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const user = await db.insert('users', {
      email,
      password_hash: passwordHash,
      first_name,
      last_name,
      phone,
      country,
      county,
      city,
      address,
    })

    // Return user without password
    const { password_hash, ...userWithoutPassword } = user as any

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'Cont creat cu succes',
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error registering user:', error)
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Un cont cu acest email există deja' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Eroare la crearea contului', details: error.message },
      { status: 500 }
    )
  }
}
