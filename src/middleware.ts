import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const redirectUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL ?? '', req.url)

  if (!token) {
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/categories/:path*',
    '/customers/:path*',
    '/dashboard/:path*',
    '/employees/:path*',
    '/products/:path*',
    '/profile/:path*',
    '/sales/:path*',
    '/suppliers/:path*',
  ],
}
