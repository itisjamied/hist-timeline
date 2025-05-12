// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // only protect /studio and its sub-paths
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const auth = req.headers.get('authorization') || ''
  // auth looks like "Basic base64(user:pass)"
  const [scheme, encoded] = auth.split(' ')
  if (
    scheme === 'Basic' &&
    Buffer.from(encoded || '', 'base64').toString() ===
      `${process.env.STUDIO_USER}:${process.env.STUDIO_PASS}`
  ) {
    return NextResponse.next()
  }

  // otherwise challenge
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Sanity Studio"' },
  })
}

export const config = {
  matcher: ['/admin/:path*'],
}
