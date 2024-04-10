import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // TODO: check login status
  const isLoggedIn = false

  if (pathname === '/login') {
    // ログインしていたらルーム一覧にリダイレクト
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/rooms', request.url))
    }
  }

  if (pathname.startsWith('/rooms')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/rooms/:id'],
}
