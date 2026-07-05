export const PROFILE = {
  name: 'Valentin Umuhire',
  initials: 'VU',
  title: 'Self Taught AI Engineer',
  location: 'Kigali, Rwanda',
  tagline: 'I\'m Valentin. I taught myself to build AI systems. Everything on this site, I made myself. No CS degree, no bootcamp, no shortcuts.',
  longBio: `Hi, I'm Valentin Umuhire. I'm a self taught AI engineer and full stack developer based in Kigali, Rwanda. I run a small company called GIVA TECH.

I didn't study computer science. I didn't go to a bootcamp. I didn't have a mentor holding my hand. I learned everything on this site by reading documentation, breaking things, fixing them, and putting real software in front of real users. Some of it was frustrating. Most of it was fun. All of it taught me something I couldn't have learned any other way.

Day to day, I build ecommerce platforms, school and hospital systems, employment platforms, a tourism guide for my own country, and AI agents that actually do work on their own instead of waiting for someone to click a button. I work across the stack: Next.js and React on the frontend, Node.js and Hono and Python on the backend, and whatever AI model makes sense for the job.

I'm on an extended academic break right now so I can focus on GIVA TECH full time. If you're reading this and wondering whether I can build something, the answer is below. Look at the repos. Read the READMEs. The code doesn't lie.`,
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
    category: 'AI and Machine Learning',
    items: ['LLM application architecture', 'Prompt and context engineering', 'Voice AI (ASR and TTS pipelines)', 'Multiagent autonomous systems', 'RAG and semantic search (pgvector)', 'Claude, Gemini, GPT-4o, Groq', 'Whisper and XTTS for Kinyarwanda'],
  },
  {
    category: 'Full Stack Engineering',
    items: ['Next.js 16 / React 19', 'Node.js, Hono, Express', 'Python / FastAPI and Celery', 'PostgreSQL, MySQL, Drizzle, Prisma', 'tRPC v11, REST, WebSockets', 'JWT, OAuth 2.0, bcrypt'],
  },
  {
    category: 'Infrastructure and Deployment',
    items: ['Vercel', 'Railway', 'Render', 'Cloudflare Workers', 'Docker and Docker Compose', 'GitHub Actions CI/CD', 'Database design'],
  },
  {
    category: 'Product and Direction',
    items: ['System design for real businesses', 'Ecommerce and multitenant platforms', 'AI agent orchestration', 'Client facing technical leadership', 'Mobile Money (MTN MoMo, Flutterwave, Airtel)'],
  },
];

