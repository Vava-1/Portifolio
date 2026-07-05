// GET /api/agent/activity
// Returns the recent activity log. Admin-only (protected by middleware).

import { getActivityLog } from '@/lib/agent/activity';
import { getKnowledge } from '@/lib/agent/knowledge';

export async function GET() {
  try {
    const entries = await getActivityLog(100);
    const knowledge = await getKnowledge();
    return Response.json({
      ok: true,
      entries,
      knowledge: knowledge ? {
        lastSyncAt: knowledge.lastSyncAt,
        repoCount: knowledge.repoCount,
        githubUser: knowledge.githubUser,
      } : null,
    });
  } catch (err) {
    console.error('[agent] activity fetch failed:', err);
    return Response.json({ ok: false, error: err?.message }, { status: 500 });
  }
}
