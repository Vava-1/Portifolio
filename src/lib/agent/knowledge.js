// Knowledge base. The agent keeps a snapshot of every repo it has seen in
// .agent/knowledge.json so the chat endpoint can answer questions without
// hitting the GitHub API on every page load.
//
// Schema:
// {
//   lastSyncAt: ISO timestamp,
//   githubUser: "Vava-1",
//   repos: [
//     {
//       name, description, language, homepage, html_url,
//       updated_at, size, stargazers_count, topics,
//       readmeExcerpt (first ~600 chars of README), techStack (array)
//     }
//   ]
// }

import { readAgentState, writeAgentState, listRepos, getFile, listRepoRoot } from './github.js';
import { logActivity } from './activity.js';
import { readAgentStateFs } from './fs-fallback.js';

const FILENAME = 'knowledge.json';
const PORTFOLIO_REPO_DEFAULT = 'Portifolio';

// Heuristic: guess tech stack from package.json deps + language + file listing.
function inferStack(repo, rootListing, pkgRaw) {
  const stack = new Set();
  if (repo.language) stack.add(repo.language);

  // File extension signals.
  for (const item of rootListing || []) {
    const name = (item?.name || '').toLowerCase();
    if (name === 'dockerfile' || name === 'docker-compose.yml') stack.add('Docker');
    if (name === 'vercel.json') stack.add('Vercel');
    if (name === 'render.yaml') stack.add('Render');
    if (name === 'railway.json' || name === 'railway.toml') stack.add('Railway');
    if (name === 'k8s' || item?.type === 'dir' && name === 'k8s') stack.add('Kubernetes');
    if (name === 'tailwind.config.js' || name === 'tailwind.config.ts') stack.add('Tailwind CSS');
    if (name === 'prisma') stack.add('Prisma');
    if (name === 'drizzle.config.ts') stack.add('Drizzle ORM');
    if (name === 'fastapi' || name === 'requirements.txt') stack.add('Python');
    if (name === 'go.mod') stack.add('Go');
  }

  // package.json dependency signals.
  if (pkgRaw) {
    try {
      const pkg = JSON.parse(pkgRaw);
      const deps = Object.keys(pkg.dependencies || {});
      const all = pkg.allDependencies || deps;
      const has = name => all.some(d => d.toLowerCase().includes(name));
      if (has('next')) stack.add('Next.js');
      if (has('react')) stack.add('React');
      if (has('fastapi')) stack.add('FastAPI');
      if (has('hono')) stack.add('Hono');
      if (has('@trpc')) stack.add('tRPC');
      if (has('express')) stack.add('Express');
      if (has('tailwindcss')) stack.add('Tailwind CSS');
      if (has('@prisma/client')) stack.add('Prisma');
      if (has('drizzle-orm')) stack.add('Drizzle ORM');
      if (has('@google/genai')) stack.add('Google Gemini');
      if (has('@anthropic-ai/sdk')) stack.add('Anthropic Claude');
      if (has('openai')) stack.add('OpenAI');
      if (has('stripe')) stack.add('Stripe');
      if (has('agora')) stack.add('Agora.io');
      if (has('@aws-sdk')) stack.add('AWS S3');
      if (has('framer-motion')) stack.add('Framer Motion');
      if (has('bcryptjs')) stack.add('bcrypt');
      if (has('jose')) stack.add('JWT');
      if (has('@tanstack/react-router') || has('@tanstack/start')) stack.add('TanStack Start');
      if (has('vite')) stack.add('Vite');
    } catch {
      // not JSON
    }
  }

  return Array.from(stack).slice(0, 8);
}

