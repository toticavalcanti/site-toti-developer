import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.includes('/admin')) {
    const authHeader = request.headers.get('authorization');
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'default_password';

    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      });
    }

    try {
      const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      const user = auth[0];
      const pass = auth[1];

      if (user !== 'admin' || pass !== ADMIN_PASSWORD) {
        return new NextResponse('Invalid credentials', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
        });
      }
    } catch (e) {
      return new NextResponse('Invalid auth format', { status: 400 });
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames and admin
  matcher: ['/', '/(pt|en)/:path*', '/admin/:path*']
};
