// POST /api/agent/sync
// Triggered by Vercel Cron (hourly) or manually by the admin dashboard.
// Pulls all repos from GitHub, refreshes the knowledge snapshot, then
// discovers any new projects.
//
// The sync has two phases:
//   1. READ: list all repos, fetch READMEs and package.json files
//   2. WRITE: persist the knowledge snapshot to .agent/knowledge.json
//
// If the PAT can read but cannot write (e.g. fine-grained PAT with only
// "Contents: Read-only" on the Portifolio repo), we still return success
// with a warning. The knowledge was built in memory and logged, it just
// wasn't persisted to the repo. The admin sees a clear message about
// fixing the PAT permissions.

import { syncKnowledge } from '@/lib/agent/knowledge';
import { discoverNewProjects } from '@/lib/agent/projects';
import { logActivity } from '@/lib/agent/activity';

export async function POST(req) {
  let knowledgeResult = null;
  let discoveryResult = null;
  const warnings = [];

  // Phase 1: sync knowledge (read + write)
  try {
    knowledgeResult = await syncKnowledge();
  } catch (err) {
    console.error('[agent] sync knowledge failed:', err);
    const errMsg = String(err?.message || err);

    // Check if this is a write-permission error
    if (errMsg.includes('403') && errMsg.includes('Resource not accessible')) {
      warnings.push({
        kind: 'write_permission',
        message: 'The GITHUB_PAT can read your repos but cannot write to the Portifolio repo.',
        fix: 'Go to https://github.com/settings/personal-access-tokens, edit the token, set "Contents" to "Read and write" for the Portifolio repo. Then update GITHUB_PAT in Vercel env vars and redeploy.',
      });
      await logActivity({
        type: 'error',
        summary: 'Sync succeeded (read) but write failed: PAT lacks write permission on Portifolio repo.',
        details: { error: errMsg, warning: 'write_permission' },
        force: true,
      });
      // Don't return yet — try project discovery with whatever we have
    } else {
      // Genuine failure (can't even read repos)
      await logActivity({
        type: 'error',
        summary: `Sync failed: ${errMsg}`,
        details: { stack: err?.stack?.split('\n').slice(0, 5).join('\n') },
        force: true,
      });
      return Response.json({ ok: false, error: errMsg, warnings }, { status: 500 });
    }
  }

  // Phase 2: discover new projects (read + write)
  try {
    discoveryResult = await discoverNewProjects();
  } catch (err) {
    console.error('[agent] discover projects failed:', err);
    const errMsg = String(err?.message || err);
    if (errMsg.includes('403') && errMsg.includes('Resource not accessible')) {
      warnings.push({
        kind: 'write_permission',
        message: 'Could not persist new project entries (same write-permission issue).',
      });
    } else {
      warnings.push({
        kind: 'discovery_failed',
        message: `Project discovery failed: ${errMsg}`,
      });
    }
  }

  // If we got here, the read phase worked. Return success (possibly with warnings).
  return Response.json({
    ok: true,
    partial: warnings.length > 0,
    syncedAt: knowledgeResult?.syncedAt || new Date().toISOString(),
    repoCount: knowledgeResult?.repoCount || 0,
    newRepos: knowledgeResult?.newRepos || [],
    updatedRepos: knowledgeResult?.updatedRepos || [],
    removedRepos: knowledgeResult?.removedRepos || [],
    newProjects: (discoveryResult?.added || []).map(p => ({ id: p.id, name: p.name, repo: p.repo })),
    warnings,
  });
}

// GET handler so the admin dashboard can hit it directly as a link if needed.
export async function GET(req) {
  return POST(req);
}
