import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Activează suspendarea: setează SITE_SUSPENDED=true în .env.local
// Pentru a reporni site-ul: schimbă în false sau șterge variabila, apoi redeploy
const SITE_SUSPENDED = process.env.SITE_SUSPENDED === 'true'

const SUSPENDED_PAGE_HTML = `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Site Suspendat</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      color: #1f2937;
      padding: 2rem;
      text-align: center;
    }
    .container {
      max-width: 480px;
      padding: 3rem;
      background: #f9fafb;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
    }
    h1 { font-size: 1.75rem; margin-bottom: 1rem; font-weight: 700; }
    p { font-size: 1rem; line-height: 1.6; opacity: 0.95; }
    .reason { margin-top: 1rem; font-weight: 600; color: #b91c1c; }
  </style>
</head>
<body>
  <div class="container">
    <h1>⛔ Site Suspendat</h1>
    <p>Acest site este temporar indisponibil.</p>
    <p class="reason">Motiv: Plată restantă</p>
    <p style="margin-top: 1.5rem; font-size: 0.875rem; opacity: 0.8;">
      Pentru detalii, vă rugăm contactați administratorul.
    </p>
  </div>
</body>
</html>
`

export function middleware(request: NextRequest) {
  if (SITE_SUSPENDED) {
    return new NextResponse(SUSPENDED_PAGE_HTML, {
      status: 503,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
