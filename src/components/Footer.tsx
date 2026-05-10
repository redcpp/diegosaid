import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLenis } from '@/lib/lenis-context';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();

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

  const goToProjects = () => {
    navigate('/projects');
  };

  return (
    <footer className="w-full bg-ink text-creme py-16 lg:py-24 px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="text-creme">
              <rect x="12" y="12" width="24" height="24" transform="rotate(45 24 24)" stroke="currentColor" strokeWidth="2"/>
              <rect x="18" y="18" width="12" height="12" transform="rotate(45 24 24)" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="font-headline font-bold text-[16px] uppercase tracking-[0.06em]">
              DIEGO SAID
            </span>
            <span className="font-body text-[12px] text-stone italic">
              Where Symmetry Is Policy
            </span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <span className="font-headline font-medium text-label uppercase text-stone tracking-[0.08em] mb-2">
              NAVIGATION
            </span>
            <button
              onClick={goToProjects}
              className="font-headline font-medium text-[12px] uppercase tracking-[0.06em] text-creme hover:text-cobalt transition-colors cursor-pointer"
            >
              PROJECTS
            </button>
            <Link
              to="/blog"
              className="font-headline font-medium text-[12px] uppercase tracking-[0.06em] text-creme hover:text-cobalt transition-colors"
            >
              BLOG
            </Link>
            <button
              onClick={goToContact}
              className="font-headline font-medium text-[12px] uppercase tracking-[0.06em] text-creme hover:text-cobalt transition-colors cursor-pointer"
            >
              CONTACT
            </button>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="font-headline font-medium text-label uppercase text-stone tracking-[0.08em] mb-2">
              CONNECT
            </span>
            <a href="https://linkedin.com/in/redcpp" target="_blank" rel="noopener noreferrer"
              className="font-headline font-medium text-[12px] uppercase tracking-[0.06em] text-creme hover:text-terracotta transition-colors">
              LINKEDIN
            </a>
            <a href="https://github.com/redcpp" target="_blank" rel="noopener noreferrer"
              className="font-headline font-medium text-[12px] uppercase tracking-[0.06em] text-creme hover:text-terracotta transition-colors">
              GITHUB
            </a>
            <a href="https://diegosaid.com" target="_blank" rel="noopener noreferrer"
              className="font-headline font-medium text-[12px] uppercase tracking-[0.06em] text-creme hover:text-terracotta transition-colors">
              WEBSITE
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone/30 text-center">
          <p className="font-headline font-medium text-[11px] text-stone">
            &copy; 2025 DIEGO SAID — SYMMETRY IS POLICY
          </p>
          <p className="font-body text-[10px] text-stone opacity-50 mt-1">
            BUILT WITH OBSESSIVE PRECISION
          </p>
          <p className="font-mono text-[11px] text-stone opacity-50 mt-1">
            Response time: typically within 24 hours.
          </p>
        </div>
      </div>
    </footer>
  );
}
