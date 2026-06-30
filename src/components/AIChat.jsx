'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { PROFILE } from '@/data/profile';

const SUGGESTIONS = [
  'What has Valentin built recently?',
  'What\'s his strongest skill?',
  'Is he available for new projects?',
];

const WELCOME = `Hi, I'm an AI assistant trained on ${PROFILE.name}'s background and work. Ask me anything, what he's built, how he works, or what he's good at.`;

export default function AIChat() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [notConfigured, setNotConfigured] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: nextMessages.slice(0, -1) }),
      });
      const data = await res.json();
      if (data.configured === false) setNotConfigured(true);
      setMessages(m => [...m, { role: 'assistant', content: data.reply || data.error || 'Something went wrong.' }]);
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Connection issue, try again in a moment.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel glow-violet w-full max-w-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <div className="relative w-2.5 h-2.5">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
          <span className="absolute inset-0 rounded-full bg-emerald-400" />
        </div>
        <Sparkles className="w-4 h-4" style={{ color: 'var(--color-amber)' }} />
        <p className="font-mono text-xs tracking-wide" style={{ color: 'var(--color-haze)' }}>
          ask-valentin <span style={{ color: 'var(--color-haze)', opacity: 0.5 }}>// live AI assistant</span>
        </p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="chat-scroll h-72 overflow-y-auto px-5 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                style={
                  m.role === 'user'
                    ? { background: 'var(--color-violet)', color: 'white' }
                    : { background: 'var(--color-surface-2)', color: 'var(--color-mist)' }
                }
              >
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-2.5 flex items-center gap-1.5" style={{ background: 'var(--color-surface-2)' }}>
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--color-haze)' }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggestions, only show before first real exchange */}
      {messages.length === 1 && (
        <div className="px-5 pb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => send(s)}
              className="chip hover:border-violet transition-colors"
              style={{ cursor: 'pointer' }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={e => { e.preventDefault(); send(input); }}
        className="flex items-center gap-2 px-4 py-3 border-t"
        style={{ borderColor: 'var(--color-line)' }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about his projects, skills, or availability..."
          className="input-field flex-1 text-sm py-2.5"
          maxLength={500}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
          style={{ background: 'var(--color-amber)', color: 'var(--color-ink)' }}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>

      {notConfigured && (
        <p className="px-5 pb-4 text-xs" style={{ color: 'var(--color-haze)' }}>
          Running in offline mode until a Gemini API key is connected.
        </p>
      )}
    </div>
  );
}
