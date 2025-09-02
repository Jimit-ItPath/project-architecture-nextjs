import { NextRequest, NextResponse } from 'next/server';
import { routes } from '@/utils/constants/routes';

const PUBLIC_ROUTES = Object.values(routes.public);
const AUTH_ROUTES = Object.values(routes.auth);
const PROTECTED_ROUTES = Object.values(routes.private).filter(
  route => typeof route === 'string'
);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value; // replace 'token' with your cookie name

  // Check if token exists and is active (pseudo-check, replace with real logic)
  let isTokenValid = false;
  if (token) {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );
      const now = Math.floor(Date.now() / 1000);
      isTokenValid = payload.exp && payload.exp > now;
    } catch {
      isTokenValid = false;
    }
  }

  // --- 1. Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // --- 2. Auth pages: redirect to /dashboard if already logged in
  if (AUTH_ROUTES.includes(pathname) && isTokenValid) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // --- 3. Protected routes
  const isProtected = PROTECTED_ROUTES.some(prefix =>
    pathname.startsWith(prefix)
  );

  // if (isProtected && !isTokenValid) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // --- 4. Everything else
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Protect all routes except:
     * - static files
     * - public
     * - auth
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
