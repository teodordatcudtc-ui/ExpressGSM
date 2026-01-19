import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { isSupabaseConfigured } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    // Get user ID from query params (in production, use JWT token)
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const user = await db.getById('users', parseInt(userId))
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Return user without password
    const { password_hash, ...userWithoutPassword } = user as any

    return NextResponse.json({
      user: userWithoutPassword,
    })
  } catch (error: any) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Eroare la obținerea datelor utilizatorului', details: error.message },
      { status: 500 }
    )
  }
}
