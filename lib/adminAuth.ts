import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

const ADMIN_COOKIE_NAME = 'admin_session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8 // 8 hours

interface AdminTokenPayload {
  role: 'admin'
  exp: number
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url')
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf8')
}

function signPayload(payloadBase64: string): string {
  const secret = getRequiredEnv('ADMIN_AUTH_SECRET')
  return createHmac('sha256', secret).update(payloadBase64).digest('base64url')
}

function getCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null
  const parts = cookieHeader.split(';')
  for (const part of parts) {
    const [key, ...valueParts] = part.trim().split('=')
    if (key === name) {
      return valueParts.join('=')
    }
  }
  return null
}

export function createAdminSessionToken(): string {
  const payload: AdminTokenPayload = {
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  }
  const payloadBase64 = base64UrlEncode(JSON.stringify(payload))
  const signature = signPayload(payloadBase64)
  return `${payloadBase64}.${signature}`
}

export function verifyAdminSessionToken(token: string | null): boolean {
  if (!token) return false
  const [payloadBase64, signature] = token.split('.')
  if (!payloadBase64 || !signature) return false

  try {
    const expectedSignature = signPayload(payloadBase64)
    const providedSignatureBuffer = Buffer.from(signature, 'base64url')
    const expectedSignatureBuffer = Buffer.from(expectedSignature, 'base64url')

    if (providedSignatureBuffer.length !== expectedSignatureBuffer.length) {
      return false
    }
    if (!timingSafeEqual(providedSignatureBuffer, expectedSignatureBuffer)) {
      return false
    }

    const payload = JSON.parse(base64UrlDecode(payloadBase64)) as AdminTokenPayload
    if (payload.role !== 'admin') return false
    if (payload.exp < Math.floor(Date.now() / 1000)) return false
    return true
  } catch {
    return false
  }
}

export function isAdminRequest(request: Request): boolean {
  const token = getCookieValue(request.headers.get('cookie'), ADMIN_COOKIE_NAME)
  return verifyAdminSessionToken(token)
}

export function ensureAdminRequest(request: Request): NextResponse | null {
  if (isAdminRequest(request)) return null
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export function getAdminPassword(): string {
  return getRequiredEnv('ADMIN_PASSWORD')
}

export function getAdminCookieName(): string {
  return ADMIN_COOKIE_NAME
}

export function getAdminSessionMaxAgeSeconds(): number {
  return SESSION_MAX_AGE_SECONDS
}
