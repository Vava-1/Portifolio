'use client';
import { motion } from 'framer-motion';
import { Code2, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/data/profile';

export default function Work() {
  return (
    <section id="work" className="py-24 sm:py-32 relative">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-3">Things I've built</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium" style={{ color: 'var(--color-mist)' }}>
            Real code, real repos, real users. Not toy projects.
          </h2>
          <p className="text-sm mt-5 leading-relaxed max-w-xl" style={{ color: 'var(--color-haze)' }}>
            Every entry below is something I actually built and shipped myself. Click the code icon to read the source, or the external-link icon to visit the live site when one is deployed.
          </p>
        </motion.div>

        <div className="relative">
          <div className="timeline-line" />
          <div className="space-y-12">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-12"
              >
                <div className="timeline-dot absolute left-0 top-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-violet)' }} />
                </div>

                <div className="panel p-6 sm:p-8 hover:border-violet transition-colors group" style={{ borderColor: 'var(--color-line)' }}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="font-mono text-xs" style={{ color: 'var(--color-amber)' }}>{p.year}</span>
                      <h3 className="font-display text-xl sm:text-2xl mt-1 font-medium" style={{ color: 'var(--color-mist)' }}>
                        {p.name}
                      </h3>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--color-haze)' }}>{p.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View source on GitHub"
                          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                          style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-line)' }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-violet)'}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-line)'}
                        >
                          <Code2 className="w-4 h-4" style={{ color: 'var(--color-haze)' }} />
                        </a>
                      )}
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Visit live site"
                          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                          style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-line)' }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-amber)'}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-line)'}
                        >
                          <ExternalLink className="w-4 h-4" style={{ color: 'var(--color-amber)' }} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: 'var(--color-haze)' }}>
                    {p.description}
                  </p>

                  <div className="flex items-start gap-2 mb-4 text-sm font-medium" style={{ color: 'var(--color-violet)' }}>
                    <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--color-haze)' }}>↳</span>
                    <span>{p.highlight}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {p.stack.map(s => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
