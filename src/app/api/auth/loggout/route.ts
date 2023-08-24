import { NextResponse } from 'next/server'
import Cookie from 'cookie'

export async function GET(req: Request) {
  const redirectUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL ?? '', req.url)

  const tokenHeader = Cookie.serialize('token', '', {
    path: '/',
    maxAge: 0,
  })

  const refreshTokenHeader = Cookie.serialize('refreshToken', '', {
    path: '/',
    maxAge: 0,
  })

  const headers = new Headers()
  headers.append('Set-Cookie', tokenHeader)
  headers.append('Set-Cookie', refreshTokenHeader)

  return NextResponse.redirect(redirectUrl, {
    headers,
  })
}
