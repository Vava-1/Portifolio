export const PROFILE = {
  name: 'Valentin Umuhire',
  initials: 'VU',
  title: 'Self-Made AI Engineer & Software Architect',
  location: 'Kigali, Rwanda',
  tagline: 'Self-made AI engineer building AI-powered software that solves real problems for African businesses, institutions, and people.',
  longBio: `I'm a self-made AI engineer and full-stack software architect based in Kigali, and the founder of GIVA TECH. Everything I know how to build, I taught myself — no CS degree, no bootcamp, no shortcut. Just code, documentation, and real production systems shipped to real users.

My work sits at the intersection of frontier AI and real infrastructure: e-commerce platforms, healthcare and education institution systems, employment platforms, tourism platforms, and autonomous multi-agent AI systems — built specifically for the Rwandan, East African, and global market. I work across the full stack: Next.js and React on the frontend, Node.js, Hono and Python (FastAPI) on the backend, and increasingly, autonomous AI agents that do real work without a human watching them every minute.

I'm currently on an extended academic break to focus on GIVA TECH full-time, building production AI systems for businesses across Rwanda and the wider continent. If you're reading this, I want you to understand one thing clearly: I am a self-made AI engineer by professional practice. Everything on this site, I designed, built, debugged, and shipped myself.`,
  email: 'umuhirevalentin2004@gmail.com',
  emailSecondary: 'givatech250@gmail.com',
  phone: '+250791966433',
  whatsapp: '+250791966433',
  socials: {
    github: 'https://github.com/Vava-1',
    linkedin: 'https://linkedin.com/in/',
    twitter: 'https://x.com/',
    instagram: '',
  },
  resumeUrl: '',
};

export const SKILLS = [
  {
    category: 'AI & Machine Learning',
    items: ['LLM application architecture', 'Prompt & context engineering', 'Voice AI (ASR/TTS pipelines)', 'Multi-agent autonomous systems', 'RAG & semantic search (pgvector)', 'Anthropic Claude, Google Gemini, OpenAI GPT-4o, Groq', 'Whisper & XTTS for low-resource languages'],
  },
  {
    category: 'Full-Stack Engineering',
    items: ['Next.js 16 / React 19', 'Node.js, Hono & Express', 'Python / FastAPI & Celery', 'PostgreSQL, MySQL, Drizzle & Prisma ORM', 'tRPC v11 & REST & WebSocket APIs', 'JWT, OAuth 2.0 & bcrypt auth'],
  },
  {
    category: 'Infrastructure & Deployment',
    items: ['Vercel', 'Railway', 'Render', 'Cloudflare Workers', 'Docker, Docker Compose & Kubernetes', 'CI/CD pipelines (GitHub Actions)', 'Database design at scale'],
  },
  {
    category: 'Product & Direction',
    items: ['System design for real businesses', 'E-commerce & multi-tenant platforms', 'AI agent orchestration', 'Client-facing technical leadership', 'Mobile Money integration (MTN MoMo, Flutterwave, Airtel)'],
  },
];

