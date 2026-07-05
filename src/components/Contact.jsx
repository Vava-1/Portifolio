'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, Mail, Phone, MessageCircle } from 'lucide-react';
import { PROFILE } from '@/data/profile';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // WhatsApp deep link: strip non-digits, prepend country code if needed
  const whatsappHref = `https://wa.me/${PROFILE.whatsapp.replace(/[^\d]/g, '')}`;
  const phoneHref = `tel:${PROFILE.phone.replace(/\s/g, '')}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.configured === false) {
        // No email service connected yet, fall back to opening the user's
        // own mail client with everything pre-filled. Always works.
        const subject = encodeURIComponent(`New message from ${form.name}`);
        const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
        window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
        setStatus('sent');
        return;
      }

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong, try again.');
        setStatus('error');
        return;
      }

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setErrorMsg('Connection issue, try again in a moment.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative" style={{ background: 'var(--color-surface)' }}>
      <div className="section">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-3">Get in touch</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium mb-5" style={{ color: 'var(--color-mist)' }}>
              Have something worth building? Let's talk.
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: 'var(--color-haze)' }}>
              Whether it's a client project, a role, or a partnership, the fastest way to reach me
              is the form here. I read every message myself.
            </p>

            {/* Email contacts */}
            <div className="space-y-3 mb-6">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--color-surface-2)' }}>
                  <Mail className="w-4 h-4" style={{ color: 'var(--color-amber)' }} />
                </div>
                <span className="font-mono text-sm break-all" style={{ color: 'var(--color-mist)' }}>
                  {PROFILE.email}
                </span>
              </a>
              {PROFILE.emailSecondary && (
                <a
                  href={`mailto:${PROFILE.emailSecondary}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--color-surface-2)' }}>
                    <Mail className="w-4 h-4" style={{ color: 'var(--color-amber)' }} />
                  </div>
                  <span className="font-mono text-sm break-all" style={{ color: 'var(--color-mist)' }}>
                    {PROFILE.emailSecondary}
                  </span>
                </a>
              )}
            </div>

            {/* Phone + WhatsApp */}
            <div className="flex flex-wrap gap-3">
              {PROFILE.phone && (
                <a
                  href={phoneHref}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-colors"
                  style={{
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-line)',
                  }}
                >
                  <Phone className="w-4 h-4" style={{ color: 'var(--color-amber)' }} />
                  <span className="font-mono text-sm" style={{ color: 'var(--color-mist)' }}>{PROFILE.phone}</span>
                </a>
              )}
              {PROFILE.whatsapp && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-colors"
                  style={{
                    background: 'rgba(37, 211, 102, 0.12)',
                    border: '1px solid rgba(37, 211, 102, 0.35)',
                  }}
                >
                  <MessageCircle className="w-4 h-4" style={{ color: '#25D366' }} />
                  <span className="font-mono text-sm" style={{ color: 'var(--color-mist)' }}>WhatsApp</span>
                </a>
              )}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="panel p-7 sm:p-8 space-y-5"
          >
            <div>
              <label className="font-mono text-xs uppercase tracking-wide mb-2 block" style={{ color: 'var(--color-haze)' }}>Name</label>
              <input
                required
                value={form.name}
                onChange={e => set('name', e.target.value)}
                className="input-field"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wide mb-2 block" style={{ color: 'var(--color-haze)' }}>Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                className="input-field"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wide mb-2 block" style={{ color: 'var(--color-haze)' }}>Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={e => set('message', e.target.value)}
                className="input-field resize-none"
                placeholder="What are you working on?"
              />
            </div>

            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center">
              {status === 'sending' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
              ) : status === 'sent' ? (
                <><CheckCircle2 className="w-4 h-4" /> Message sent</>
              ) : (
                <><Send className="w-4 h-4" /> Send message</>
              )}
            </button>

            {status === 'error' && (
              <p className="text-sm text-center" style={{ color: '#F87171' }}>{errorMsg}</p>
            )}
            {status === 'sent' && (
              <p className="text-sm text-center" style={{ color: 'var(--color-haze)' }}>
                Thanks for reaching out, I'll get back to you soon.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
