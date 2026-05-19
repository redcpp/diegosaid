import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Section02bCamConstruction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.fade-in'),
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="cam-construction"
      className="w-full bg-creme pb-20 px-6 lg:px-20"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="border-t border-ink/15 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="fade-in opacity-0 lg:col-span-5">
            <h3 className="font-headline font-bold text-[20px] sm:text-[24px] uppercase text-ink leading-[1.1] tracking-[-0.005em]">
              CAM GRUPO — CONSTRUCTION &amp; DEVELOPMENT
            </h3>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text uppercase">
                MARCH 2020 — PRESENT
              </span>
              <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text/60 uppercase">·</span>
              <span className="font-body italic text-[13px] text-cobalt">
                Operations &amp; IT · Part-time
              </span>
            </div>
          </div>

          <div className="fade-in opacity-0 lg:col-span-7">
            <p className="font-body text-[15px] text-ink leading-[1.7]">
              Internal operations on Airtable (project tracking, document workflows, lead
              management); corporate digital presence including email infrastructure and the
              marketing website{' '}
              <a
                href="https://camgrupo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cobalt hover:underline"
              >
                camgrupo.com
              </a>{' '}
              plus individual sites for each active development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
