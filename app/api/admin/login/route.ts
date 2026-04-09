import { NextResponse } from 'next/server'
import {
  createAdminSessionToken,
  getAdminCookieName,
  getAdminPassword,
  getAdminSessionMaxAgeSeconds,
} from '@/lib/adminAuth'
import {
  clearAdminLoginFailures,
  getAdminLoginLockStatus,
  registerAdminLoginFailure,
} from '@/lib/adminLoginProtection'

export async function POST(request: Request) {
  try {
    const lockStatus = getAdminLoginLockStatus(request)
    if (lockStatus.blocked) {
      return NextResponse.json(
        { error: 'Prea multe încercări. Încearcă din nou mai târziu.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(lockStatus.retryAfterSeconds),
          },
        }
      )
    }

    const body = await request.json()
    const password = String(body?.password || '')
    const expectedPassword = getAdminPassword()

    if (!password || password !== expectedPassword) {
      const failure = registerAdminLoginFailure(request)
      if (failure.locked) {
        return NextResponse.json(
          { error: 'Prea multe încercări greșite. Contul este blocat temporar.' },
          {
            status: 429,
            headers: {
              'Retry-After': String(failure.retryAfterSeconds),
            },
          }
        )
      }
      return NextResponse.json({ error: 'Parolă incorectă' }, { status: 401 })
    }

    clearAdminLoginFailures(request)
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