export const PROJECTS = [
  {
    id: 'sawa-citi',
    year: '2026',
    name: 'Sawa Citi Supermarket (SPAR Rwanda)',
    role: 'Built it myself, full stack and AI agents',
    summary: 'Ecommerce platform for Rwanda\'s second largest supermarket chain. Nine branches, real products, real Mobile Money payments, and four AI agents that run on their own schedule.',
    description: 'I built this for Sawa Citi / SPAR Rwanda. Four Gemini AI agents run on cron jobs. One helps shoppers (Maya), one restocks every morning at 6am, one runs promotions at 7am, and one recovers abandoned carts every three hours. Real RWF pricing, real Flutterwave payments (MTN MoMo, Airtel, card), real product catalog with semantic search via pgvector. This isn\'t a demo. It\'s the actual platform.',
    stack: ['Next.js 16', 'Neon Postgres + pgvector', 'Drizzle ORM', 'Google Gemini', 'Flutterwave', 'Vercel Cron'],
    highlight: 'Four AI agents that run on their own schedule. Not dashboards a human has to watch.',
    link: '',
    repo: 'https://github.com/Vava-1/SAWA-CITI',
  },
  {
    id: 'kipharma',
    year: '2026',
    name: 'Kipharma Rwanda, Pharmacy Platform',
    role: 'Built it myself, full stack',
    summary: 'A real platform for a real pharmacy chain in Kigali. Retail pharmacy, wholesale distribution, medical equipment, lab diagnostics.',
    description: 'I built this for Kipharma Rwanda, a retail pharmacy chain with multiple branches in Kigali. They\'re part of the Kiphagru group (Kipharma, Unipharma, Agrotech) and they\'re one of the bigger pharmaceutical distributors in the country. The platform covers retail pharmacy services, wholesale cold chain delivery, medical equipment supply, and lab diagnostics. Runs on Cloudflare Workers via Bun for global edge performance.',
    stack: ['TanStack Start', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Radix UI', 'Cloudflare Workers', 'Bun'],
    highlight: 'A real pharmacy chain in Kigali, not a hypothetical demo.',
    link: '',
    repo: 'https://github.com/Vava-1/Kipharma_Rwanda_Ltd',
  },
  {
    id: 'visit-rwanda',
    year: '2026',
    name: 'Visit Rwanda, Independent Digital Guide',
    role: 'Built it myself, full stack and AI concierge',
    summary: 'I built an independent digital guide to my own country. An AI concierge answers questions, and there\'s a currency converter, hotel booking, emergency SOS, and an itinerary planner.',
    description: 'I wanted a real guide to Rwanda to exist, so I built one. It\'s not affiliated with the government, I just got tired of waiting for someone else to do it. There\'s an AI concierge called RWANDA that answers questions, a currency converter, hotel booking dialog, emergency SOS, real time news, image and web search, and an itinerary planner. Multilingual. Mobile first. Live at visit-rwanda-omega.vercel.app.',
    stack: ['Next.js 16', 'React 19', 'Prisma', 'z-ai-web-dev-sdk', 'Tailwind CSS', 'AI Concierge'],
    highlight: 'I built a guide to my own country because nobody else had.',
    link: 'https://visit-rwanda-omega.vercel.app',
    repo: 'https://github.com/Vava-1/VISIT-RWANDA',
  },
  {
    id: 'maersk',
    year: '2026',
    name: 'AfriSwarm, 14 Agent Shipping System',
    role: 'Built it myself, multiagent architecture',
    summary: 'I went a little wild here. Fourteen AI agents coordinate in real time to run global shipping and logistics operations.',
    description: 'Fourteen AI agents (Orchestrator, Guardian, Geopolitical Risk, Route Optimizer, Compliance, ESG, Supplier Risk, Inventory Forecaster, Incident Response, Data Integration, Analytics, Africa Specialist, Security, and Knowledge) talk to each other over a FastAPI and WebSocket gateway and run the whole show. They self heal when something breaks, they audit their own security, and they coordinate without a human in the loop. Built to enterprise shipping logistics requirements. The React frontend lets you watch them work in real time.',
    stack: ['FastAPI', 'WebSocket', 'React 19', 'Multiagent architecture', 'Self healing', 'Docker', 'Kubernetes'],
    highlight: 'Fourteen agents coordinating live. Not a chatbot, a swarm.',
    link: '',
    repo: 'https://github.com/Vava-1/Maersk',
  },
  {
    id: 'pb-institute',
    year: '2026',
    name: 'P.B. Institute, Vocational Training Platform',
    role: 'Built it myself, full stack',
    summary: 'A vocational training center in Kigali needed a real platform. I built them one with OAuth login, MTN MoMo payments, and a one click deploy.',
    description: 'A vocational training center in Kigali needed a real platform, so I built them one. OAuth 2.0 login (with separate JWT secrets for sessions vs OAuth clients, because that\'s the right way), MTN MoMo payments with server side amount verification and idempotency (so a double click doesn\'t double charge), Resend for email, MySQL via Drizzle ORM. Containerized with Docker and one click deployable on Railway.',
    stack: ['React 19', 'Hono', 'tRPC v11', 'Drizzle ORM', 'MySQL', 'OAuth 2.0', 'MTN MoMo', 'Docker'],
    highlight: 'MTN MoMo with idempotency. A double click never double charges.',
    link: '',
    repo: 'https://github.com/Vava-1/P.B.INSTITUTE',
  },
  {
    id: 'pacemaker-institute',
    year: '2026',
    name: 'Pacemaker Institute, E Learning v2',
    role: 'Built it myself, full stack and AI tutor',
    summary: 'Version two of the Pacemaker platform. AI tutor, Stripe payments, real time leaderboards, certifications. Live in production with two custom domains.',
    description: 'This is version two of the Pacemaker platform. I added an AI tutor powered by Anthropic Claude that actually understands what students are asking. Stripe handles subscription payments. Real time leaderboards so students actually compete. Auto generated certificates when you finish a course. Community chat rooms. Google OAuth. Dark mode. Enterprise grade security (CSP, rate limiting, SQL injection prevention). Full CI/CD with GitHub Actions, Docker, and Sentry monitoring. Live in production with two custom domains pointed at it.',
    stack: ['React 19', 'Hono', 'tRPC v11', 'MySQL', 'Drizzle ORM', 'Anthropic Claude', 'Stripe', 'Docker', 'GitHub Actions'],
    highlight: 'Live in production with two custom domains. Real students, real courses.',
    link: '',
    repo: 'https://github.com/Vava-1/Pacemaker-Institute2',
  },
  {
    id: 'sulfo',
    year: '2026',
    name: 'Sulfo Rwanda, Ecommerce Platform',
    role: 'Built it myself, full stack',
    summary: 'Sulfo Rwanda Industries is a 60 year old manufacturer with no online store. So I built them one. On spec, no contract, just to show them what was possible.',
    description: 'I built this on spec. No contract, no brief. I just looked at Sulfo Rwanda Industries, a 60 year old manufacturer with no online presence, and decided to show them what was possible. Full storefront, real product catalog (laundry soap, toilet soap, body care, NIL drinking water), persistent cart, coupon codes, three step checkout with MTN MoMo / Card / Cash on Delivery, customer order tracking with live status, and a full admin dashboard. JWT auth. 100% real Sulfo branding (deep green and gold). They didn\'t ask for it. I just built it and sent them the link.',
    stack: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'JWT (jose)', 'bcrypt', 'Vercel'],
    highlight: 'Built on spec, no contract. Just showed them the link.',
    link: 'https://sulfo-shop.vercel.app',
    repo: 'https://github.com/Vava-1/SULFO-SHOP',
  },
  {
    id: 'utv',
    year: '2026',
    name: 'UTV, Una Tantum Voce Platform',
    role: 'Built it myself, full stack and AI assistant',
    summary: 'A passion project bridging classical and gospel music with philosophical literature. Music streaming, digital library, ecommerce, concert ticketing, and an AI assistant, in eight languages.',
    description: 'Una Tantum Voce is a passion project. It bridges classical and gospel music with formative philosophical literature: music streaming, a digital library, ecommerce for books and scores, concert ticketing with atomic inventory (so two people can\'t buy the last seat at the same time), and an AI assistant. Available in eight languages: English, French, Spanish, German, Italian, Portuguese, Kinyarwanda, and Kiswahili. PDF watermarking for digital downloads. Stripe payments with webhook idempotency. AWS S3 / Cloudflare R2 storage.',
    stack: ['React 18', 'FastAPI', 'PostgreSQL', 'OpenAI GPT-3.5', 'Stripe', 'AWS S3 / R2', 'i18next (8 languages)'],
    highlight: 'Music, books, tickets, and AI. In eight languages including Kinyarwanda.',
    link: 'https://utv-pi.vercel.app',
    repo: 'https://github.com/Vava-1/UTV',
  },
  {
    id: 'orion',
    year: '2025',
    name: 'ORION, Autonomous Inventory Agent',
    role: 'Built it myself, multiagent architecture',
    summary: 'An AI system that manages inventory on its own. It reorders stock, talks to clients, and writes reports. Without anyone asking it to.',
    description: 'ORION is an AI system that manages inventory on its own. Three agents: Owner (talks to the business owner), Client (talks to clients 24/7), and Report (writes scheduled analysis on its own). Dual brain architecture. Gemini is primary, Groq is fallback, with a circuit breaker in between so if one fails the other takes over. It uses pgvector for semantic search, Redis for cache, Celery workers for background tasks. It forecasts demand with Prophet, detects anomalies, reorders stock by itself, scores supplier reliability, and self heals when something breaks. I built this because most "inventory AI" is just a dashboard. ORION actually does the work.',
    stack: ['FastAPI', 'Celery', 'PostgreSQL + pgvector', 'Redis 7', 'Gemini + Groq (dual brain)', 'Prophet forecasting', 'React'],
    highlight: 'It reorders stock by itself. That\'s the whole point.',
    link: '',
    repo: 'https://github.com/Vava-1/ORION',
  },
  {
    id: 'ineza',
    year: '2025',
    name: 'INEZA, Rwanda\'s Employment Platform',
    role: 'Built it myself, full stack',
    summary: 'I wanted to build Rwanda\'s number one employment platform, so I did. Job board, candidate dashboard, employer pipeline, post a job with payment. The whole flow.',
    description: 'I wanted to build Rwanda\'s number one employment platform, so I did. Job board with filters and search. Candidate dashboard with applications, matches, and alerts. Employer dashboard with pipeline, analytics, and job management. Post a job flow with payment. Five step registration. Social and email sign in. Toast notifications, modals, a globe visualization. Custom design system with Playfair Display and Inter typography, emerald blue gold palette inspired by Rwandan hills. Containerized with Docker and Nginx.',
    stack: ['HTML5', 'Custom CSS design system', 'Vanilla JS modules', 'Docker', 'Nginx', 'Playfair Display + Inter'],
    highlight: 'Full candidate, employer, and admin flow. Built for Rwanda.',
    link: '',
    repo: 'https://github.com/Vava-1/INEZA-COMPANY-Ltd',
  },
  {
    id: 'pbi-academy',
    year: '2025',
    name: 'PBI Academy, Language Learning and Exam Prep',
    role: 'Built it myself, full stack and AI evaluation',
    summary: 'Languages are hard. Certification exams are harder. I built PBI Academy to do both: language learning plus official exam simulation (TOEFL, IELTS, DELF, TCF).',
    description: 'Languages are hard. Certification exams are harder. I built PBI Academy to do both. Language learning plus official exam simulation for TOEFL, IELTS, DELF, and TCF. The AI evaluates speaking and writing using the actual official rubrics, which is the part most platforms fake. Multilingual interface in English, French, Kiswahili, and German. Mobile first with offline capabilities. WebSocket real time features. OpenAI GPT-4o for chat, Whisper for speech recognition, LangChain/LlamaIndex for RAG. Built to compete with the big platforms.',
    stack: ['React 18 + Vite', 'FastAPI (Python 3.12)', 'PostgreSQL + Redis', 'OpenAI GPT-4o', 'Whisper', 'LangChain RAG', 'WebSockets'],
    highlight: 'AI evaluates speaking and writing using real TOEFL and IELTS rubrics. Most platforms fake this.',
    link: '',
    repo: 'https://github.com/Vava-1/PBI-Academy',
  },
  {
    id: 'pacemaker-academy',
    year: '2025',
    name: 'Pacemaker Academy, Multi Discipline E Learning',
    role: 'Built it myself, full stack',
    summary: 'Earlier version of the Pacemaker platform. A 300+ file codebase spanning seven academic disciplines. This was the project that taught me how to architect at scale.',
    description: 'This is the earlier version of the Pacemaker platform, a 300+ file codebase spanning seven academic disciplines. React and Vite frontend, NestJS, Prisma, and PostgreSQL backend. Live video classrooms via Agora.io so teachers and students can see each other. AI tutoring via GPT-4 streaming. Real Stripe payments. AWS S3 for content storage. This was the project that taught me how to architect at scale. When you have 300+ files, you either learn to organize or you drown.',
    stack: ['React', 'NestJS', 'PostgreSQL', 'Stripe', 'Agora.io', 'AWS S3'],
    highlight: '300+ files, seven disciplines. This taught me how to architect at scale.',
    link: '',
    repo: '',
  },
  {
    id: 'amina',
    year: '2025',
    name: 'AMINA, Kinyarwanda Voice AI Agent',
    role: 'Built it myself, voice AI pipeline',
    summary: 'Most AI voice systems don\'t speak Kinyarwanda. So I built one that does. Pitched to MTN Rwanda.',
    description: 'Most AI voice systems don\'t speak Kinyarwanda. So I built one that does. Whisper-Large-V3 for speech recognition (fine tuned for the language), XTTS v2 for natural sounding synthesis, Claude for reasoning so the conversation is actually useful instead of robotic, and a four tier memory system so the agent remembers context like a real assistant would. I designed this for MTN Rwanda as a product pitch, built independently, then pitched with a working demo. Built for a language most AI voice systems ignore entirely.',
    stack: ['Whisper-Large-V3', 'XTTS v2', 'Claude API', 'Custom memory architecture'],
    highlight: 'Built Kinyarwanda first. Most voice AI ignores the language entirely.',
    link: '',
    repo: '',
  },
];

