// Activity logger. Every meaningful thing the agent does gets logged to
// .agent/activity.json in the portfolio repo. The log is capped at MAX_ENTRIES
// entries; older entries are pushed out.
//
// To avoid polluting the git history, we throttle writes: if the last entry
// was added less than THROTTLE_MS ago, the new entry is appended to the
// in-memory array but the file is only written back on the next non-throttled
// call. In practice this means rapid chat traffic produces one commit per
// minute instead of one commit per message.

import { readAgentState, writeAgentState } from './github.js';

const MAX_ENTRIES = 200;
const THROTTLE_MS = 60 * 1000; // 1 minute

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function nowIso() {
  return new Date().toISOString();
}

// Internal: load the activity log from the repo, or seed an empty one.
async function loadLog() {
  const state = await readAgentState('activity.json', null);
  if (state && state.content && Array.isArray(state.content.entries)) {
    return state;
  }
  return { content: { entries: [] }, sha: null };
}

// Public: append an entry and persist (subject to throttling).
// type: 'sync' | 'chat' | 'project_added' | 'project_updated' | 'project_removed' | 'admin_login' | 'error'
// summary: short human readable line
// details: optional object with extra context
export async function logActivity({ type, summary, details = null, force = false }) {
  try {
    const { content, sha } = await loadLog();
    const entries = content.entries || [];
    const entry = {
      id: newId(),
      timestamp: nowIso(),
      type,
      summary: String(summary || '').slice(0, 500),
      details: details || null,
    };
    entries.push(entry);

    // Trim old entries.
    while (entries.length > MAX_ENTRIES) entries.shift();

    // Throttle: if the previous entry was within THROTTLE_MS and we're not
    // forced to write (e.g. for sync or admin actions), skip the commit and
    // just return the entry. The next non-throttled call will pick it up.
    if (!force && entries.length >= 2) {
      const prev = entries[entries.length - 2];
      const prevTs = new Date(prev.timestamp).getTime();
      if (Date.now() - prevTs < THROTTLE_MS) {
        return entry;
      }
    }

    await writeAgentState('activity.json', { entries }, sha, `agent: log ${type} (${entry.id})`);
    return entry;
  } catch (err) {
    // Logging must never break the calling flow. Surface to logs only.
    console.error('[agent] logActivity failed:', err?.message || err);
    return null;
  }
}

// Public: read the activity log for the admin dashboard.
export async function getActivityLog(limit = 100) {
  const { content } = await loadLog();
  const entries = (content?.entries || []).slice().reverse(); // newest first
  return entries.slice(0, limit);
}
