// Filesystem fallback for reading .agent/ state files. On Vercel, if
// GITHUB_PAT is not set as an env var, the agent can't read its state
// from the GitHub API at runtime. But since the .agent/ directory is part
// of the repo and gets deployed alongside the code, we can read it from
// the local filesystem instead.
//
// This module provides a single function: readAgentStateFs(filename).
// It returns the parsed JSON content, or null if the file doesn't exist.

let _cache = new Map();

export function readAgentStateFs(filename) {
  if (_cache.has(filename)) return _cache.get(filename);
  let result = null;
  try {
    const path = require('path');
    const fs = require('fs');
    const filePath = path.join(process.cwd(), '.agent', filename);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      result = JSON.parse(raw);
    }
  } catch {
    result = null;
  }
  _cache.set(filename, result);
  return result;
}

export function clearFsCache(filename) {
  if (filename) {
    _cache.delete(filename);
  } else {
    _cache.clear();
  }
}
