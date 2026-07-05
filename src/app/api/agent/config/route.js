// /api/agent/config
// GET    - list all config keys (without revealing values) — admin only
// POST   - set a config value  — admin only
// DELETE - remove a config value — admin only

import { listConfig, setConfigValue, deleteConfigValue } from '@/lib/agent/config';

export async function GET() {
  try {
    const items = await listConfig();
    return Response.json({ ok: true, items });
  } catch (err) {
    console.error('[agent] config GET failed:', err);
    return Response.json({ ok: false, error: err?.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { key, value } = body;
    if (!key || typeof key !== 'string') {
      return Response.json({ ok: false, error: 'key is required' }, { status: 400 });
    }
    if (value === undefined || value === null) {
      return Response.json({ ok: false, error: 'value is required' }, { status: 400 });
    }
    await setConfigValue(key, String(value));
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[agent] config POST failed:', err);
    return Response.json({ ok: false, error: err?.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');
    if (!key) return Response.json({ ok: false, error: 'key is required' }, { status: 400 });
    await deleteConfigValue(key);
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[agent] config DELETE failed:', err);
    return Response.json({ ok: false, error: err?.message }, { status: 500 });
  }
}