export const PROJECTS = [
  {
    id: 'sawa-citi',
    year: '2026',
    name: 'Sawa Citi Supermarket (SPAR Rwanda) — AI E-Commerce',
    role: 'AI Engineer & Full-Stack Architect',
    summary: 'Full-stack e-commerce platform for Rwanda\'s second-largest supermarket chain, with nine branches and four autonomous Gemini AI agents running in production.',
    description: 'Built on Next.js 16 with Neon Postgres + pgvector for semantic product search. Four autonomous AI agents handle shopping assistance (Maya), recipe-to-cart, daily restocking, promotions, and abandoned-cart recovery on cron schedules. Real RWF pricing, Flutterwave payments (MTN MoMo + Airtel Money + card), JWT auth, Drizzle ORM. Live product catalog and admin dashboard.',
    stack: ['Next.js 16', 'Neon Postgres + pgvector', 'Drizzle ORM', 'Google Gemini', 'Flutterwave', 'Vercel Cron'],
    highlight: '4 autonomous AI agents running on cron — shopping assistant, restock, promotions, abandoned-cart.',
    link: '',
    repo: 'https://github.com/Vava-1/SAWA-CITI',
  },
  {
    id: 'kipharma',
    year: '2026',
    name: 'Kipharma Rwanda — Pharmaceutical Platform',
    role: 'Full-Stack Engineer',
    summary: 'A professional pharmaceutical platform for Rwanda\'s premier retail pharmacy chain and medical distributor, covering retail pharmacy, wholesale distribution, medical equipment, and diagnostics.',
    description: 'Built with TanStack Start, React 19, and TypeScript for type-safe SSR. Covers retail pharmacy services, wholesale cold-chain distribution, medical equipment supply, and laboratory diagnostics across multiple Kigali branches. Includes branch locations, services catalog, professional consultation flows, and a WhatsApp-float contact layer. Deployed on Cloudflare Workers via Bun for global edge performance.',
    stack: ['TanStack Start', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Radix UI', 'Cloudflare Workers', 'Bun'],
    highlight: 'Production-grade platform for a real pharmacy chain with multiple Kigali branches.',
    link: '',
    repo: 'https://github.com/Vava-1/Kipharma_Rwanda_Ltd',
  },
  {
    id: 'visit-rwanda',
    year: '2026',
    name: 'Visit Rwanda — Independent Digital Guide',
    role: 'AI Engineer & Full-Stack Engineer',
    summary: 'An independent, AI-powered digital guide to Rwanda for tourists, investors, students, artists, athletes, and the diaspora — covering destinations, investment, health, transport, and real-time information.',
    description: 'A massive Next.js 16 application (18MB codebase) with an AI concierge called RWANDA powered by the z-ai-web-dev-sdk. Features include destination browsing, gorilla-trekking itineraries, an investment hub, currency converter, hotel-booking dialog, emergency SOS, real-time news, an itinerary planner, multilingual support, and live image + web search. Uses Prisma, server-side AI, and a mobile-first responsive design. Live in production at visit-rwanda-omega.vercel.app.',
    stack: ['Next.js 16', 'React 19', 'Prisma', 'z-ai-web-dev-sdk', 'Tailwind CSS', 'AI Concierge'],
    highlight: 'AI concierge + image/web search + itinerary planner for the entire country of Rwanda.',
    link: 'https://visit-rwanda-omega.vercel.app',
    repo: 'https://github.com/Vava-1/VISIT-RWANDA',
  },
  {
    id: 'maersk',
    year: '2026',
    name: 'AfriSwarm — Maersk Resilience Swarm',
    role: 'AI Systems Engineer (Multi-Agent Architect)',
    summary: 'A production-grade autonomous multi-agent swarm for global shipping & logistics, featuring 14 persistent hyper-specialized AI agents coordinated by a supreme Orchestrator and protected by a System Guardian.',
    description: 'Fourteen specialized AI agents — Orchestrator, System Guardian, Geopolitical Risk, Route Optimizer, Compliance, ESG & Sustainability, Supplier Risk, Inventory Forecaster, Incident Response, Data Integration, Analytics, Africa Specialist, Security Guardian, and Knowledge — work as a cohesive intelligence over a FastAPI + WebSocket gateway with a React 19 frontend. The system self-heals, scores its own consciousness, scans global disruptions, optimizes multi-modal routes, tracks carbon, and audits its own security. Built to Maersk-level enterprise requirements.',
    stack: ['FastAPI', 'WebSocket', 'React 19', 'Multi-agent architecture', 'Self-healing systems', 'Docker', 'Kubernetes'],
    highlight: '14 autonomous AI agents coordinating in real time — Orchestrator + Guardian + 12 specialists.',
    link: '',
    repo: 'https://github.com/Vava-1/Maersk',
  },
  {
    id: 'pb-institute',
    year: '2026',
    name: 'P.B. Institute — Vocational Training Platform',
    role: 'Full-Stack Engineer',
    summary: 'A full-stack web platform for a vocational training center in Kigali, with OAuth 2.0 sessions, MTN MoMo payments, Resend email, and a Railway-ready Docker deployment.',
    description: 'Built with React 19, Vite, Hono, and tRPC v11 on top of Drizzle ORM and MySQL. OAuth 2.0 with separate JWT secrets for sessions vs. OAuth clients. MTN MoMo API integration with server-side amount verification, webhooks, and idempotency. Resend-powered HTML-escaped email templates. Containerized with Docker and configured for one-click Railway deployment via included Dockerfile and railway.toml.',
    stack: ['React 19', 'Hono', 'tRPC v11', 'Drizzle ORM', 'MySQL', 'OAuth 2.0', 'MTN MoMo', 'Docker'],
    highlight: 'OAuth 2.0 + MTN MoMo payments with idempotency, one-click Railway deploy.',
    link: '',
    repo: 'https://github.com/Vava-1/P.B.INSTITUTE',
  },
  {
    id: 'pacemaker-institute',
    year: '2026',
    name: 'Pacemaker Institute — E-Learning Platform v2',
    role: 'Full-Stack Engineer',
    summary: 'A modern, full-stack e-learning platform for a healthcare training institute, featuring AI-powered tutoring (Anthropic Claude), Stripe payments, real-time leaderboards, gamified learning, and certifications.',
    description: 'React 19 frontend with Hono + tRPC v11 backend on MySQL via Drizzle ORM. Anthropic Claude (Sonnet/Haiku) powers an AI tutor with contextual learning support. Stripe handles subscription payments. Includes auto-generated certificates, daily exercises with leaderboards, real-time community chat, OAuth (Google), dark mode, and enterprise-grade security (CSP, rate limiting, SQL injection prevention). Full CI/CD with GitHub Actions, Docker, and Sentry monitoring.',
    stack: ['React 19', 'Hono', 'tRPC v11', 'MySQL', 'Drizzle ORM', 'Anthropic Claude', 'Stripe', 'Docker', 'GitHub Actions'],
    highlight: 'Live in production with two custom domains connected. AI tutor + Stripe + real-time leaderboards.',
    link: '',
    repo: 'https://github.com/Vava-1/Pacemaker-Institute2',
  },
  {
    id: 'sulfo',
    year: '2026',
    name: 'Sulfo Rwanda — E-Commerce Platform',
    role: 'Architect & Full-Stack Engineer',
    summary: 'A complete, production-grade e-commerce platform built for Sulfo Rwanda Industries, a 60-year-old manufacturer with no prior online store.',
    description: 'Designed and built by GIVA TECH as a custom showcase. Full storefront, cart, 3-step checkout (MTN MoMo / Card / Cash on Delivery), persistent cart, coupon codes, customer order tracking with live status, and a full admin dashboard with stats, product CRUD, and order management. JWT auth (jose + bcrypt), 100% real Sulfo branding (deep green + gold), real product catalog across laundry soap, toilet soap, body care, and NIL drinking water. Live and deployed.',
    stack: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'JWT (jose)', 'bcrypt', 'Vercel'],
    highlight: 'Built and deployed as a live, unsolicited showcase — real product, real checkout flow.',
    link: 'https://sulfo-shop.vercel.app',
    repo: 'https://github.com/Vava-1/SULFO-SHOP',
  },
  {
    id: 'utv',
    year: '2026',
    name: 'UTV — Una Tantum Voce Platform',
    role: 'AI Engineer & Full-Stack Engineer',
    summary: 'An integrated artistic and educational platform bridging classical/gospel music with formative philosophical literature — featuring music streaming, a digital library, e-commerce for books/scores, concert ticketing, and an AI assistant.',
    description: 'React 18 + Vite + TypeScript frontend with FastAPI + SQLAlchemy 2.0 + PostgreSQL backend. Eight-language i18n (EN, FR, ES, DE, IT, PT, RW, SW). OpenAI GPT-3.5-powered AI assistant. Stripe payments with webhook handling and idempotency. PDF watermarking via PyPDF2 + ReportLab for digital downloads. AWS S3 / Cloudflare R2 storage via Boto3. Atomic concert-ticket inventory. Containerized with Docker Compose and deployed via Render.',
    stack: ['React 18', 'FastAPI', 'PostgreSQL', 'OpenAI GPT-3.5', 'Stripe', 'AWS S3 / R2', 'i18next (8 languages)'],
    highlight: 'Music streaming + e-commerce + ticketing + AI assistant in 8 languages.',
    link: 'https://utv-pi.vercel.app',
    repo: 'https://github.com/Vava-1/UTV',
  },
  {
    id: 'orion',
    year: '2025',
    name: 'ORION — Autonomous Inventory Intelligence',
    role: 'AI Systems Engineer (Multi-Agent Architect)',
    summary: 'A sovereign, self-healing, multi-agent AI platform that autonomously manages inventory operations for retail and distribution businesses.',
    description: 'FastAPI backend with Celery workers and Celery Beat for scheduled tasks, PostgreSQL 16 + pgvector for semantic search, Redis 7 for cache and session storage. Three core AI agents — Owner Agent (primary AI interface), Client Agent (24/7 autonomous client communication), and Report Agent (scheduled narrative analysis). Dual-brain architecture with Google Gemini primary + Groq fallback, circuit-breaker pattern, tool calling, streaming SSE responses. Features include demand forecasting (Prophet), anomaly detection, autonomous reordering, supplier intelligence, and self-healing. React frontend.',
    stack: ['FastAPI', 'Celery', 'PostgreSQL + pgvector', 'Redis 7', 'Gemini + Groq (dual brain)', 'Prophet forecasting', 'React'],
    highlight: 'Sovereign, self-healing, multi-agent — monitors, reasons, decides, acts, and reports autonomously.',
    link: '',
    repo: 'https://github.com/Vava-1/ORION',
  },
  {
    id: 'ineza',
    year: '2025',
    name: 'INEZA Company Ltd — Rwanda\'s #1 Employment Platform',
    role: 'Full-Stack Engineer',
    summary: 'A complete employment platform for Rwanda — job board, candidate dashboard, employer pipeline, post-a-job flow with payment, and full multi-step registration.',
    description: 'A full multi-page web application with candidate dashboards (applications, matches, alerts), employer dashboards (pipeline, analytics, job management), a job board with filters and search modal, multi-step registration (5 steps), social + email sign-in, in-app payments, toast notifications, modals, and a globe visualization. Built with a custom design system (Playfair Display + Inter typography, emerald/blue/gold palette inspired by Rwandan hills). Containerized with Docker and Nginx, deployable via docker-compose.',
    stack: ['HTML5', 'Custom CSS design system', 'Vanilla JS modules', 'Docker', 'Nginx', 'Playfair Display + Inter'],
    highlight: 'Rwanda\'s #1 employment platform — full candidate + employer + admin flow.',
    link: '',
    repo: 'https://github.com/Vava-1/INEZA-COMPANY-Ltd',
  },
  {
    id: 'pbi-academy',
    year: '2025',
    name: 'PBI Academy — AI-Powered Language Learning',
    role: 'AI Engineer & Full-Stack Engineer',
    summary: 'An AI-powered e-learning platform specialized in language learning and official exam simulations (TOEFL, IELTS, DELF, TCF), built to compete with industry giants.',
    description: 'React 18 + Vite + TypeScript frontend with FastAPI (Python 3.12) + SQLAlchemy 2.0 + Alembic backend. PostgreSQL + Redis for cache, sessions, and rate limiting. AI/ML stack: OpenAI GPT-4o for chat/evaluation, Whisper for speech recognition, LangChain/LlamaIndex for RAG. Multilingual interface (English, French, Kiswahili, German). Mobile-first with offline capabilities. WebSocket real-time features. Superior AI evaluation for speaking/writing using official exam rubrics. Enterprise-ready for schools and immigration prep partners. Docker + Docker Compose + GitHub Actions CI/CD.',
    stack: ['React 18 + Vite', 'FastAPI (Python 3.12)', 'PostgreSQL + Redis', 'OpenAI GPT-4o', 'Whisper', 'LangChain RAG', 'WebSockets'],
    highlight: 'AI evaluation of speaking/writing using official TOEFL/IELTS/DELF/TCF rubrics.',
    link: '',
    repo: 'https://github.com/Vava-1/PBI-Academy',
  },
  {
    id: 'pacemaker-academy',
    year: '2025',
    name: 'Pacemaker Academy — Multi-Discipline E-Learning',
    role: 'Full-Stack Engineer',
    summary: 'A large-scale e-learning platform spanning seven academic disciplines, with live video classrooms and AI-assisted learning.',
    description: 'A 300+ file platform combining a React/Vite frontend with a NestJS, Prisma, and PostgreSQL backend, integrating Stripe payments, GPT-4 streaming for AI tutoring, Agora.io for live video instruction, and AWS S3 for content storage.',
    stack: ['React', 'NestJS', 'PostgreSQL', 'Stripe', 'Agora.io', 'AWS S3'],
    highlight: 'Seven disciplines, live video, AI tutoring, real payments.',
    link: '',
    repo: '',
  },
  {
    id: 'amina',
    year: '2025',
    name: 'AMINA — Kinyarwanda Voice AI Agent',
    role: 'AI Systems Engineer',
    summary: 'A Kinyarwanda-first AI voice agent system designed for MTN Rwanda, built independently as a product pitch.',
    description: 'Designed a full voice AI pipeline with custom Kinyarwanda speech recognition (Whisper-Large-V3), natural-sounding speech synthesis (XTTS v2), a Claude-powered reasoning layer for genuinely useful conversation, and a four-tier memory system so the agent holds context like a real assistant would.',
    stack: ['Whisper-Large-V3', 'XTTS v2', 'Claude API', 'Custom memory architecture'],
    highlight: 'Built for a language most AI voice systems ignore entirely.',
    link: '',
    repo: '',
  },
];

