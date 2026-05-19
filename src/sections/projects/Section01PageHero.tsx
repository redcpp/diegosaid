import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useReducedMotion from '@/hooks/use-reduced-motion';

const STATS = [
  { num: '07', label: 'PROJECTS' },
  { num: '07+', label: 'YEARS' },
  { num: '05', label: 'DOMAINS' },
  { num: '02', label: 'PUBLICATIONS' },
];

export default function Section01PageHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      // Split title into character spans
      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        titleRef.current.innerHTML = '';
        text.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? ' ' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(20px)';
          titleRef.current!.appendChild(span);
        });

        gsap.to(titleRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.03,
          ease: 'power3.out',
          delay: 0.3,
        });
      }

      // Stagger other elements
      gsap.fromTo(
        '.hero-stagger',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.15 }
      );

      gsap.fromTo(
        '.stat-cell',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 1.0 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink text-creme pt-28 lg:pt-32 pb-16 lg:pb-20 px-6 lg:px-20 overflow-hidden"
    >
      {/* Faint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,243,239,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,239,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, black 60%, transparent 100%)',
        }}
      />

      {/* Decorative numeral */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute -top-6 right-6 font-headline font-bold text-[180px] leading-none text-creme/[0.04] select-none pointer-events-none tracking-tighter"
      >
        P
      </span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Registry strip */}
        <div className="hero-stagger flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-stone uppercase border-b border-creme/15 pb-3 mb-12">
          <span>VOLUME · DSR/2026/P — CASE FILES</span>
          <span className="text-cobalt">{STATS[0].num} ENTRIES · 2018 → PRESENT</span>
          <span>OPEN ACCESS</span>
        </div>

        {/* Volume / topic */}
        <div className="hero-stagger flex items-baseline gap-3 mb-6">
          <span className="font-mono text-[10px] tracking-[0.18em] text-cobalt uppercase">
            § VOL. P
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-stone/70 uppercase">
            ENGINEERING PORTFOLIO
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-headline font-bold text-[56px] sm:text-[80px] lg:text-display-xl uppercase text-creme leading-[0.9] tracking-[-0.025em]"
        >
          SELECTED<br />
          WORKS<span className="text-cobalt">.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-stagger font-body italic text-[15px] sm:text-[17px] text-stone mt-6 max-w-[58ch] leading-[1.65]">
          Seven projects. Seven worlds. One obsession with correctness. Each case file is
          archived below — chronological, full-context, with the systems and the trade-offs.
        </p>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 border-t border-creme/15 pt-8">
          {STATS.map((s) => (
            <div key={s.label} className="stat-cell flex flex-col gap-1">
              <span className="font-headline font-bold text-[36px] sm:text-[44px] text-cobalt leading-none tracking-[-0.02em]">
                {s.num}
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-stone uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom hairline */}
        <div className="hero-stagger mt-10 pt-3 border-t border-creme/10 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-stone/60 uppercase">
          <span>// SCROLL TO READ CASE FILES</span>
          <span className="hidden sm:inline">FILED · CHRONOLOGICAL</span>
        </div>
      </div>
    </section>
  );
}