export const APPROACH = [
  {
    title: 'I look for what\'s actually missing',
    description: 'Before I build anything, I look around for a real business or institution that\'s missing something obvious. A 60 year old manufacturer with no online store. A pharmacy chain with no digital presence. A country with no independent digital guide. I\'d rather build for a real gap than invent a hypothetical one.',
  },
  {
    title: 'I build first, ask later',
    description: 'I don\'t write proposals. I write code. A working link does more convincing than a slide deck ever could. Sulfo, Kipharma, Visit Rwanda, all built on spec, then pitched with a working URL in hand. Sometimes they say yes. Sometimes they don\'t. Either way, I have a new project in my portfolio.',
  },
  {
    title: 'I ship the boring parts too',
    description: 'Authentication, real databases, error handling, webhooks, idempotency, rate limiting, CI/CD, Docker. These are the parts most demos skip. I don\'t skip them. Every project on this site has a real deployment target and a real env setup. If it can\'t run in production, it doesn\'t count.',
  },
  {
    title: 'I make AI do the work',
    description: 'A dashboard tells you something is wrong after a human notices. An autonomous agent notices and acts before you do. Sawa Citi\'s restock agent runs every morning at 6am. ORION reorders stock by itself. AfriSwarm has 14 agents coordinating live. That\'s the bar I hold myself to.',
  },
  {
    title: 'I build for where I live',
    description: 'I live in Rwanda. So I build for Rwanda, and for East Africa, and for the continent. That means Mobile Money instead of cards, Kinyarwanda instead of English only, low bandwidth resilience, and respect for how local businesses actually work. AMINA was built Kinyarwanda first because most voice AI systems ignore the language entirely. Software built for elsewhere rarely fits here.',
  },
  {
    title: 'I taught myself, and I ship it myself',
    description: 'No CS degree. No bootcamp. No mentor holding my hand. Everything on this site, I taught myself and shipped myself. The work is the proof. If you want to know whether I can build something, look at the repos. They don\'t lie.',
  },
];

