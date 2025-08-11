import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow access to login page
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Check if user is accessing admin routes
  if (pathname.startsWith('/admin')) {
    // For now, allow all admin routes without authentication
    // We'll implement proper auth later
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
