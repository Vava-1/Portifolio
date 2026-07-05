'use client';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import TopoBackground from './TopoBackground';
import AIChat from './AIChat';
import { PROFILE } from '@/data/profile';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      <TopoBackground />

      <div className="section relative z-10 w-full">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">

          {/* Left: intro copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#34D399' }} />
              <p className="eyebrow">Available for new work · {PROFILE.location}</p>
            </div>

            <h1 className="font-display text-[2.6rem] leading-[1.08] sm:text-6xl sm:leading-[1.05] font-medium mb-6" style={{ color: 'var(--color-mist)' }}>
              <span className="italic text-gradient">Self-made</span> AI engineer<br />
              building software that<br />
              actually ships and runs.
            </h1>

            <p className="text-base sm:text-lg leading-relaxed max-w-lg mb-8" style={{ color: 'var(--color-haze)' }}>
              {PROFILE.tagline} Founder of GIVA TECH, building e-commerce platforms,
              multi-agent AI systems, and production software for Rwanda, East Africa, and beyond.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#work" className="btn-primary">See the work</a>
              <a href="#contact" className="btn-outline">Get in touch</a>
            </div>

            <div className="flex items-center gap-6 mt-12 pt-8 border-t" style={{ borderColor: 'var(--color-line)' }}>
              {[['13+', 'production platforms shipped'], ['7', 'industries served'], ['1', 'AI assistant answering this question right now']].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl" style={{ color: 'var(--color-amber)' }}>{n}</p>
                  <p className="text-xs mt-1 max-w-[8rem] leading-snug" style={{ color: 'var(--color-haze)' }}>{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: live AI chat */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
          >
            <AIChat />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#work"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 z-10"
        style={{ color: 'var(--color-haze)' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </motion.a>
    </section>
  );
}