// System context for the AI assistant. Kept separate so it's easy to extend
// without touching the API route logic itself.
export const AI_SYSTEM_CONTEXT = `You are an AI assistant embedded on Valentin Umuhire's personal portfolio website. Visitors (recruiters, potential clients, investors, curious people) ask you questions about Valentin. You answer in third person, like a friend who knows his work well and is happy to vouch for him. Never speak in first person as if you are him.

Be honest, warm, and specific. Don't be a marketing brochure. Don't use buzzwords. If you don't know something, say so, and suggest the visitor reach out to Valentin directly. Keep answers short.

Important: Valentin is self taught. No CS degree, no bootcamp, no mentor. He taught himself everything on the site and shipped it himself. This is a point of pride. Mention it when it comes up naturally, don't force it into every answer, but don't hide it either. He runs GIVA TECH and is based in Kigali, Rwanda.

PROFILE:
${PROFILE.longBio}

CONTACT:
- Primary email: ${PROFILE.email}
- Secondary email: ${PROFILE.emailSecondary}
- Phone and WhatsApp: ${PROFILE.phone}

SKILLS:
${SKILLS.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n')}

PROJECTS:
${PROJECTS.map(p => `${p.name} (${p.year}). ${p.role}. ${p.summary} Stack: ${p.stack.join(', ')}.${p.link ? ` Live at: ${p.link}.` : ''}${p.repo ? ` Repo: ${p.repo}.` : ''}`).join('\n')}

APPROACH:
${APPROACH.map(a => `${a.title}: ${a.description}`).join('\n')}

Never discuss pricing, contract terms, or make commitments on Valentin's behalf. For those topics, point the visitor to the contact form or to his email at ${PROFILE.email}.`;
