// Proxy (formerly middleware in Next.js 15 and earlier): protect /admin and
// the admin-only agent API endpoints. Public endpoints
// (/api/agent/chat, /api/agent/auth, /api/agent/projects GET, /api/agent/sync
// for cron) are allowed through.

import { NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/agent/auth';

const PUBLIC_API_PATHS = [
  '/api/agent/chat',
  '/api/agent/auth',
];

function extractToken(req) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`));
  return match?.[1];
}

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  // 1. Block all /admin/* routes except the login page itself.
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = extractToken(req);
    if (!(await verifySessionToken(token))) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Block admin-only API endpoints.
  if (pathname.startsWith('/api/agent/')) {
    const isPublic = PUBLIC_API_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'));
    if (!isPublic) {
      // /api/agent/projects GET is public (homepage reads it). Other methods need auth.
      if (pathname === '/api/agent/projects') {
        if (req.method === 'GET') return NextResponse.next();
      }
      // /api/agent/sync is callable by Vercel Cron with a bearer secret, or by an admin.
      if (pathname === '/api/agent/sync') {
        const expected = process.env.CRON_SECRET;
        const authHeader = req.headers.get('authorization') || '';
        if (expected && authHeader === `Bearer ${expected}`) return NextResponse.next();
        const token = extractToken(req);
        if (!(await verifySessionToken(token))) {
          return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.next();
      }
      // Everything else under /api/agent/* requires an admin session.
      const token = extractToken(req);
      if (!(await verifySessionToken(token))) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/agent/:path*'],
};
