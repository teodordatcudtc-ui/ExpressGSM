import { NextResponse } from 'next/server'
import {
  createAdminSessionToken,
  getAdminCookieName,
  getAdminPassword,
  getAdminSessionMaxAgeSeconds,
} from '@/lib/adminAuth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const password = String(body?.password || '')
    const expectedPassword = getAdminPassword()

    if (!password || password !== expectedPassword) {
      return NextResponse.json({ error: 'Parolă incorectă' }, { status: 401 })
    }

    const token = createAdminSessionToken()
    const response = NextResponse.json({ success: true })
    response.cookies.set({
      name: getAdminCookieName(),
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: getAdminSessionMaxAgeSeconds(),
    })
    return response
  } catch (error: any) {
    return NextResponse.json({ error: 'Login failed', details: error?.message || 'Unknown error' }, { status: 500 })
  }
}
