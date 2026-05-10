import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/lib/lenis-context';

export default function ScrollToTop() {
  const location = useLocation();
  const lenis = useLenis();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!lenis) return;

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const state = location.state as { scrollTo?: string } | null;
    const hasSectionParam = new URLSearchParams(location.search).get('section');
    const hasScrollIntent = Boolean(state?.scrollTo || hasSectionParam);

    if (!hasScrollIntent) {
      lenis.scrollTo(0, { duration: 0.6 });
    }

    requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
  }, [location.pathname, lenis]);

  return null;
}
