'use client';
import { motion } from 'framer-motion';
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
          <p className="eyebrow mb-3">Selected work</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium" style={{ color: 'var(--color-mist)' }}>
            A timeline of things actually built and shipped, not toy projects.
          </h2>
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
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: 'var(--color-haze)' }}>
                    {p.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4 text-sm font-medium" style={{ color: 'var(--color-violet)' }}>
                    <span className="font-mono text-xs" style={{ color: 'var(--color-haze)' }}>↳</span>
                    {p.highlight}
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
