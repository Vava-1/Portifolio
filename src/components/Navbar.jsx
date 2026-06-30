'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '@/data/profile';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#approach', label: 'Approach' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled && !open ? 'rgba(11,14,20,0.85)' : open ? '#0B0E14' : 'transparent',
          backdropFilter: scrolled && !open ? 'blur(12px)' : 'none',
          borderBottom: scrolled || open ? '1px solid var(--color-line)' : '1px solid transparent',
        }}
      >
        <nav className="section flex items-center justify-between h-16 md:h-20">
          <a href="#top" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-semibold transition-transform group-hover:scale-105"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-line)', color: 'var(--color-amber)' }}
            >
              {PROFILE.initials}
            </span>
            <span className="font-display text-base font-medium hidden sm:block" style={{ color: 'var(--color-mist)' }}>
              {PROFILE.name}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-xs tracking-wide uppercase px-4 py-2 rounded-lg transition-colors"
                style={{ color: 'var(--color-haze)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-mist)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-haze)'}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary ml-3 py-2.5 px-5 text-xs">Start a project</a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg relative z-10"
            style={{ color: 'var(--color-mist)' }}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Full-screen overlay, separate from the header so it can never be
          partially transparent or leave a gap for page content to bleed through */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col px-5 pt-24 pb-8"
          style={{ background: '#0B0E14' }}
        >
          <div className="flex flex-col gap-1">
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-base py-3.5 uppercase tracking-wide border-b"
                style={{ color: 'var(--color-haze)', borderColor: 'var(--color-line)' }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-8 justify-center">
            Start a project
          </a>
        </div>
      )}
    </>
  );
}
