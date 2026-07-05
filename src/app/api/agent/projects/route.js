// /api/agent/projects
// GET    - list all auto-discovered projects (public, used by the homepage)
// POST   - add a manual entry (admin only)
// PATCH  - edit an existing entry (admin only)
// DELETE - remove an entry (admin only)

import { listAutoProjects, editProject, deleteProject } from '@/lib/agent/projects';

export async function GET() {
  try {
    const projects = await listAutoProjects();
    return Response.json({ ok: true, projects });
  } catch (err) {
    console.error('[agent] projects GET failed:', err);
    return Response.json({ ok: false, error: err?.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, ...patch } = body;
    if (!id) return Response.json({ ok: false, error: 'id is required' }, { status: 400 });
    const updated = await editProject(id, patch);
    return Response.json({ ok: true, project: updated });
  } catch (err) {
    console.error('[agent] projects PATCH failed:', err);
    return Response.json({ ok: false, error: err?.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return Response.json({ ok: false, error: 'id is required' }, { status: 400 });
    const removed = await deleteProject(id);
    return Response.json({ ok: true, removed });
  } catch (err) {
    console.error('[agent] projects DELETE failed:', err);
    return Response.json({ ok: false, error: err?.message }, { status: 500 });
  }
}
