import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLenis } from '@/lib/lenis-context';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Escape key handler
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

  // Focus trap
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
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-creme/95 shadow-sm border-b border-stone/10 animate-nav-entrance">
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6 lg:px-20">
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="font-headline font-bold text-[16px] uppercase tracking-[0.06em] text-ink hover:text-cobalt transition-colors cursor-pointer"
        >
          DIEGO SAID
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `nav-link font-headline font-medium text-label uppercase text-ink hover:text-cobalt transition-colors px-4 py-5 cursor-pointer${isActive ? ' active' : ''}`
            }
          >
            PROJECTS
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `nav-link font-headline font-medium text-label uppercase text-ink hover:text-cobalt transition-colors px-4 py-5 cursor-pointer${isActive ? ' active' : ''}`
            }
          >
            BLOG
          </NavLink>
          <button
            onClick={handleContact}
            className="nav-link font-headline font-medium text-label uppercase text-ink hover:text-cobalt transition-colors px-4 py-5 bg-transparent border-none cursor-pointer"
          >
            CONTACT
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
        className={`md:hidden fixed inset-x-0 top-16 bg-creme/98 transition-all duration-300 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto h-[calc(100dvh-4rem)]'
            : 'opacity-0 pointer-events-none h-0'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-8 h-full">
          <NavLink
            ref={firstLinkRef}
            to="/projects"
            className={({ isActive }) =>
              `font-headline font-medium text-[18px] uppercase tracking-[0.06em] hover:text-cobalt transition-colors cursor-pointer ${isActive ? 'text-cobalt' : 'text-ink'}`
            }
            onClick={() => setMenuOpen(false)}
          >
            PROJECTS
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `font-headline font-medium text-[18px] uppercase tracking-[0.06em] hover:text-cobalt transition-colors cursor-pointer ${isActive ? 'text-cobalt' : 'text-ink'}`
            }
            onClick={() => setMenuOpen(false)}
          >
            BLOG
          </NavLink>
          <button
            onClick={handleContact}
            className="font-headline font-medium text-[18px] uppercase tracking-[0.06em] text-ink hover:text-cobalt transition-colors bg-transparent border-none cursor-pointer"
          >
            CONTACT
          </button>
        </div>
      </div>
    </nav>
  );
}
