export const PROFILE = {
  name: 'Valentin Umuhire',
  initials: 'VU',
  title: 'AI Engineer & Software Architect',
  location: 'Kigali, Rwanda',
  tagline: 'I build AI-powered software that solves real problems for African businesses, institutions, and people.',
  longBio: `I'm an AI Solution Architect and full-stack engineer based in Kigali, founder of GIVA TECH. My work sits at the intersection of frontier AI and real infrastructure: e-commerce platforms, healthcare institution systems, e-learning platforms, and voice AI agents built specifically for the Rwandan and East African market.

I care less about building demos and more about building things that actually run in production, serve real users, and hold up under real traffic. I work across the full stack: Next.js and React on the frontend, Node.js and Python on the backend, and increasingly, autonomous AI agents that do real work without a human watching them every minute.

I'm currently on an extended academic break to focus on GIVA TECH full-time, building production AI systems for businesses across Rwanda and the wider continent.`,
  email: 'hello@givatech.rw',
  phone: '',
  whatsapp: '',
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
    twitter: 'https://x.com/',
    instagram: '',
  },
  resumeUrl: '',
};

export const SKILLS = [
  {
    category: 'AI & Machine Learning',
    items: ['LLM application architecture', 'Prompt & context engineering', 'Voice AI (ASR/TTS pipelines)', 'AI agent design', 'RAG & semantic search', 'Anthropic Claude & Google Gemini APIs'],
  },
  {
    category: 'Full-Stack Engineering',
    items: ['Next.js / React', 'Node.js & Express', 'Python / FastAPI', 'PostgreSQL & Prisma', 'REST & real-time APIs', 'JWT auth & secure systems'],
  },
  {
    category: 'Infrastructure & Deployment',
    items: ['Vercel', 'Railway', 'Render', 'CI/CD pipelines', 'Database design at scale', 'Performance optimization'],
  },
  {
    category: 'Product & Direction',
    items: ['System design for real businesses', 'E-commerce architecture', 'Multi-tenant platform design', 'Client-facing technical leadership'],
  },
];

