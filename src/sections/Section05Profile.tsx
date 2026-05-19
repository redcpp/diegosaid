import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const TERMINAL_LINES = [
  { key: 'whoami', value: 'Diego Said Anaya Mancilla' },
  { key: 'location', value: '20.6975° N, 105.2921° W' },
  { key: 'status', value: 'Returning to Engineering' },
  { key: 'focus', value: 'Go · Distributed Systems · Cloud-Native' },
  { key: 'credentials', value: "ACM-ICPC Regional Finalist '18\n  Harvard CORe '22\n  ADR-47 Published" },
  { key: 'contact', value: 'diego@camgrupo.com\n  +52 322 111 7595' },
];

const IDENTITY_FACTS = [
  { id: '01', label: 'DISCIPLINE', value: 'Backend systems engineering' },
  { id: '02', label: 'POSTURE', value: 'Strategic return to full-time' },
  { id: '03', label: 'STACK', value: 'Go · Distributed · Cloud-native' },
  { id: '04', label: 'TENURE', value: '7+ yrs shipping production code' },
];

function TerminalPanel() {
  const [typedLines, setTypedLines] = useState<number>(0);
  const [cursorLine, setCursorLine] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!panelRef.current || reducedMotion) {
      setTypedLines(TERMINAL_LINES.length);
      setCursorLine(TERMINAL_LINES.length - 1);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setTypedLines(count);
            setCursorLine(count - 1);
            if (count >= TERMINAL_LINES.length) {
              clearInterval(interval);
              setCursorLine(TERMINAL_LINES.length - 1);
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
      {/* Frame label */}
      <div className="flex items-center justify-between mb-3 font-mono text-[10px] tracking-[0.14em] text-stone-text uppercase">
        <span>// SHELL — /usr/bin/diego</span>
        <span className="hidden sm:inline">SESSION 0x1F · TTY 02</span>
      </div>
      <div className="bg-ink rounded-sm p-6 lg:p-7 font-mono text-mono-text overflow-hidden border border-ink shadow-[0_24px_48px_-24px_rgba(26,26,26,0.45)]">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-creme/10">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          <span className="ml-auto text-[10px] tracking-[0.14em] text-stone uppercase">
            ~ diego — zsh — 80×24
          </span>
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
                {cursorLine === i && (
                  <span className="animate-cursor-blink ml-0.5">_</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer caption */}
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-stone-text uppercase">
        <span>EXIT 0 · CLEAN</span>
        <span>UPDATED 2026.05</span>
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
        {/* Registry strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-ink/55 uppercase border-b border-ink/15 pb-3 mb-12">
          <span>FILE · DSR/2026/001 — IDENTITY DOSSIER</span>
          <span className="text-cobalt">CLASS · ENGINEER</span>
          <span>REV 04 · 2026.05.18</span>
        </div>

        <SectionEyebrow text="ABOUT" color="var(--color-cobalt)" className="text-left" />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column — Identity */}
          <div ref={leftRef} className="opacity-0 lg:col-span-7">
            {/* Name typeset as a stack */}
            <div className="space-y-1">
              {['DIEGO', 'SAID', 'ANAYA', 'MANCILLA'].map((part, i) => (
                <div key={part} className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-ink/40 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-headline font-bold text-[40px] sm:text-[64px] lg:text-[88px] uppercase text-ink leading-[0.92] tracking-[-0.02em]">
                    {part}
                  </h2>
                </div>
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
              <span className="font-mono text-[11px] text-cobalt tracking-[0.06em]">
                20.6975°N / 105.2921°W
              </span>
            </div>

            {/* Bio */}
            <p className="font-body text-[14px] sm:text-[16px] text-ink/85 leading-[1.75] mt-8 max-w-[58ch]">
              Software engineer with experience spanning enterprise cloud infrastructure,
              decentralized finance protocols, quantitative business analytics, and genomic data
              systems. ACM-ICPC Regional Finalist (Mexico &amp; Central America, 2018). Currently
              executing a strategic return to full-time engineering with focus on
              <span className="text-cobalt"> Go</span>, distributed systems, and cloud-native
              backend architecture.
            </p>

            {/* Identity facts (numbered ledger rows) */}
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 border-t border-ink/15">
              {IDENTITY_FACTS.map((fact) => (
                <div
                  key={fact.id}
                  className="identity-fact opacity-0 flex items-baseline gap-4 py-4 border-b border-ink/10"
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] text-cobalt">
                    {fact.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-ink/55 uppercase">
                      {fact.label}
                    </dt>
                    <dd className="font-headline font-medium text-[14px] text-ink mt-1 tracking-[0.01em]">
                      {fact.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Right Column — Terminal + Marginalia */}
          <div ref={rightRef} className="opacity-0 lg:col-span-5 lg:pt-12">
            <TerminalPanel />

            {/* Signature block */}
            <div className="mt-8 border border-ink/15 bg-parchment/60 rounded-sm p-5 backdrop-blur-[1px]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55 uppercase">
                  SIGNED
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] text-stone-text uppercase">
                  /s/ D.S.A.M.
                </span>
              </div>
              <p className="font-body italic text-[13px] text-ink/75 leading-[1.65] mt-3">
                “The proof is in the diff. Everything else is conversation.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
