# Valentin Umuhire — Personal Portfolio

A personal portfolio site built around a live AI assistant trained on Valentin's real background, projects, and skills, instead of a static "About Me" page.

## Design direction

Dark, deep indigo-black base (not flat black) with two accent colors doing different jobs: warm amber representing the human/Rwandan side of the work, cool violet representing the AI/algorithmic side. Typography pairs a warm serif (Fraunces) for headlines against a precise monospace (JetBrains Mono) for labels and data, body text in Inter. The signature visual element is a slowly drifting topographic line pattern in the hero, evoking Rwanda's hills while doubling as a loose neural-network motif.

## What's actually built

- Live AI assistant in the hero, powered by Google Gemini's free tier (not Anthropic, which has no free API tier as of this build, confirmed via live pricing search), grounded only in real profile data so it won't invent answers
- Full conversation UI: message history, typing indicator, suggestion chips, graceful "not configured yet" fallback when no API key is present
- Working contact form: uses Resend if configured, otherwise falls back to opening the visitor's own email client with the message pre-filled, so it's never broken even with zero setup
- Project timeline (legitimate chronological structure, not decorative numbering)
- Rate limiting on the chat API (8 requests/minute per IP) to keep free-tier usage safe from abuse
- Full keyboard accessibility: visible focus rings, skip-to-content link, reduced-motion support
- Tested responsive at 375px, 768px, 1024px, and 1440px

## Setup

```bash
npm install
npm run dev
```

To activate the AI assistant: get a free key at https://aistudio.google.com/apikey (no credit card required), then set `GEMINI_API_KEY` in your environment.

To activate real contact form email delivery: get a free key at https://resend.com, then set `RESEND_API_KEY`. Without it, the form still works, it just opens the visitor's email client instead.

## Content that still needs your input

Everything in `src/data/profile.js` is a working draft based on what's known from past conversations. Before going live, replace:

- `email` and any phone/WhatsApp fields with your real contact details
- `socials` links (GitHub, LinkedIn, X) with your actual profile URLs
- `resumeUrl` if you want a downloadable CV
- Project `link` fields with live URLs for any projects you want directly clickable
- Confirm which projects are actually public-facing (client confidentiality may apply to some)

## Deploy to Vercel

Push to GitHub, import into Vercel, add `GEMINI_API_KEY` (and optionally `RESEND_API_KEY`) as environment variables, deploy. No database, no other infrastructure needed.
