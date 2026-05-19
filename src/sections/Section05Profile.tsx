import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const TERMINAL_LINES = [
  { key: 'whoami', value: 'Diego Said Anaya Mancilla' },
  { key: 'role', value: 'Backend systems engineer' },
  { key: 'credentials', value: "Harvard CORe '22\n  ADR-47 Published" },
  { key: 'contact', value: 'diego@camgrupo.com\n  +52 322 111 7595' },
];

const IDENTITY_FACTS = [
  { label: 'DISCIPLINE', value: 'Backend systems engineering' },
  { label: 'POSTURE', value: 'Strategic return to full-time' },
  { label: 'STACK', value: 'Go · Distributed · Cloud-native' },
  { label: 'TENURE', value: '7+ yrs shipping production code' },
];

function TerminalPanel() {
  const [typedLines, setTypedLines] = useState<number>(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!panelRef.current || reducedMotion) {
      setTypedLines(TERMINAL_LINES.length);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setTypedLines(count);
            if (count >= TERMINAL_LINES.length) {
              clearInterval(interval);
            }
          }, 400);
          observer.disconnect();
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={panelRef} className="relative">
      <div className="bg-ink rounded-sm p-6 lg:p-7 font-mono text-mono-text overflow-hidden border border-ink shadow-[0_24px_48px_-24px_rgba(26,26,26,0.45)]">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-creme/10">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        </div>

        {/* Terminal Content */}
        <div className="space-y-1.5">
          {TERMINAL_LINES.map((line, i) => (
            <div
              key={line.key}
              className={`transition-opacity duration-300 ${i < typedLines ? 'opacity-100' : 'opacity-0'}`}
            >
              <span className="text-sage">$ {line.key}</span>
              <div className="text-creme pl-4 whitespace-pre-line leading-relaxed">
                {line.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Section05Profile() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.fromTo(
      leftRef.current,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );

    gsap.fromTo(
      rightRef.current,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.identity-fact'),
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-blush py-28 lg:py-36 px-6 lg:px-20 texture-noise relative overflow-hidden"
    >
      {/* Decorative oversized numeral */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute -top-8 right-6 font-headline font-bold text-[180px] leading-none text-ink/[0.04] select-none pointer-events-none tracking-tighter"
      >
        05
      </span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        <SectionEyebrow text="ABOUT" color="var(--color-cobalt)" className="text-left" />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column — Identity */}
          <div ref={leftRef} className="opacity-0 lg:col-span-7">
            {/* Name typeset as a stack */}
            <div className="space-y-1">
              {['DIEGO', 'SAID', 'ANAYA', 'MANCILLA'].map((part) => (
                <h2
                  key={part}
                  className="font-headline font-bold text-[40px] sm:text-[64px] lg:text-[88px] uppercase text-ink leading-[0.92] tracking-[-0.02em]"
                >
                  {part}
                </h2>
              ))}
            </div>

            {/* Location row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/15 pt-5">
              <span className="font-mono text-[11px] tracking-[0.14em] text-ink/55 uppercase">
                LOCATED
              </span>
              <span className="font-headline font-medium text-[13px] tracking-[0.08em] text-ink uppercase">
                Nuevo Vallarta · Nayarit · México
              </span>
            </div>

            {/* Bio */}
            <p className="font-body text-[14px] sm:text-[16px] text-ink/85 leading-[1.75] mt-8 max-w-[58ch]">
              Returning to full-time engineering with focus on
              <span className="text-cobalt"> Go</span>, distributed systems, and cloud-native
              backend architecture. Prior work spans cloud infrastructure, DeFi, and genomics.
            </p>

            {/* Identity facts */}
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 border-t border-ink/15">
              {IDENTITY_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="identity-fact opacity-0 py-4 border-b border-ink/10"
                >
                  <dt className="font-mono text-[10px] tracking-[0.18em] text-ink/55 uppercase">
                    {fact.label}
                  </dt>
                  <dd className="font-headline font-medium text-[14px] text-ink mt-1 tracking-[0.01em]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right Column — Terminal */}
          <div ref={rightRef} className="opacity-0 lg:col-span-5 lg:pt-12">
            <TerminalPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
