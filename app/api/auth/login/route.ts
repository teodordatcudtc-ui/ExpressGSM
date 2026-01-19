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
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email și parolă sunt obligatorii' },
        { status: 400 }
      )
    }

    // Find user by email
    const users = await db.getWhere('users', { email })
    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Email sau parolă incorectă' },
        { status: 401 }
      )
    }

    const user = users[0] as any

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Email sau parolă incorectă' },
        { status: 401 }
      )
    }

    // Return user without password
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'Autentificare reușită',
    })
  } catch (error: any) {
    console.error('Error logging in:', error)
    return NextResponse.json(
      { error: 'Eroare la autentificare', details: error.message },
      { status: 500 }
    )
  }
}
