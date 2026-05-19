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
      <div className="max-w-[1240px] mx-auto px-6 lg:px-20 py-10 lg:py-12">
        {/* Single horizontal row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
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

          {/* Return to top */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-stone hover:text-cobalt transition-colors bg-transparent border-none cursor-pointer"
          >
            <span>TOP</span>
            <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
          </button>
        </div>

        {/* Bottom hairline */}
        <div className="mt-8 pt-4 border-t border-creme/10 font-mono text-[10px] tracking-[0.16em] text-stone/55 uppercase">
          <span>© {year} Diego Said</span>
        </div>
      </div>
    </footer>
  );
}
