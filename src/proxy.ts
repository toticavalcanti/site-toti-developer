import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { decrypt } from './lib/auth';

const i18nMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Handle Admin Routes
  if (pathname.startsWith('/admin')) {
    // Skip i18n for admin
    
    // Allow /admin/login
    if (pathname === '/admin/login') {
      const session = request.cookies.get('admin_session')?.value;
      if (session) {
        try {
          await decrypt(session);
          return NextResponse.redirect(new URL('/admin', request.url));
        } catch (e) {
          // Invalid session, allow login page
        }
      }
      return NextResponse.next();
    }

    // Protect other /admin/* routes
    const session = request.cookies.get('admin_session')?.value;
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 2. Handle Public Routes with i18n
  return i18nMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /assets (Static assets)
  // - /_static (inside /public)
  // - all files with extensions (e.g. .jpg, .png, etc.)
  matcher: ['/((?!api|_next|assets|_static|_vercel|.*\\..*).*)'],
};
