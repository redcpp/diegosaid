import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Section08HarvardCore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    });

    if (leftRef.current) {
      tl.fromTo(leftRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0);
    }
    if (rightRef.current) {
      tl.fromTo(rightRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.15);
    }
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="harvard-core"
      className="w-full bg-creme pt-20 lg:pt-24 pb-20 px-6 lg:px-20"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div ref={leftRef} className="opacity-0 lg:col-span-5">
            {/* Typographic header (no video) */}
            <div
              className="relative w-full aspect-video rounded-sm border border-stone overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #A41034 0%, #8C2B3D 50%, #2B4C8C 100%)',
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative z-10 text-center px-6">
                  <span className="font-headline font-bold text-[16px] sm:text-[20px] uppercase text-creme block">
                    HARVARD BUSINESS SCHOOL
                  </span>
                  <span className="font-mono text-[11px] uppercase text-creme/85 block tracking-[0.2em] mt-2">
                    ONLINE
                  </span>
                </div>
              </div>
              <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-creme/55 pointer-events-none" />
            </div>

            <div className="mt-6">
              <h2 className="font-headline font-bold text-[24px] sm:text-[30px] uppercase text-ink leading-[1.05] tracking-[-0.01em]">
                BUSINESS ANALYTICS, ECONOMICS &amp; FINANCIAL ACCOUNTING
              </h2>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text uppercase">
                  CONFERRED 2022
                </span>
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text/60 uppercase">·</span>
                <span className="font-body italic text-[13px] text-cobalt">
                  Credential of Readiness (CORe)
                </span>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="opacity-0 lg:col-span-7 lg:pt-1">
            <p className="font-body text-[15px] text-ink leading-[1.7]">
              HBS Online CORe credential — Business Analytics, Economics for Managers, and
              Financial Accounting (conferred 2022). Complements the engineering background with
              quantitative business analysis and financial statement literacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
