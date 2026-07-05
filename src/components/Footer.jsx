import { PROFILE } from '@/data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-10 border-t" style={{ borderColor: 'var(--color-line)' }}>
      <div className="section flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs" style={{ color: 'var(--color-haze)' }}>
          © {year} {PROFILE.name}. Hand-built in Kigali, Rwanda.
        </p>
        <div className="flex items-center gap-5">
          {PROFILE.socials.github && (
            <a href={PROFILE.socials.github} className="font-mono text-xs" style={{ color: 'var(--color-haze)' }}>GitHub</a>
          )}
          {PROFILE.socials.linkedin && (
            <a href={PROFILE.socials.linkedin} className="font-mono text-xs" style={{ color: 'var(--color-haze)' }}>LinkedIn</a>
          )}
          {PROFILE.socials.twitter && (
            <a href={PROFILE.socials.twitter} className="font-mono text-xs" style={{ color: 'var(--color-haze)' }}>X</a>
          )}
        </div>
      </div>
    </footer>
  );
}
