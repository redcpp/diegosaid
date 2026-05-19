import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLenis } from '@/lib/lenis-context';

const LINKS = [
  { label: 'PROJECTS', to: '/projects', kind: 'route' as const },
  { label: 'BLOG', to: '/blog', kind: 'route' as const },
  { label: 'CONTACT', kind: 'scroll' as const },
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/redcpp', kind: 'external' as const },
  { label: 'GITHUB', href: 'https://github.com/redcpp', kind: 'external' as const },
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const year = new Date().getFullYear();

  const goToContact = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'contact' } });
      return;
    }
    const target = document.getElementById('contact');
    if (target && lenis) {
      lenis.scrollTo(target, { offset: -64 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-ink text-creme relative border-t border-creme/15">
      {/* Tiny top registry rail */}
      <div className="hidden md:flex items-center justify-between max-w-[1240px] mx-auto px-6 lg:px-20 h-5 border-b border-creme/10 font-mono text-[9px] tracking-[0.18em] text-stone/70 uppercase">
        <span>COLOPHON · DSR/2026 · EOF</span>
        <span>REV 04 · 2026.05</span>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 lg:px-20 py-10 lg:py-12">
        {/* Single horizontal row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          {/* Identity */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="group flex items-center gap-3"
          >
            <svg
              viewBox="0 0 32 32"
              width="22"
              height="22"
              className="text-creme group-hover:text-cobalt transition-colors"
              aria-hidden="true"
            >
              <rect x="6" y="6" width="20" height="20" transform="rotate(45 16 16)" stroke="currentColor" strokeWidth="1.4" fill="none" />
              <rect x="10" y="10" width="12" height="12" transform="rotate(45 16 16)" stroke="currentColor" strokeWidth="1.4" fill="none" />
              <circle cx="16" cy="16" r="1.2" fill="currentColor" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-headline font-bold text-[14px] uppercase tracking-[0.06em] text-creme group-hover:text-cobalt transition-colors">
                DIEGO SAID
              </span>
              <span className="font-mono text-[9px] tracking-[0.22em] text-stone/75 uppercase mt-1">
                Where Symmetry Is Policy
              </span>
            </div>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3 items-center">
            {LINKS.map((item) => {
              const cls =
                'font-headline font-medium text-[11px] tracking-[0.14em] uppercase text-stone hover:text-cobalt transition-colors cursor-pointer bg-transparent border-none p-0';
              if (item.kind === 'route') {
                return (
                  <Link key={item.label} to={item.to} className={cls}>
                    {item.label}
                  </Link>
                );
              }
              if (item.kind === 'external') {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <button key={item.label} onClick={goToContact} className={cls}>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Status pill + return to top */}
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-2.5 py-1 border border-cobalt text-cobalt font-mono text-[10px] tracking-[0.18em] uppercase bg-cobalt/10">
              <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-pulse" />
              OPEN
            </span>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-stone hover:text-cobalt transition-colors bg-transparent border-none cursor-pointer"
            >
              <span>TOP</span>
              <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
            </button>
          </div>
        </div>

        {/* Bottom hairline */}
        <div className="mt-8 pt-4 border-t border-creme/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.16em] text-stone/55 uppercase">
          <span>© {year} DIEGO SAID</span>
          <span>// EOF · FILE CLOSED · OK</span>
        </div>
      </div>
    </footer>
  );
}
