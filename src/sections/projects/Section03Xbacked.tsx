import { useRef } from 'react';
import { useLazyVideo } from '@/hooks/use-lazy-video';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MechanicalButton from '@/components/MechanicalButton';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const METRICS = ['DEFI PROTOCOL', 'PROOF BY CONTRADICTION', 'RISK PREVENTION', 'ALGORAND'];

export default function Section03Xbacked() {
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
      id="xbacked"
      className="w-full bg-blush pt-20 lg:pt-24 pb-20 px-6 lg:px-20"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-ink/55 uppercase border-b border-ink/15 pb-3 mb-10">
          <span>CASE FILE · DSR/2026/P-02</span>
          <span className="text-cobalt">XBACKED DAO</span>
          <span>2021–2022 · SHIPPED</span>
        </div>

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
                aria-label="xBacked DAO DeFi protocol showcase video"
              >
                <source src="/video-projects-defi.webm" type="video/webm" />
                <source src="/video-projects-defi.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-creme/55 pointer-events-none" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] tracking-[0.18em] text-creme/80 uppercase z-10">
                <span>CASE / 02</span>
                <span>№ 02 / 07</span>
              </div>
            </div>

            <div className="mt-6">
              <span className="font-mono text-[10px] tracking-[0.18em] text-cobalt uppercase">
                XBACKED DAO
              </span>
              <h2 className="font-headline font-bold text-[24px] sm:text-[30px] uppercase text-ink leading-[1.05] tracking-[-0.01em] mt-2">
                DECENTRALIZED FINANCE PROTOCOL &amp; FORMAL RISK ANALYSIS
              </h2>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text uppercase">
                  AUGUST 2021 — MAY 2022
                </span>
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text/60 uppercase">·</span>
                <span className="font-body italic text-[13px] text-cobalt">
                  Core Developer
                </span>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="opacity-0 lg:col-span-7 lg:pt-1">
            <p className="font-body text-[15px] text-ink leading-[1.7]">
              Core developer on xBacked DAO, a DeFi lending/borrowing protocol on the Algorand
              blockchain featuring the xUSD stablecoin. Implemented staking and governance
              features. Authored ADR-47: The Case Against Pact xUSD Launch — a formal mathematical
              proof by contradiction demonstrating that the proposed LP-seeding mechanism
              contained fundamental economic flaws. The analysis prevented the mechanism from
              launching and addressed systemic risk patterns later observed in the 2022
              algorithmic stablecoin failures.
            </p>

            <div className="mt-6 bg-ink rounded-sm p-5 lg:p-6 relative">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-oxblood uppercase border-b border-creme/15 pb-2">
                <span>§ ADR-47 HIGHLIGHT</span>
                <span className="text-stone">FRAGMENT</span>
              </div>
              <blockquote
                className="font-body text-[14px] italic pl-4 text-creme leading-[1.7] mt-4"
                style={{ borderLeft: '2px solid var(--color-oxblood)' }}
              >
                The proposed LP-seeding mechanism can be shown to violate the no-arbitrage
                condition through a proof by contradiction. Assume the mechanism maintains the
                peg…
              </blockquote>
              <p className="font-mono text-[10px] tracking-[0.14em] mt-3 text-right text-stone uppercase">
                — ADR-47 · D.S.A.M.
              </p>
            </div>

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

            <div className="mt-6 pt-5 border-t border-ink/10">
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45 uppercase">
                § STACK
              </span>
              <p className="font-mono text-[12px] text-stone-text mt-2 leading-[1.7]">
                Python · Algorand Smart Contracts · PyTeal · DeFi Protocol Design · Risk Analysis
              </p>
            </div>

            <div className="mt-7">
              <MechanicalButton variant="filled-cobalt" to="/blog/adr47">
                READ ADR-47 →
              </MechanicalButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
