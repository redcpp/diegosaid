import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '@/lib/lenis-context';
import Section01PageHero from '@/sections/projects/Section01PageHero';
import Section02CamGrupo from '@/sections/projects/Section02CamGrupo';
import Section02bCamConstruction from '@/sections/projects/Section02bCamConstruction';
import Section03Xbacked from '@/sections/projects/Section03Xbacked';
import Section04VcfPlotein from '@/sections/projects/Section04VcfPlotein';
import Section05Oracle from '@/sections/projects/Section05Oracle';
import Section06Decentracare from '@/sections/projects/Section06Decentracare';
import Section07MlLlm from '@/sections/projects/Section07MlLlm';
import Section08HarvardCore from '@/sections/projects/Section08HarvardCore';
import Section09Publications from '@/sections/projects/Section09Publications';
import Section10CtaBanner from '@/sections/projects/Section10CtaBanner';

export default function Projects() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const section = new URLSearchParams(location.search).get('section');
    if (!section) return;

    const timer = setTimeout(() => {
      const el = document.getElementById(section);
      if (el) lenis.scrollTo(el, { offset: -64 });
    }, 100);
    return () => clearTimeout(timer);
  }, [location.search, lenis]);

  return (
    <div>
      <Section01PageHero />
      <Section02CamGrupo />
      <Section02bCamConstruction />
      <Section03Xbacked />
      <Section04VcfPlotein />
      <Section05Oracle />
      <Section06Decentracare />
      <Section07MlLlm />
      <Section08HarvardCore />
      <Section09Publications />
      <Section10CtaBanner />
    </div>
  );
}