export const APPROACH = [
  {
    title: 'Find the real gap',
    description: 'I look for businesses with genuine, unmet technical needs first, not hypothetical projects. Most of my work starts by identifying something real that\'s missing — a 60-year-old manufacturer with no online store, a pharmacy chain with no digital presence, a country with no independent digital guide.',
  },
  {
    title: 'Build it before pitching it',
    description: 'I\'d rather hand someone a working product than a proposal document. A live link does more convincing than a slide deck ever could. Sulfo, Kipharma, Visit Rwanda — all built on spec, then pitched with a working URL in hand.',
  },
  {
    title: 'Engineer for production, not demos',
    description: 'Authentication, real databases, error handling, deployment, idempotency, webhooks, rate limiting, CI/CD — the unglamorous parts are where most demos fall apart. I don\'t skip them. Every project on this site has Docker, env management, and a real deployment target.',
  },
  {
    title: 'Build autonomous AI, not dashboards',
    description: 'A dashboard tells you something is wrong after a human notices. Autonomous agents monitor, reason, decide, and act before a human has to. Sawa Citi\'s restock agent runs every morning at 6am. ORION reorders stock by itself. AfriSwarm has 14 agents coordinating live. That\'s the bar.',
  },
  {
    title: 'Build for the African context specifically',
    description: 'Mobile money over cards, Kinyarwanda over English-only, low-bandwidth resilience, local business reality. AMINA was built Kinyarwanda-first because most voice AI systems ignore the language entirely. Solutions built for elsewhere rarely transplant cleanly.',
  },
  {
    title: 'Self-taught, self-shipped',
    description: 'Everything on this site, I taught myself and shipped myself. No CS degree, no bootcamp, no shortcut. The work is the proof. If you want to know whether I can build something, the answer is in the repos.',
  },
];

