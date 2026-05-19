import { useRef } from 'react';
import { useLazyVideo } from '@/hooks/use-lazy-video';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const METRICS = ['MLX INFERENCE', 'MONTE CARLO', '1,500+ MLS RECORDS', 'CLAUDE API'];

export default function Section07MlLlm() {
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
      id="ml-llm"
      className="w-full bg-blush pt-20 lg:pt-24 pb-20 px-6 lg:px-20"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-ink/55 uppercase border-b border-ink/15 pb-3 mb-10">
          <span>CASE FILE · DSR/2026/P-06</span>
          <span className="text-cobalt">ML &amp; LLM SYSTEMS</span>
          <span>2023 → PRESENT · OPS</span>
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
                aria-label="ML & LLM systems showcase video"
              >
                <source src="/video-projects-ml-llm.webm" type="video/webm" />
                <source src="/video-projects-ml-llm.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-creme/55 pointer-events-none" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] tracking-[0.18em] text-creme/80 uppercase z-10">
                <span>CASE / 06</span>
                <span>№ 06 / 07</span>
              </div>
            </div>

            <div className="mt-6">
              <span className="font-mono text-[10px] tracking-[0.18em] text-cobalt uppercase">
                ML &amp; LLM SYSTEMS
              </span>
              <h2 className="font-headline font-bold text-[24px] sm:text-[30px] uppercase text-ink leading-[1.05] tracking-[-0.01em] mt-2">
                QUANTITATIVE INTELLIGENCE &amp; LLM INFRASTRUCTURE
              </h2>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text uppercase">
                  2023 — PRESENT
                </span>
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text/60 uppercase">·</span>
                <span className="font-body italic text-[13px] text-cobalt">
                  Independent R&amp;D
                </span>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="opacity-0 lg:col-span-7 lg:pt-1">
            <p className="font-body text-[15px] text-ink leading-[1.7]">
              Designed and deployed a private on-premise LLM inference stack on Apple Silicon
              using the MLX framework, connected via Tailscale for secure remote access. Built
              custom Claude-based skills for automated contract comparison and legal document
              organization. Developed a quantitative investment analysis toolkit implementing DCF
              valuation, IRR calculations, and Monte Carlo simulations. Created a market
              intelligence dashboard analyzing 1,500+ MLS transactions for real estate market
              pattern detection.
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

            <div className="mt-6 pt-5 border-t border-ink/10">
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45 uppercase">
                § STACK
              </span>
              <p className="font-mono text-[12px] text-stone-text mt-2 leading-[1.7]">
                Python · MLX · Claude API · TypeScript · Next.js · PostgreSQL · Quantitative Analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
