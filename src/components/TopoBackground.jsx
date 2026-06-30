'use client';
import { motion } from 'framer-motion';

// Generates a set of smooth, hill-like contour paths reminiscent of
// topographic survey lines over Rwanda's terrain. Each line is drawn once
// on load, then drifts slowly and ambiently forever after, doubling as a
// loose neural/graph motif without being a literal cliche wireframe globe.
function generateContourPath(seed, amplitude, yOffset) {
  const points = [];
  const segments = 8;
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * 1200;
    const wave = Math.sin(i * 0.9 + seed) * amplitude + Math.sin(i * 1.7 + seed * 2) * (amplitude * 0.4);
    points.push([x, yOffset + wave]);
  }
  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` Q ${cx},${y0} ${x1},${y1}`;
  }
  return d;
}

const LINES = Array.from({ length: 9 }).map((_, i) => ({
  d: generateContourPath(i * 1.3, 26 - i * 1.5, 90 + i * 60),
  color: i % 3 === 0 ? 'var(--color-amber)' : 'var(--color-violet)',
  opacity: 0.12 + (i % 4) * 0.03,
  duration: 22 + i * 4,
}));

export default function TopoBackground({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="topoFade" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.15" />
          </radialGradient>
          <mask id="topoMask">
            <rect width="1200" height="700" fill="url(#topoFade)" />
          </mask>
        </defs>
        <g mask="url(#topoMask)">
          {LINES.map((line, i) => (
            <motion.path
              key={i}
              d={line.d}
              fill="none"
              stroke={line.color}
              strokeWidth="1"
              strokeOpacity={line.opacity}
              initial={{ pathLength: 0, x: 0 }}
              animate={{ pathLength: 1, x: [0, 14, 0] }}
              transition={{
                pathLength: { duration: 2.4, delay: i * 0.08, ease: 'easeOut' },
                x: { duration: line.duration, repeat: Infinity, ease: 'easeInOut', delay: 1 },
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
