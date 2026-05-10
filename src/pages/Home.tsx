import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLenis } from '@/lib/lenis-context';
import Section01Hero from '@/sections/Section01Hero';
import Section02Manifesto from '@/sections/Section02Manifesto';
import Section03Projects from '@/sections/Section03Projects';
import Section04Adr47 from '@/sections/Section04Adr47';
import Section05Profile from '@/sections/Section05Profile';
import Section06Timeline from '@/sections/Section06Timeline';
import Section07Skills from '@/sections/Section07Skills';
import Section08Awards from '@/sections/Section08Awards';
import Section11BlogPreview from '@/sections/Section11BlogPreview';
import Section09Contact from '@/sections/Section09Contact';
import Section10Social from '@/sections/Section10Social';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (!state?.scrollTo || !lenis) return;

    const targetId = state.scrollTo;
    const timer = setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) lenis.scrollTo(el, { offset: -64 });
      navigate(location.pathname, { replace: true, state: null });
    }, 100);
    return () => clearTimeout(timer);
  }, [location.state, location.pathname, lenis, navigate]);

  return (
    <>
      <Section01Hero />
      <Section02Manifesto />
      <Section03Projects />
      <Section04Adr47 />
      <Section05Profile />
      <Section06Timeline />
      <Section07Skills />
      <Section08Awards />
      <Section11BlogPreview />
      <Section09Contact />
      <Section10Social />
    </>
  );
}
