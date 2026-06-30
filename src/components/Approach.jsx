'use client';
import { motion } from 'framer-motion';
import { APPROACH } from '@/data/profile';

export default function Approach() {
  return (
    <section id="approach" className="py-24 sm:py-32 relative" style={{ background: 'var(--color-surface)' }}>
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-3">How the work gets done</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium" style={{ color: 'var(--color-mist)' }}>
            Four things that show up in every project.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {APPROACH.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="panel p-7"
            >
              <h3 className="font-display text-lg font-medium mb-2.5" style={{ color: 'var(--color-amber)' }}>
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-haze)' }}>
                {a.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
