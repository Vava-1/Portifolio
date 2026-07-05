import './globals.css';
import { PROFILE } from '@/data/profile';

export const metadata = {
  title: { default: `${PROFILE.name} — ${PROFILE.title}`, template: `%s | ${PROFILE.name}` },
  description: PROFILE.tagline,
  keywords: ['Valentin Umuhire', 'Self-Made AI Engineer', 'AI Engineer Rwanda', 'GIVA TECH', 'AI Solution Architect', 'Kigali software engineer', 'Multi-agent AI', 'Next.js developer Rwanda', 'FastAPI engineer Africa'],
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.title}`,
    description: PROFILE.tagline,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
