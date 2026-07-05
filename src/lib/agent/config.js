// Config store. Lets the agent read/write small configuration values
// (like the Gemini API key) to .agent/config.json in the portfolio repo,
// so the user can update them via the admin dashboard without needing to
// touch Vercel env vars.
//
// Schema (config.json):
// { values: { GEMINI_API_KEY: "...", OTHER_KEY: "..." }, updatedAt: "..." }
//
// Resolution order for env vars used by the agent:
//   1. process.env (Vercel env vars) — highest priority
//   2. .agent/config.json values — fallback
//
// This means: if you set GEMINI_API_KEY in Vercel env vars, that wins.
// Otherwise, the value stored in .agent/config.json (set via the admin
// dashboard) is used. Either way works.

import { readAgentState, writeAgentState } from './github.js';
import { logActivity } from './activity.js';

const FILENAME = 'config.json';

async function loadConfig() {
  const state = await readAgentState(FILENAME, null);
  if (state && state.content && state.content.values) {
    return state;
  }
  return { content: { values: {} }, sha: null };
}

// Public: get a config value. Falls back to process.env if not in the store.
export async function getConfigValue(key) {
  // 1. Try process.env first (Vercel env vars take priority).
  if (process.env[key]) return process.env[key];
  // 2. Fall back to .agent/config.json.
  const { content } = await loadConfig();
  return content?.values?.[key] || null;
}

// Public: set a config value. Writes to .agent/config.json.
export async function setConfigValue(key, value) {
  const { content, sha } = await loadConfig();
  const values = content.values || {};
  const before = values[key] ? 'set' : 'unset';
  values[key] = value;
  const newContent = { values, updatedAt: new Date().toISOString() };
  await writeAgentState(FILENAME, newContent, sha, `agent: set config value ${key} (${before} -> set)`);
  await logActivity({
    type: 'project_updated',
    summary: `Admin updated config: ${key}.`,
    details: { key, before, after: 'set' },
    force: true,
  }).catch(() => null);
  return true;
}

// Public: list all config keys (without revealing secret values).
export async function listConfig() {
  const { content } = await loadConfig();
  const values = content?.values || {};
  return Object.keys(values).map(k => ({
    key: k,
    isSet: Boolean(values[k]),
    // Mask the value: show first 8 chars + asterisks.
    preview: values[k] ? `${String(values[k]).slice(0, 8)}${'*'.repeat(Math.max(0, String(values[k]).length - 8))}` : '',
  }));
}

// Public: delete a config value.
export async function deleteConfigValue(key) {
  const { content, sha } = await loadConfig();
  const values = content.values || {};
  if (!(key in values)) return false;
  delete values[key];
  const newContent = { values, updatedAt: new Date().toISOString() };
  await writeAgentState(FILENAME, newContent, sha, `agent: removed config value ${key}`);
  await logActivity({
    type: 'project_updated',
    summary: `Admin removed config: ${key}.`,
    details: { key },
    force: true,
  }).catch(() => null);
  return true;
}
