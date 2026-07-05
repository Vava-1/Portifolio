// Admin authentication. Simple HMAC-signed cookie approach.
//
// Setup:
//   Set ADMIN_PASSWORD env var to a strong password (>= 8 chars).
//   Set ADMIN_SESSION_SECRET to a long random string (use `openssl rand -hex 32`).
//
// On POST /api/agent/auth with { password }, we verify it against ADMIN_PASSWORD
// and set an HttpOnly cookie `agent_admin` containing a HMAC-signed token
// of the form `${expiresAt}.${hmac}`.
//
// Middleware in src/middleware.js verifies the cookie on /admin and /api/agent/*
// (except /api/agent/auth and /api/agent/chat which are public).
//
// IMPORTANT: This file is imported by both the Node.js runtime (API routes)
// and the Edge Runtime (middleware). The Edge Runtime exposes a global
// `crypto` WebCrypto API, but it does NOT support Node's `crypto` module.
// To keep things compatible across both runtimes we use WebCrypto.

const COOKIE_NAME = 'agent_admin';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const enc = new TextEncoder();

function bytesToHex(bytes) {
  let hex = '';
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0');
  }
  return hex;
}

async function hmac(value) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set. The admin dashboard cannot be secured without it.');
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(value));
  return bytesToHex(new Uint8Array(sig));
}

// Public: create a signed session token valid for SESSION_TTL_MS.
export async function createSessionToken() {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  const sig = await hmac(payload);
  return `${payload}.${sig}`;
}

// Public: verify a token. Returns true if valid and not expired.
export async function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = await hmac(payload);
  if (sig !== expected) return false;
  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt)) return false;
  return Date.now() < expiresAt;
}

// Public: verify the password against the env var. Constant-time comparison
// is done by comparing the HMACs of both values (which produces strings of
// equal length for the same secret).
export async function verifyPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (typeof password !== 'string') return false;
  if (password.length < 4 || expected.length < 4) return false;
  const a = await hmac(password);
  const b = await hmac(expected);
  if (a.length !== b.length) return false;
  // Constant-time string comparison.
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
export const SESSION_TTL = SESSION_TTL_MS;

