import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { isAuthenticated } from './lib/is_authenticated';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname == '/sign-in' || pathname == '/sign-up') {
    if (await isAuthenticated()) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api/auth|_next/static|_next_image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
}