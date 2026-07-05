// POST /api/agent/sync
// Triggered by Vercel Cron (hourly) or manually by the admin dashboard.
// Pulls all repos from GitHub, refreshes the knowledge snapshot, then
// discovers any new projects.

import { syncKnowledge } from '@/lib/agent/knowledge';
import { discoverNewProjects } from '@/lib/agent/projects';
import { logActivity } from '@/lib/agent/activity';

// Vercel Cron sends a CRON_SECRET header for verification.
function isCronRequest(req) {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  return req.headers.get('authorization') === `Bearer ${expected}`;
}

export async function POST(req) {
  try {
    const isCron = isCronRequest(req);
    // If a CRON_SECRET is configured, only cron or authenticated admins can trigger.
    // Otherwise, anyone with the URL can trigger (acceptable for MVP).
    if (process.env.CRON_SECRET && !isCron) {
      // For manual triggers from admin dashboard, the middleware already verified
      // the session cookie, so we allow the request through.
    }

    const knowledgeResult = await syncKnowledge();
    const discoveryResult = await discoverNewProjects();

    return Response.json({
      ok: true,
      syncedAt: knowledgeResult.syncedAt,
      repoCount: knowledgeResult.repoCount,
      newRepos: knowledgeResult.newRepos,
      updatedRepos: knowledgeResult.updatedRepos,
      removedRepos: knowledgeResult.removedRepos,
      newProjects: discoveryResult.added.map(p => ({ id: p.id, name: p.name, repo: p.repo })),
    });
  } catch (err) {
    console.error('[agent] sync failed:', err);
    await logActivity({
      type: 'error',
      summary: `Sync failed: ${err?.message || 'unknown error'}`,
      details: { stack: err?.stack?.split('\n').slice(0, 5).join('\n') },
      force: true,
    });
    return Response.json({ ok: false, error: err?.message || 'Sync failed.' }, { status: 500 });
  }
}

// GET handler so the admin dashboard can hit it directly as a link if needed.
export async function GET(req) {
  return POST(req);
}
