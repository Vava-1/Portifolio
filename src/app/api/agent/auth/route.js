// /api/agent/auth
// POST without `logout: true` -> login: verifies password, sets session cookie.
// POST with `logout: true` -> clears the session cookie.

import { verifyPassword, createSessionToken, verifySessionToken, SESSION_COOKIE_NAME, SESSION_TTL } from '@/lib/agent/auth';
import { logActivity } from '@/lib/agent/activity';

export async function POST(req) {
  try {
    const body = await req.json();
    if (body?.logout) {
      const res = Response.json({ ok: true });
      res.headers.append('Set-Cookie', `${SESSION_COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
      return res;
    }

    const password = body?.password;
    if (!(await verifyPassword(password))) {
      // Log failed login attempts so the admin can spot abuse.
      await logActivity({
        type: 'admin_login',
        summary: 'Failed admin login attempt.',
        details: { ip: req.headers.get('x-forwarded-for') },
      }).catch(() => null);
      return Response.json({ ok: false, error: 'Wrong password.' }, { status: 401 });
    }

    const token = await createSessionToken();
    await logActivity({
      type: 'admin_login',
      summary: 'Admin logged in successfully.',
      details: { ip: req.headers.get('x-forwarded-for') },
      force: true,
    });

    const res = Response.json({ ok: true });
    res.headers.append('Set-Cookie', `${SESSION_COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${Math.floor(SESSION_TTL / 1000)}`);
    return res;
  } catch (err) {
    console.error('[agent] auth failed:', err);
    return Response.json({ ok: false, error: err?.message }, { status: 500 });
  }
}

// GET: check if the current session is valid (used by the admin dashboard
// to decide whether to show the login page or the dashboard).
export async function GET(req) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`));
  const token = match?.[1];
  const isValid = await verifySessionToken(token);
  return Response.json({ ok: isValid });
}
