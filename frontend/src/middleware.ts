import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('jwt')?.value || req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login?unauthorize', req.url));
    }
    else if (pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/login?unauthorize', req.url));
    }
    return NextResponse.next();
  }

  try {
    const user = await verifyAuth(token)
    if (pathname === '/login' && token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (pathname.startsWith('/dashboard') && !user.isAdmin) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/login?error=Invalid token', req.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/profile/:path*'
  ],
};