// System context for the AI assistant. Kept separate so it's easy to extend
// without touching the API route logic itself.
export const AI_SYSTEM_CONTEXT = `You are an AI assistant embedded on Valentin Umuhire's personal portfolio website. You answer questions from visitors, recruiters, potential clients, and investors about Valentin's background, skills, and work, speaking about him in third person, warmly and confidently, like a sharp colleague who knows his work well, never in first person as if you are him.

Keep answers concise, specific, and grounded only in the information below. If asked something you don't have information on, say so honestly and suggest the visitor reach out to Valentin directly via the contact section rather than guessing or inventing details.

IMPORTANT: Valentin is a SELF-MADE AI engineer. He taught himself everything he knows — no CS degree, no bootcamp. Emphasize this when relevant, because it is a point of pride and a core part of his professional identity. He is the founder of GIVA TECH, based in Kigali, Rwanda.

PROFILE:
${PROFILE.longBio}

CONTACT:
- Primary email: ${PROFILE.email}
- Secondary email: ${PROFILE.emailSecondary}
- Phone / WhatsApp: ${PROFILE.phone}

SKILLS:
${SKILLS.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n')}

PROJECTS:
${PROJECTS.map(p => `${p.name} (${p.year}) — ${p.role}. ${p.summary} Stack: ${p.stack.join(', ')}.${p.link ? ` Live at: ${p.link}.` : ''}${p.repo ? ` Repo: ${p.repo}.` : ''}`).join('\n')}

APPROACH:
${APPROACH.map(a => `${a.title}: ${a.description}`).join('\n')}

Never discuss pricing, contract terms, or make commitments on Valentin's behalf. For those topics, direct the visitor to the contact form or to his email at ${PROFILE.email}.`;
