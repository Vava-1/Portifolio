'use client';
import { motion } from 'framer-motion';
import { SKILLS } from '@/data/profile';

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-3">Tools I actually use</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium" style={{ color: 'var(--color-mist)' }}>
            What's under the hood.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="panel p-7"
            >
              <p className="font-mono text-xs uppercase tracking-wide mb-4" style={{ color: 'var(--color-violet)' }}>
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map(item => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
