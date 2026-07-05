// GET /api/agent/diagnose
// Admin-only. Checks whether the GITHUB_PAT has the right permissions to
// read all repos and write to the Portifolio repo. Returns a clear report
// so the user can see exactly what's wrong and how to fix it.

import { listRepos, readAgentState, writeAgentState } from '@/lib/agent/github.js';
import { logActivity } from '@/lib/agent/activity.js';

export async function GET() {
  const report = {
    ok: true,
    timestamp: new Date().toISOString(),
    pat: {
      isSet: false,
      prefix: null,
    },
    read: {
      canListRepos: false,
      repoCount: 0,
      error: null,
    },
    write: {
      canWritePortifolio: false,
      error: null,
      details: null,
    },
    env: {
      GITHUB_OWNER: process.env.GITHUB_OWNER || '(not set, default: Vava-1)',
      GITHUB_PORTFOLIO_REPO: process.env.GITHUB_PORTFOLIO_REPO || '(not set, default: Portifolio)',
      ADMIN_PASSWORD_SET: Boolean(process.env.ADMIN_PASSWORD),
      ADMIN_SESSION_SECRET_SET: Boolean(process.env.ADMIN_SESSION_SECRET),
      CRON_SECRET_SET: Boolean(process.env.CRON_SECRET),
    },
    fixInstructions: [],
  };

  const pat = process.env.GITHUB_PAT;
  if (!pat) {
    report.ok = false;
    report.pat.isSet = false;
    report.read.error = 'GITHUB_PAT is not set in the environment.';
    report.write.error = 'GITHUB_PAT is not set in the environment.';
    report.fixInstructions.push(
      'Set GITHUB_PAT in Vercel (Settings -> Environment Variables).',
      'Use a fine-grained PAT with "Contents: Read and write" permission on the Portifolio repo.',
      'The PAT must also have "Contents: Read-only" (or read+write) on all your other repos so the agent can scan them.'
    );
    return Response.json(report);
  }

  report.pat.isSet = true;
  report.pat.prefix = pat.slice(0, 12) + '...';

  // 1. Test read: list all repos
  try {
    const repos = await listRepos();
    report.read.canListRepos = true;
    report.read.repoCount = repos.length;
  } catch (e) {
    report.ok = false;
    report.read.error = e?.message || String(e);
    report.fixInstructions.push(
      'The PAT cannot list your repos. Make sure it has "Contents: Read-only" access to all your public repos.',
      'For fine-grained PATs: go to https://github.com/settings/personal-access-tokens, edit the token, and under "Repository access" select "All repositories" or include all your repos.'
    );
  }

  // 2. Test write: try to update .agent/.gitkeep (or create it if it doesn't exist)
  try {
    // First, read the current file to get its SHA (if it exists).
    const existing = await readAgentState('.gitkeep', null);
    const sha = existing?.sha || null;
    const testContent = { note: 'agent diagnostic test', timestamp: new Date().toISOString() };
    await writeAgentState('.gitkeep', testContent, sha, 'agent: diagnostic write test');
    report.write.canWritePortifolio = true;
  } catch (e) {
    report.ok = false;
    report.write.error = e?.message || String(e);
    // Parse the GitHub error to give specific advice
    const errStr = String(e?.message || e);
    if (errStr.includes('403') && errStr.includes('Resource not accessible')) {
      report.write.details = 'The PAT can READ the Portifolio repo but cannot WRITE to it.';
      report.fixInstructions.push(
        'The GITHUB_PAT on Vercel has read access but NOT write access to the Portifolio repo.',
        'To fix: go to https://github.com/settings/personal-access-tokens',
        'Either edit the existing token (set "Contents" to "Read and write" for the Portifolio repo), or create a new token.',
        'Then update GITHUB_PAT in Vercel (Settings -> Environment Variables) with the corrected token.',
        'Finally, redeploy on Vercel for the change to take effect.'
      );
    } else if (errStr.includes('409')) {
      report.write.details = 'SHA mismatch (the file changed between read and write). This is usually transient — try again.';
      report.write.canWritePortifolio = true; // Not a real permission failure
    } else {
      report.fixInstructions.push(`Unexpected write error: ${errStr}`);
    }
  }

  // Log the diagnostic run
  await logActivity({
    type: 'admin_login',
    summary: `Diagnostic run: read=${report.read.canListRepos ? 'OK' : 'FAIL'}, write=${report.write.canWritePortifolio ? 'OK' : 'FAIL'}`,
    details: { read: report.read, write: report.write },
    force: true,
  }).catch(() => null);

  return Response.json(report);
}
