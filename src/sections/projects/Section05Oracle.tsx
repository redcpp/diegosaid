import { useRef } from 'react';
import { useLazyVideo } from '@/hooks/use-lazy-video';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const METRICS = ['OCI PIPELINES', 'CI/CD AUTOMATION', 'SEV-1 SUPPORT', 'DOCKER'];

export default function Section05Oracle() {
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
    tl.fromTo(
      sectionRef.current.querySelectorAll('.metric-pill'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
      0.35
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="oracle"
      className="w-full bg-blush pt-20 lg:pt-24 pb-20 px-6 lg:px-20"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div ref={leftRef} className="opacity-0 lg:col-span-5">
            <div className="relative w-full aspect-video rounded-sm border border-stone overflow-hidden">
              <video
                ref={useLazyVideo()}
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover"
                aria-label="Oracle Cloud Infrastructure Big Data showcase video"
              >
                <source src="/video-projects-oracle.webm" type="video/webm" />
                <source src="/video-projects-oracle.mp4" type="video/mp4" />
              </video>
              <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-creme/55 pointer-events-none" />
            </div>

            <div className="mt-6">
              <h2 className="font-headline font-bold text-[24px] sm:text-[30px] uppercase text-ink leading-[1.05] tracking-[-0.01em]">
                CLOUD-NATIVE BIG DATA INFRASTRUCTURE
              </h2>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text uppercase">
                  JAN 2019 — FEB 2021
                </span>
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text/60 uppercase">·</span>
                <span className="font-body italic text-[13px] text-cobalt">
                  Software Developer II
                </span>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="opacity-0 lg:col-span-7 lg:pt-1">
            <p className="font-body text-[15px] text-ink leading-[1.7]">
              Built OCI image pipelines migrating on-premise Big Data apps to Oracle Cloud.
              Designed TeamCity CI/CD pipelines, Docker workflows, and Artifactory artifact
              management. Automated server re-imaging, firmware update testing, and release
              qualification. Global SEV-1 on-call for OCI Big Data Service.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-6">
              {METRICS.map((m) => (
                <span
                  key={m}
                  className="metric-pill opacity-0 font-mono text-[10px] uppercase tracking-[0.12em] text-cobalt border border-cobalt/40 bg-cobalt/5 px-2 py-[3px]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