function extractReadmeExcerpt(readme) {
  if (!readme) return '';
  // Strip markdown headers and HTML comments, take first ~600 chars of body.
  const cleaned = readme
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^#+\s*.*$/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`{1,3}/g, '')
    .replace(/\*\*?/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return cleaned.slice(0, 600);
}

// Fetch a single repo's snapshot.
async function snapshotRepo(repo) {
  // Try README at root and in common subdirectories.
  let readme = await getFile(repo.name, 'README.md');
  let pkgRaw = await getFile(repo.name, 'package.json');
  let rootListing = await listRepoRoot(repo.name);

  // If no root README, check common subdirs.
  if (!readme && Array.isArray(rootListing)) {
    for (const sub of ['app', 'utv-platform', 'frontend', 'backend', 'src']) {
      const candidate = await getFile(repo.name, `${sub}/README.md`);
      if (candidate) { readme = candidate; break; }
    }
  }
  if (!pkgRaw && Array.isArray(rootListing)) {
    for (const sub of ['app', 'frontend']) {
      const candidate = await getFile(repo.name, `${sub}/package.json`);
      if (candidate) { pkgRaw = candidate; break; }
    }
  }

  return {
    name: repo.name,
    description: repo.description || '',
    language: repo.language || 'Unknown',
    homepage: repo.homepage || '',
    html_url: repo.html_url,
    updated_at: repo.updated_at,
    pushed_at: repo.pushed_at,
    size: repo.size,
    stargazers_count: repo.stargazers_count || 0,
    topics: repo.topics || [],
    readmeExcerpt: extractReadmeExcerpt(readme),
    techStack: inferStack(repo, rootListing, pkgRaw),
    hasReadme: Boolean(readme),
  };
}

// Public: run a sync. Returns a summary object describing what changed.
export async function syncKnowledge() {
  const repos = await listRepos();
  const prevState = await readAgentState(FILENAME, null);
  const prevRepos = prevState?.content?.repos || [];
  const prevByName = new Map(prevRepos.map(r => [r.name, r]));

  const newRepos = [];
  const updatedRepos = [];
  const unchangedRepos = [];
  const snapshots = [];

  for (const repo of repos) {
    const snapshot = await snapshotRepo(repo);
    snapshots.push(snapshot);

    const prev = prevByName.get(repo.name);
    if (!prev) {
      newRepos.push(snapshot);
    } else if (snapshot.pushed_at !== prev.pushed_at || snapshot.updated_at !== prev.updated_at) {
      updatedRepos.push(snapshot);
    } else {
      unchangedRepos.push(snapshot);
    }
  }

  const removedRepos = prevRepos.filter(r => !repos.some(x => x.name === r.name));

  const knowledge = {
    lastSyncAt: new Date().toISOString(),
    githubUser: process.env.GITHUB_OWNER || 'Vava-1',
    portfolioRepo: process.env.GITHUB_PORTFOLIO_REPO || PORTFOLIO_REPO_DEFAULT,
    repoCount: snapshots.length,
    repos: snapshots,
  };

  const sha = prevState?.sha || null;
  await writeAgentState(FILENAME, knowledge, sha, `agent: sync knowledge base (${newRepos.length} new, ${updatedRepos.length} updated, ${removedRepos.length} removed)`);

  // Log the sync event.
  await logActivity({
    type: 'sync',
    summary: `Synced ${snapshots.length} repos. ${newRepos.length} new, ${updatedRepos.length} updated, ${removedRepos.length} removed.`,
    details: {
      newRepos: newRepos.map(r => r.name),
      updatedRepos: updatedRepos.map(r => r.name),
      removedRepos: removedRepos.map(r => r.name),
      repoCount: snapshots.length,
    },
    force: true,
  });

  return {
    syncedAt: knowledge.lastSyncAt,
    repoCount: snapshots.length,
    newRepos: newRepos.map(r => r.name),
    updatedRepos: updatedRepos.map(r => r.name),
    removedRepos: removedRepos.map(r => r.name),
  };
}

// Public: read the current knowledge snapshot for the chat endpoint.
export async function getKnowledge() {
  // Try GitHub API first (so we see the latest state, even before a redeploy).
  try {
    const { content } = await readAgentState(FILENAME, null);
    if (content) return content;
  } catch {
    // GITHUB_PAT not set or unreachable. Fall through to fs.
  }
  // Fall back to filesystem (bundled at build time).
  return readAgentStateFs(FILENAME);
}

// Public: a friendly string summary of all repos, suitable for injecting into
// the AI system prompt so the assistant can talk about every project Valentin
// has on GitHub (not just the curated ones in profile.js).
export async function buildReposContextBlock() {
  const knowledge = await getKnowledge();
  if (!knowledge || !Array.isArray(knowledge.repos) || knowledge.repos.length === 0) {
    return null;
  }
  const lines = knowledge.repos.map(r => {
    const parts = [`${r.name} (${r.language})`];
    if (r.description) parts.push(r.description);
    if (r.techStack?.length) parts.push(`Stack: ${r.techStack.join(', ')}`);
    if (r.homepage) parts.push(`Live at: ${r.homepage}`);
    if (r.readmeExcerpt) parts.push(`README excerpt: ${r.readmeExcerpt.slice(0, 300)}`);
    parts.push(`Repo: ${r.html_url}`);
    return parts.join('. ');
  });
  return `ALL GITHUB REPOSITORIES (auto-discovered, may include projects beyond the curated list above):\n${lines.join('\n')}`;
}