export const PROJECTS = [
  {
    id: 'sulfo',
    year: '2026',
    name: 'Sulfo Rwanda E-Commerce Platform',
    role: 'Architect & Full-Stack Engineer',
    summary: 'A complete, production-grade e-commerce platform built for Sulfo Rwanda Industries, a 60-year-old manufacturer with no prior online store.',
    description: 'Designed and built a full storefront, cart, checkout, and admin system from scratch, seeded with Sulfo\'s real product catalog across 10 categories. Built as a live, working showcase to demonstrate exactly what Sulfo\'s online presence could look like, deployed and demoed before any contract was signed.',
    stack: ['Next.js', 'Tailwind CSS', 'JWT Auth', 'Vercel'],
    highlight: 'Built and deployed as a live, unsolicited showcase, real product, real checkout flow.',
    link: '',
  },
  {
    id: 'pacemaker-institute',
    year: '2026',
    name: 'Pacemaker Institute',
    role: 'Full-Stack Engineer',
    summary: 'Institutional website and systems for a healthcare training institute, built on a production MySQL and tRPC stack.',
    description: 'Built the full institutional web presence including authentication, content management, and a leaderboard system, debugged through real production deployment challenges on Railway, and connected two custom domains for the live institution.',
    stack: ['Next.js', 'MySQL', 'Drizzle ORM', 'tRPC', 'NextAuth.js'],
    highlight: 'Live in production with two custom domains connected.',
    link: '',
  },
  {
    id: 'pacemaker-academy',
    year: '2025',
    name: 'Pacemaker Academy',
    role: 'Full-Stack Engineer',
    summary: 'A large-scale e-learning platform spanning seven academic disciplines, with live video classrooms and AI-assisted learning.',
    description: 'A 300+ file platform combining a React/Vite frontend with a NestJS, Prisma, and PostgreSQL backend, integrating Stripe payments, GPT-4 streaming for AI tutoring, Agora.io for live video instruction, and AWS S3 for content storage.',
    stack: ['React', 'NestJS', 'PostgreSQL', 'Stripe', 'Agora.io', 'AWS S3'],
    highlight: 'Seven disciplines, live video, AI tutoring, real payments.',
    link: '',
  },
  {
    id: 'amina',
    year: '2025',
    name: 'AMINA Voice AI Agent',
    role: 'AI Systems Engineer',
    summary: 'A Kinyarwanda-first AI voice agent system designed for MTN Rwanda, built independently as a product pitch.',
    description: 'Designed a full voice AI pipeline with custom Kinyarwanda speech recognition (Whisper-Large-V3), natural-sounding speech synthesis (XTTS v2), a Claude-powered reasoning layer for genuinely useful conversation, and a four-tier memory system so the agent holds context like a real assistant would.',
    stack: ['Whisper-Large-V3', 'XTTS v2', 'Claude API', 'Custom memory architecture'],
    highlight: 'Built for a language most AI voice systems ignore entirely.',
    link: '',
  },
  {
    id: 'orion',
    year: '2025',
    name: 'ORION Inventory Intelligence',
    role: 'AI Systems Engineer',
    summary: 'An autonomous, multi-agent inventory intelligence platform for retail and distribution businesses.',
    description: 'A FastAPI and Celery-based system using pgvector for semantic search and dual AI engines working in tandem to forecast stock needs, flag anomalies, and recommend action, without a human needing to notice the problem first.',
    stack: ['FastAPI', 'Celery', 'pgvector', 'Multi-agent architecture'],
    highlight: 'Autonomous agents that monitor and act, not just dashboards.',
    link: '',
  },
  {
    id: 'kipharma',
    year: '2025',
    name: 'Kipharma Demo',
    role: 'Full-Stack Engineer',
    summary: 'An unsolicited demo website built and pitched directly to a Rwandan pharmacy chain.',
    description: 'Same playbook as the Sulfo project: identify a real Rwandan business with no functional online presence, build a working demo on spec, and pitch it directly with a live link in hand.',
    stack: ['Next.js', 'Render'],
    highlight: 'Built on spec, pitched directly, no brief required.',
    link: '',
  },
];

export const APPROACH = [
  {
    title: 'Find the real gap',
    description: 'I look for businesses with genuine, unmet technical needs first, not hypothetical projects. Most of my work starts by identifying something real that\'s missing.',
  },
  {
    title: 'Build it before pitching it',
    description: 'I\'d rather hand someone a working product than a proposal document. A live link does more convincing than a slide deck ever could.',
  },
  {
    title: 'Engineer for production, not demos',
    description: 'Authentication, real databases, error handling, deployment, the unglamorous parts are where most demos fall apart. I don\'t skip them.',
  },
  {
    title: 'Build for the African context specifically',
    description: 'Mobile money over cards, Kinyarwanda over English-only, low-bandwidth resilience, local business reality. Solutions built for elsewhere rarely transplant cleanly.',
  },
];

// System context for the AI assistant. Kept separate so it's easy to extend
// without touching the API route logic itself.
export const AI_SYSTEM_CONTEXT = `You are an AI assistant embedded on Valentin Umuhire's personal portfolio website. You answer questions from visitors, recruiters, potential clients, and investors about Valentin's background, skills, and work, speaking about him in third person, warmly and confidently, like a sharp colleague who knows his work well, never in first person as if you are him.

Keep answers concise, specific, and grounded only in the information below. If asked something you don't have information on, say so honestly and suggest the visitor reach out to Valentin directly via the contact section rather than guessing or inventing details.

PROFILE:
${PROFILE.longBio}

SKILLS:
${SKILLS.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n')}

PROJECTS:
${PROJECTS.map(p => `${p.name} (${p.year}) — ${p.role}. ${p.summary} Stack: ${p.stack.join(', ')}.`).join('\n')}

APPROACH:
${APPROACH.map(a => `${a.title}: ${a.description}`).join('\n')}

Never discuss pricing, contract terms, or make commitments on Valentin's behalf. For those topics, direct the visitor to the contact form.`;
