'use client';
import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Trash2, Edit2, Save, X, ExternalLink, Activity, Bot, Database, LogOut } from 'lucide-react';

const TYPE_COLORS = {
  sync: 'var(--color-violet)',
  chat: 'var(--color-amber)',
  project_added: '#34D399',
  project_updated: '#60A5FA',
  project_removed: '#F87171',
  admin_login: '#A78BFA',
  error: '#F87171',
};

export default function AdminDashboard() {
  const [state, setState] = useState(null);
  const [activity, setActivity] = useState([]);
  const [autoProjects, setAutoProjects] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (msg, kind = 'info') => {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 3000);
  };

  const loadState = useCallback(async () => {
    setLoadingState(true);
    try {
      const res = await fetch('/api/agent/state');
      const data = await res.json();
      setState(data);
      setAutoProjects(data?.knowledge ? await (await fetch('/api/agent/projects')).json() : { projects: [] });
      if (data?.ok && data.autoProjectsCount !== undefined) {
        // Already loaded
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingState(false);
    }
  }, []);

  const loadActivity = useCallback(async () => {
    setLoadingActivity(true);
    try {
      const res = await fetch('/api/agent/activity');
      const data = await res.json();
      if (data?.ok) setActivity(data.entries || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingActivity(false);
    }
  }, []);

  const loadProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/agent/projects');
      const data = await res.json();
      if (data?.ok) setAutoProjects(data.projects || []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    loadState();
    loadActivity();
    loadProjects();
  }, [loadState, loadActivity, loadProjects]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/agent/sync', { method: 'POST' });
      const data = await res.json();
      if (data?.ok) {
        showToast(`Synced. ${data.newProjects?.length || 0} new project(s) discovered.`, 'ok');
        await Promise.all([loadState(), loadActivity(), loadProjects()]);
      } else {
        showToast(data?.error || 'Sync failed.', 'error');
      }
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setSyncing(false);
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditForm({ ...p });
  };
  const cancelEdit = () => { setEditingId(null); setEditForm({}); };
  const saveEdit = async () => {
    try {
      const res = await fetch('/api/agent/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...editForm }),
      });
      const data = await res.json();
      if (data?.ok) {
        showToast('Project updated.', 'ok');
        cancelEdit();
        await Promise.all([loadProjects(), loadActivity()]);
      } else {
        showToast(data?.error || 'Update failed.', 'error');
      }
    } catch (e) {
      showToast(e.message, 'error');
    }
  };
  const removeProject = async (id, name) => {
    if (!confirm(`Remove "${name}" from the public site? The original repo will stay on GitHub.`)) return;
    try {
      const res = await fetch(`/api/agent/projects?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (data?.ok) {
        showToast('Project removed.', 'ok');
        await Promise.all([loadProjects(), loadActivity()]);
      } else {
        showToast(data?.error || 'Delete failed.', 'error');
      }
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/agent/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logout: true }),
    });
    window.location.href = '/admin/login';
  };

  const stats = state?.knowledge
    ? [
        { label: 'Repos tracked', value: state.knowledge.repoCount, icon: Database },
        { label: 'Auto-discovered projects', value: autoProjects.length, icon: Bot },
        { label: 'Activity entries', value: activity.length, icon: Activity },
        { label: 'Last sync', value: state.knowledge.lastSyncAt ? new Date(state.knowledge.lastSyncAt).toLocaleString() : 'never', icon: RefreshCw, isText: true },
      ]
    : [
        { label: 'Repos tracked', value: 0, icon: Database },
        { label: 'Auto-discovered projects', value: 0, icon: Bot },
        { label: 'Activity entries', value: activity.length, icon: Activity },
        { label: 'Last sync', value: 'never', icon: RefreshCw, isText: true },
      ];

  return (
    <main className="min-h-screen" style={{ background: 'var(--color-ink)', color: 'var(--color-mist)' }}>
      {/* Top bar */}
      <header className="border-b sticky top-0 z-10" style={{ borderColor: 'var(--color-line)', background: 'rgba(11,14,20,0.85)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-line)' }}>
              <Bot className="w-4 h-4" style={{ color: 'var(--color-amber)' }} />
            </div>
            <div>
              <p className="font-display text-base font-medium" style={{ color: 'var(--color-mist)' }}>Agent dashboard</p>
              <p className="text-xs font-mono" style={{ color: 'var(--color-haze)' }}>valentin-portfolio · agent v1</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleSync} disabled={syncing} className="btn-primary py-2 px-4 text-xs">
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync now'}
            </button>
            <a href="/" className="btn-outline py-2 px-4 text-xs">View site</a>
            <button onClick={handleLogout} className="btn-outline py-2 px-4 text-xs flex items-center gap-1.5">
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-8 space-y-10">
        {/* Stats */}
        <section>
          <p className="eyebrow mb-3">Overview</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="panel p-5">
                <div className="flex items-center justify-between mb-3">
                  <s.icon className="w-4 h-4" style={{ color: 'var(--color-amber)' }} />
                </div>
                <p className={`font-display ${s.isText ? 'text-sm' : 'text-3xl'}`} style={{ color: 'var(--color-mist)' }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-haze)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          {!state?.knowledge && (
            <div className="panel p-5 mt-4" style={{ borderColor: 'rgba(232,163,61,0.35)' }}>
              <p className="text-sm" style={{ color: 'var(--color-mist)' }}>The agent hasn't synced yet.</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-haze)' }}>Click "Sync now" above. The agent will pull all your GitHub repos and start building its knowledge base.</p>
            </div>
          )}
        </section>

        {/* Auto-discovered projects */}
        <section>
          <p className="eyebrow mb-3">Auto-discovered projects</p>
          <p className="text-sm mb-4" style={{ color: 'var(--color-haze)' }}>
            These are projects the agent found by scanning your GitHub. They appear on the public site alongside your curated list. Edit them to make the copy nicer, or remove the ones you don't want shown.
          </p>
          {autoProjects.length === 0 ? (
            <div className="panel p-6 text-center">
              <p className="text-sm" style={{ color: 'var(--color-haze)' }}>No auto-discovered projects yet. Run a sync to find some.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {autoProjects.map(p => (
                <div key={p.id} className="panel p-5">
                  {editingId === p.id ? (
                    <div className="space-y-3">
                      <input className="input-field" value={editForm.name || ''} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} placeholder="Name" />
                      <input className="input-field" value={editForm.role || ''} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))} placeholder="Role" />
                      <input className="input-field" value={editForm.summary || ''} onChange={e => setEditForm(f => ({ ...f, summary: e.target.value }))} placeholder="Summary" />
                      <textarea className="input-field" rows={4} value={editForm.description || ''} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" />
                      <input className="input-field" value={(editForm.stack || []).join(', ')} onChange={e => setEditForm(f => ({ ...f, stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} placeholder="Stack (comma separated)" />
                      <input className="input-field" value={editForm.link || ''} onChange={e => setEditForm(f => ({ ...f, link: e.target.value }))} placeholder="Live link (optional)" />
                      <input className="input-field" value={editForm.year || ''} onChange={e => setEditForm(f => ({ ...f, year: e.target.value }))} placeholder="Year" />
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="btn-primary py-2 px-4 text-xs"><Save className="w-3.5 h-3.5" /> Save</button>
                        <button onClick={cancelEdit} className="btn-outline py-2 px-4 text-xs"><X className="w-3.5 h-3.5" /> Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs" style={{ color: 'var(--color-amber)' }}>{p.year}</span>
                          <h3 className="font-display text-lg font-medium" style={{ color: 'var(--color-mist)' }}>{p.name}</h3>
                          {p.autoGenerated && <span className="chip" style={{ background: 'rgba(124,111,240,0.15)' }}>auto</span>}
                        </div>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-haze)' }}>{p.summary}</p>
                        <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--color-haze)' }}>{p.description}</p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {(p.stack || []).map(s => <span key={s} className="chip text-xs">{s}</span>)}
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="font-mono flex items-center gap-1" style={{ color: 'var(--color-amber)' }}><ExternalLink className="w-3 h-3" /> Live</a>}
                          <a href={p.repo_url} target="_blank" rel="noopener noreferrer" className="font-mono flex items-center gap-1" style={{ color: 'var(--color-haze)' }}><ExternalLink className="w-3 h-3" /> Repo</a>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <button onClick={() => startEdit(p)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-line)' }}>
                          <Edit2 className="w-3.5 h-3.5" style={{ color: 'var(--color-haze)' }} />
                        </button>
                        <button onClick={() => removeProject(p.id, p.name)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)' }}>
                          <Trash2 className="w-3.5 h-3.5" style={{ color: '#F87171' }} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Activity log */}
        <section>
          <p className="eyebrow mb-3">Activity log</p>
          <p className="text-sm mb-4" style={{ color: 'var(--color-haze)' }}>
            Everything the agent has done, newest first. If you see red error entries, that's the agent flagging itself for your review.
          </p>
          {loadingActivity ? (
            <div className="panel p-6 text-center">
              <p className="text-sm" style={{ color: 'var(--color-haze)' }}>Loading activity...</p>
            </div>
          ) : activity.length === 0 ? (
            <div className="panel p-6 text-center">
              <p className="text-sm" style={{ color: 'var(--color-haze)' }}>No activity yet. The agent logs every sync, chat, and project change here.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {activity.map(e => (
                <div key={e.id} className="panel p-4 flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: TYPE_COLORS[e.type] || 'var(--color-haze)' }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: TYPE_COLORS[e.type] || 'var(--color-haze)' }}>{e.type}</span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--color-haze)' }}>{new Date(e.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-mist)' }}>{e.summary}</p>
                    {e.details && (
                      <pre className="text-xs font-mono mt-2 p-2 rounded overflow-x-auto" style={{ background: 'var(--color-ink)', color: 'var(--color-haze)', border: '1px solid var(--color-line)' }}>
                        {JSON.stringify(e.details, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Repos tracked */}
        {state?.knowledge?.repos && (
          <section>
            <p className="eyebrow mb-3">All repos tracked</p>
            <div className="panel p-5">
              <div className="grid sm:grid-cols-2 gap-3">
                {state.knowledge.repos.map(r => (
                  <div key={r.name} className="flex items-center justify-between gap-3 py-2 border-b last:border-0" style={{ borderColor: 'var(--color-line)' }}>
                    <div className="min-w-0">
                      <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="font-mono text-sm truncate block" style={{ color: 'var(--color-mist)' }}>{r.name}</a>
                      <p className="text-xs truncate" style={{ color: 'var(--color-haze)' }}>{r.description || r.language}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {(r.techStack || []).slice(0, 3).map(s => <span key={s} className="chip text-[10px]">{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl z-50 font-mono text-sm"
             style={{
               background: toast.kind === 'error' ? 'rgba(248,113,113,0.15)' : toast.kind === 'ok' ? 'rgba(52,211,153,0.15)' : 'var(--color-surface-2)',
               border: `1px solid ${toast.kind === 'error' ? 'rgba(248,113,113,0.4)' : toast.kind === 'ok' ? 'rgba(52,211,153,0.4)' : 'var(--color-line)'}`,
               color: 'var(--color-mist)',
             }}>
          {toast.msg}
        </div>
      )}
    </main>
  );
}
