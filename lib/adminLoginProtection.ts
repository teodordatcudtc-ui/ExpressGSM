const MAX_FAILED_ATTEMPTS = 3
const LOCKOUT_SECONDS = 15 * 60 // 15 minutes
const TRACKING_WINDOW_SECONDS = 60 * 60 // 1 hour

interface AttemptState {
  failedAttempts: number
  firstFailedAtMs: number
  lockedUntilMs: number
}

const attemptsByIp = new Map<string, AttemptState>()

function nowMs(): number {
  return Date.now()
}

function parseClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim()
    if (first) return first
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

function getState(ip: string): AttemptState {
  const current = attemptsByIp.get(ip)
  if (!current) {
    const initial: AttemptState = {
      failedAttempts: 0,
      firstFailedAtMs: nowMs(),
      lockedUntilMs: 0,
    }
    attemptsByIp.set(ip, initial)
    return initial
  }
  return current
}

function maybeResetWindow(state: AttemptState): void {
  const elapsed = nowMs() - state.firstFailedAtMs
  if (elapsed > TRACKING_WINDOW_SECONDS * 1000) {
    state.failedAttempts = 0
    state.firstFailedAtMs = nowMs()
    state.lockedUntilMs = 0
  }
}

function cleanupOldEntries(): void {
  const now = nowMs()
  for (const [ip, state] of attemptsByIp.entries()) {
    const inactiveFor = now - state.firstFailedAtMs
    const noLock = state.lockedUntilMs === 0 || state.lockedUntilMs < now
    if (inactiveFor > TRACKING_WINDOW_SECONDS * 1000 && noLock && state.failedAttempts === 0) {
      attemptsByIp.delete(ip)
    }
  }
}

export function getAdminLoginLockStatus(request: Request): { blocked: boolean; retryAfterSeconds: number } {
  cleanupOldEntries()
  const ip = parseClientIp(request)
  const state = getState(ip)
  maybeResetWindow(state)

  const remainingMs = state.lockedUntilMs - nowMs()
  if (remainingMs > 0) {
    return {
      blocked: true,
      retryAfterSeconds: Math.ceil(remainingMs / 1000),
    }
  }
  return { blocked: false, retryAfterSeconds: 0 }
}

export function registerAdminLoginFailure(request: Request): { locked: boolean; retryAfterSeconds: number } {
  const ip = parseClientIp(request)
  const state = getState(ip)
  maybeResetWindow(state)

  state.failedAttempts += 1
  if (state.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    state.failedAttempts = 0
    state.firstFailedAtMs = nowMs()
    state.lockedUntilMs = nowMs() + LOCKOUT_SECONDS * 1000
    return { locked: true, retryAfterSeconds: LOCKOUT_SECONDS }
  }
  return { locked: false, retryAfterSeconds: 0 }
}

export function clearAdminLoginFailures(request: Request): void {
  const ip = parseClientIp(request)
  attemptsByIp.delete(ip)
}
