// POST /api/agent/chat
// Public endpoint. Visitor sends a question; the agent answers using Gemini
// with full context from profile.js AND the auto-synced knowledge base.

import { GoogleGenAI } from '@google/genai';
import { PROFILE, AI_SYSTEM_CONTEXT } from '@/data/profile';
import { buildReposContextBlock, getKnowledge } from '@/lib/agent/knowledge';
import { listAutoProjects } from '@/lib/agent/projects';
import { logActivity } from '@/lib/agent/activity';
import { getConfigValue } from '@/lib/agent/config';

const requestLog = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter(t => now - t < WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(req) {
  let message = '';
  let history = [];
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    if (isRateLimited(ip)) {
      return Response.json(
        { reply: "That's a lot of questions in a short time. Give it a minute and try again, or reach out directly through the contact form." },
        { status: 429 }
      );
    }

    const body = await req.json();
    message = body?.message;
    history = Array.isArray(body?.history) ? body.history : [];

    if (!message || typeof message !== 'string' || !message.trim() || message.length > 1000) {
      return Response.json({ error: 'Invalid message' }, { status: 400 });
    }

    const apiKey = await getConfigValue('GEMINI_API_KEY');
    if (!apiKey) {
      return Response.json({
        reply: `I'm not connected to an AI model right now. Valentin needs to add a free Gemini API key as GEMINI_API_KEY in the environment. In the meantime, you can reach him directly at ${PROFILE.email} or on WhatsApp at ${PROFILE.whatsapp}.`,
        configured: false,
      });
    }

    // Build the full context: curated profile + auto-discovered projects + all repos.
    const autoProjects = await listAutoProjects();
    const reposBlock = await buildReposContextBlock();
    const knowledge = await getKnowledge();

    const autoProjectsBlock = autoProjects.length > 0
      ? `\nADDITIONAL PROJECTS (auto discovered from GitHub, not yet curated into the main list):\n${autoProjects.map(p => `${p.name} (${p.year}). ${p.summary} ${p.description} Stack: ${(p.stack || []).join(', ')}.${p.link ? ` Live at: ${p.link}.` : ''} Repo: ${p.repo_url}.`).join('\n')}`
      : '';

    const fullSystemContext = `${AI_SYSTEM_CONTEXT}

${autoProjectsBlock}

${reposBlock || ''}

Last knowledge sync: ${knowledge?.lastSyncAt || 'never'}

Remember: you are talking to a visitor. Be honest, warm, and specific. If asked about something not in the context above, say so honestly and suggest the visitor reach out via the contact form. Never invent details.`;

    const ai = new GoogleGenAI({ apiKey });
    const contents = [
      ...history.slice(-8).map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(h.content).slice(0, 1000) }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    // Try gemini-2.5-flash first; if it fails (region, quota, deprecation),
    // fall back to gemini-2.0-flash which is more broadly available.
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash'];
    let response = null;
    let lastErr = null;
    for (const model of models) {
      try {
        response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: fullSystemContext,
            maxOutputTokens: 500,
            temperature: 0.7,
          },
        });
        if (response?.text) break;
      } catch (e) {
        lastErr = e;
        // Try the next model.
      }
    }

    const reply = response?.text || "I wasn't able to put together an answer for that. Try rephrasing, or use the contact form to reach Valentin directly.";

    // Log the conversation (subject to throttling in logActivity).
    await logActivity({
      type: 'chat',
      summary: `Visitor asked: "${message.slice(0, 120)}"`,
      details: {
        question: message.slice(0, 500),
        answer: reply.slice(0, 500),
        ip: ip === 'unknown' ? null : ip,
      },
    });

    return Response.json({ reply, configured: true });
  } catch (err) {
    console.error('[agent] chat failed:', err);
    await logActivity({
      type: 'error',
      summary: `Chat failed on question: "${String(message).slice(0, 80)}"`,
      details: { error: err?.message },
    });
    return Response.json(
      { reply: "Something went wrong on my end. Try again in a moment, or reach out directly through the contact form." },
      { status: 500 }
    );
  }
}
