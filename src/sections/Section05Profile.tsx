import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import HorizontalPanWipe from '@/components/HorizontalPanWipe';
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

function TerminalPanel() {
  const [typedLines, setTypedLines] = useState<number>(0);
  const [cursorLine, setCursorLine] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!panelRef.current || reducedMotion) return;
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
    <div
      ref={panelRef}
      className="bg-ink rounded-xl p-6 font-mono text-mono-text overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
      </div>

      {/* Terminal Content */}
      <div className="space-y-1">
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
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
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
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-blush py-32 lg:py-40 px-6 lg:px-20 texture-noise"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 relative z-10">
        {/* Left Column — Identity */}
        <div ref={leftRef} className="opacity-0">
          <SectionEyebrow text="ABOUT" color="var(--color-cobalt)" className="text-left" />
          <h2 className="font-headline font-bold text-[28px] sm:text-display-md uppercase text-ink mt-4 leading-tight">
            DIEGO SAID ANAYA MANCILLA
          </h2>
          <p className="font-headline font-medium text-label uppercase tracking-[0.08em] text-stone-text mt-4">
            NUEVO VALLARTA, NAYARIT, M&Eacute;XICO
          </p>
          <div className="my-6">
            <HorizontalPanWipe color="var(--color-stone)" width="100%" />
          </div>
          <p className="font-body text-[14px] sm:text-[16px] text-ink/85 leading-[1.65]">
            Software engineer with experience spanning enterprise cloud infrastructure, decentralized
            finance protocols, quantitative business analytics, and genomic data systems. ACM-ICPC
            Regional Finalist (Mexico & Central America, 2018). Currently executing a strategic
            return to full-time engineering with focus on Go, distributed systems, and cloud-native
            backend architecture.
          </p>
        </div>

        {/* Right Column — Terminal */}
        <div ref={rightRef} className="opacity-0">
          <TerminalPanel />
        </div>
      </div>
    </section>
  );
}
