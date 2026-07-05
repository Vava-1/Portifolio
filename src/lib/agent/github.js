// GitHub REST API helpers used by the agent.
// All helpers expect GITHUB_PAT and GITHUB_OWNER to be set in the environment.

const API = 'https://api.github.com';

function headers() {
  const pat = process.env.GITHUB_PAT;
  if (!pat) throw new Error('GITHUB_PAT is not set. The agent cannot read or write the knowledge base without it.');
  return {
    Authorization: `token ${pat}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'valentin-portfolio-agent',
  };
}

export async function listRepos() {
  const owner = process.env.GITHUB_OWNER || 'Vava-1';
  const res = await fetch(`${API}/users/${owner}/repos?per_page=100&sort=updated&type=owner`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error(`GitHub listRepos failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  // Skip forked repos and the profile README repo (size 0 or name === owner)
  return data.filter(r => !r.fork && r.name !== owner);
}

export async function getFile(repo, path) {
  const res = await fetch(`${API}/repos/${process.env.GITHUB_OWNER || 'Vava-1'}/${repo}/contents/${encodeURIComponent(path)}`, {
    headers: headers(),
  });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const data = await res.json();
  if (!data || data.type !== 'file' || !data.content) return null;
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

export async function listRepoRoot(repo) {
  const res = await fetch(`${API}/repos/${process.env.GITHUB_OWNER || 'Vava-1'}/${repo}/contents`, {
    headers: headers(),
  });
  if (!res.ok) return [];
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data.map(item => ({ name: item.name, type: item.type }));
}

// Read a file from the portfolio repo's .agent/ directory. Returns parsed JSON
// or `fallback` if the file does not exist yet.
export async function readAgentState(filename, fallback = null) {
  const portfolioRepo = process.env.GITHUB_PORTFOLIO_REPO || 'Portifolio';
  const path = `.agent/${filename}`;
  const res = await fetch(`${API}/repos/${process.env.GITHUB_OWNER || 'Vava-1'}/${portfolioRepo}/contents/${encodeURIComponent(path)}`, {
    headers: headers(),
  });
  if (res.status === 404) return fallback;
  if (!res.ok) return fallback;
  const data = await res.json();
  if (!data || data.type !== 'file' || !data.content) return fallback;
  try {
    return {
      content: JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8')),
      sha: data.sha,
    };
  } catch {
    return fallback;
  }
}

// Write (or update) a JSON file in the portfolio repo's .agent/ directory.
// If `sha` is provided, updates the existing file; otherwise creates it.
export async function writeAgentState(filename, content, sha = null, commitMessage = null) {
  const portfolioRepo = process.env.GITHUB_PORTFOLIO_REPO || 'Portifolio';
  const path = `.agent/${filename}`;
  const body = {
    message: commitMessage || `agent: update ${filename}`,
    content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${API}/repos/${process.env.GITHUB_OWNER || 'Vava-1'}/${portfolioRepo}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub writeAgentState(${filename}) failed: ${res.status} ${err}`);
  }
  const data = await res.json();
  return { sha: data.content?.sha, commit: data.commit?.sha };
}

// Make sure the .agent/ directory exists by writing a .gitkeep file (idempotent).
export async function ensureAgentDir() {
  try {
    await writeAgentState('.gitkeep', { note: 'This directory stores agent state. Do not edit manually.' }, null, 'agent: initialize .agent directory');
  } catch (e) {
    // Probably already exists, which is fine.
  }
}
