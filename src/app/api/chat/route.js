import { GoogleGenAI } from '@google/genai';
import { AI_SYSTEM_CONTEXT, PROFILE } from '@/data/profile';

// In-memory rate limiter, resets on cold start. Good enough for a personal
// portfolio's traffic; swap for Upstash/Redis if this ever needs to scale.
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
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return Response.json(
        { reply: "That's a lot of questions in a short time. Give it a minute and try again, or reach out directly through the contact form." },
        { status: 429 }
      );
    }

    const { message, history } = await req.json();
    if (!message || typeof message !== 'string' || !message.trim() || message.length > 1000) {
      return Response.json({ error: 'Invalid message' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json({
        reply: `The AI assistant isn't connected yet, this needs a free Gemini API key set as GEMINI_API_KEY in the environment. In the meantime, feel free to reach out directly at ${PROFILE.email}.`,
        configured: false,
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = [
      ...(Array.isArray(history) ? history.slice(-8) : []).map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(h.content).slice(0, 1000) }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: AI_SYSTEM_CONTEXT,
        maxOutputTokens: 400,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I wasn't able to put together an answer for that, try rephrasing, or use the contact form to reach Valentin directly.";

    return Response.json({ reply, configured: true });
  } catch (err) {
    console.error('Chat API error:', err);
    return Response.json(
      { reply: "Something went wrong on my end. Try again in a moment, or reach out directly through the contact form." },
      { status: 500 }
    );
  }
}
