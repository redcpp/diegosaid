import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLenis } from '@/lib/lenis-context';

function MonogramGlyph() {
  return (
    <svg
      viewBox="0 0 32 32"
      width="22"
      height="22"
      className="text-ink group-hover:text-cobalt transition-colors"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="20" height="20" transform="rotate(45 16 16)" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <rect x="10" y="10" width="12" height="12" transform="rotate(45 16 16)" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="16" cy="16" r="1.2" fill="currentColor" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      setClock(`${hh}:${mm} CST`);
    };
    update();
    const t = setInterval(update, 30_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [menuOpen]);

  const handleContact = () => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      const target = document.getElementById('contact');
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -64 });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: 'contact' } });
    }
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-creme/95 backdrop-blur-sm border-b border-ink/15 animate-nav-entrance">
      {/* Tiny registry rail */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-20 h-5 border-b border-ink/10 font-mono text-[9px] tracking-[0.18em] text-ink/45 uppercase">
        <span>DSR · IDENTITY DOSSIER · 2026</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
            ONLINE
          </span>
          <span className="text-ink/30">·</span>
          <span>{clock}</span>
          <span className="text-ink/30">·</span>
          <span>NUEVO VALLARTA · MX</span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto h-14 md:h-16 flex items-center justify-between px-6 lg:px-20">
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-2.5 cursor-pointer"
        >
          <MonogramGlyph />
          <div className="flex flex-col leading-none">
            <span className="font-headline font-bold text-[15px] uppercase tracking-[0.06em] text-ink group-hover:text-cobalt transition-colors">
              DIEGO SAID
            </span>
            <span className="hidden sm:inline font-mono text-[9px] tracking-[0.22em] text-ink/45 uppercase mt-1">
              SOFTWARE ENGINEER
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {[
            { to: '/projects', label: '01 · PROJECTS' },
            { to: '/blog', label: '02 · BLOG' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link font-headline font-medium text-[11px] tracking-[0.14em] uppercase text-ink hover:text-cobalt transition-colors px-4 py-5 cursor-pointer${isActive ? ' active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={handleContact}
            className="nav-link font-headline font-medium text-[11px] tracking-[0.14em] uppercase text-ink hover:text-cobalt transition-colors px-4 py-5 bg-transparent border-none cursor-pointer"
          >
            03 · CONTACT
          </button>

          {/* CTA tag */}
          <button
            onClick={handleContact}
            className="ml-4 inline-flex items-center gap-2 px-3 py-1.5 border border-cobalt text-cobalt font-headline font-medium text-[10px] tracking-[0.16em] uppercase bg-cobalt/5 hover:bg-cobalt hover:text-creme transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-pulse" />
            OPEN TO WORK
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-6 h-[2px] bg-ink transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-ink transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-ink transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-14 bg-creme transition-all duration-300 overflow-hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto h-[calc(100dvh-3.5rem)]'
            : 'opacity-0 pointer-events-none h-0'
        }`}
      >
        {/* Registry */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-ink/15 font-mono text-[10px] tracking-[0.18em] text-ink/55 uppercase">
          <span>NAV · MOBILE</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
            ONLINE
          </span>
        </div>

        <div className="flex flex-col px-8 py-12 gap-1">
          {[
            { to: '/projects', label: 'PROJECTS', n: '01' },
            { to: '/blog', label: 'BLOG', n: '02' },
          ].map((item, i) => (
            <NavLink
              ref={i === 0 ? firstLinkRef : undefined}
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-baseline gap-4 py-5 border-b border-ink/15 cursor-pointer ${isActive ? 'text-cobalt' : 'text-ink'}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
                {item.n}
              </span>
              <span className="flex-1 font-headline font-bold text-[28px] uppercase tracking-[-0.005em] group-hover:text-cobalt transition-colors">
                {item.label}
              </span>
              <span className="text-cobalt text-xl">→</span>
            </NavLink>
          ))}
          <button
            onClick={handleContact}
            className="group flex items-baseline gap-4 py-5 border-b border-ink/15 bg-transparent border-l-0 border-r-0 border-t-0 text-left cursor-pointer"
          >
            <span className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
              03
            </span>
            <span className="flex-1 font-headline font-bold text-[28px] uppercase tracking-[-0.005em] text-ink group-hover:text-cobalt transition-colors">
              CONTACT
            </span>
            <span className="text-cobalt text-xl">→</span>
          </button>

          {/* Status callout */}
          <div className="mt-10 border border-cobalt p-5 bg-cobalt/5">
            <p className="font-mono text-[10px] tracking-[0.18em] text-cobalt uppercase">
              CURRENT STATUS
            </p>
            <p className="font-headline font-bold text-[18px] uppercase text-ink mt-1">
              Open to engagements
            </p>
            <p className="font-body italic text-[13px] text-ink/65 mt-1">
              Strategic return to full-time engineering.
            </p>
          </div>

          <div className="mt-6 font-mono text-[10px] tracking-[0.18em] text-ink/45 uppercase text-center">
            {clock} · NUEVO VALLARTA
          </div>
        </div>
      </div>
    </nav>
  );
}
