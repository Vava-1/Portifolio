// GET /api/agent/state
// Returns the current knowledge snapshot summary plus the auto-discovered
// project count. Admin-only (used by the dashboard).

import { getKnowledge } from '@/lib/agent/knowledge';
import { listAutoProjects } from '@/lib/agent/projects';

export async function GET() {
  try {
    const knowledge = await getKnowledge();
    const autoProjects = await listAutoProjects();
    return Response.json({
      ok: true,
      knowledge: knowledge ? {
        lastSyncAt: knowledge.lastSyncAt,
        repoCount: knowledge.repoCount,
        githubUser: knowledge.githubUser,
        repos: knowledge.repos.map(r => ({
          name: r.name,
          language: r.language,
          description: r.description,
          homepage: r.homepage,
          html_url: r.html_url,
          updated_at: r.updated_at,
          techStack: r.techStack,
        })),
      } : null,
      autoProjectsCount: autoProjects.length,
    });
  } catch (err) {
    console.error('[agent] state fetch failed:', err);
    return Response.json({ ok: false, error: err?.message }, { status: 500 });
  }
}
