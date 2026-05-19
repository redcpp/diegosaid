import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface Award {
  serial: string;
  name: string;
  year: string;
  org: string;
  region: string;
  description: string;
  citation: string;
}

const AWARDS: Award[] = [
  {
    serial: 'REG-2018/01',
    name: 'ACM-ICPC Regional Finalist',
    year: '2018',
    org: 'ACM International Collegiate Programming Contest',
    region: 'Mexico & Central America',
    description: 'Competitive programming world finals qualifier.',
    citation:
      'Top regional standing in algorithmic problem solving — combinatorics, graph theory, dynamic programming under contest time.',
  },
  {
    serial: 'REG-2017/02',
    name: 'ACM-ICPC Honorable Mention',
    year: '2017',
    org: 'ACM International Collegiate Programming Contest',
    region: 'Mexico & Central America',
    description: 'Top placement in regional algorithmic competition.',
    citation:
      'Recognized for technical depth and consistency across a multi-round programming gauntlet.',
  },
  {
    serial: 'REG-2013/03',
    name: 'Youth Summit Delegate',
    year: '2013',
    org: 'World Bank Group',
    region: 'Washington, D.C., USA',
    description: 'Selected to represent Mexico at the World Bank Group Youth Summit.',
    citation:
      'One of the youngest national delegates — policy roundtables on technology and inclusion.',
  },
];

function SealMedallion() {
  return (
    <div className="award-seal opacity-0 relative w-20 h-20" aria-hidden="true">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-cobalt/60" />
      <div className="absolute inset-[6px] rounded-full border border-cobalt/40 border-dashed animate-[spin_40s_linear_infinite]" />
      <div className="absolute inset-[14px] rounded-full bg-cobalt/10 flex items-center justify-center">
        <svg viewBox="0 0 32 32" className="w-9 h-9 text-cobalt" fill="none" stroke="currentColor" strokeWidth="1.4">
          <polygon points="16,3 19,12 28,12 21,18 24,28 16,22 8,28 11,18 4,12 13,12" />
        </svg>
      </div>
    </div>
  );
}

function AwardCard({ award, idx }: { award: Award; idx: number }) {
  const num = String(idx + 1).padStart(2, '0');
  return (
    <article className="award-card opacity-0 group relative bg-parchment border border-ink/15 p-7 lg:p-9 flex flex-col h-full overflow-hidden">
      {/* Punched corner notch */}
      <span
        aria-hidden="true"
        className="absolute -top-2 -right-2 w-10 h-10 bg-creme border border-ink/15 rotate-45"
      />
      {/* Top lighting */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[35%] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)',
        }}
      />

      {/* Registry strip */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-ink/55 uppercase border-b border-ink/15 pb-3 relative z-10">
        <span>{award.serial}</span>
        <span>№ {num}</span>
      </div>

      {/* Body */}
      <div className="relative z-10 mt-7 flex flex-col items-start gap-5">
        <SealMedallion />

        <div>
          <span className="font-headline font-bold uppercase text-[44px] leading-none text-cobalt block tracking-[-0.02em]">
            {award.year}
          </span>
          <h3 className="font-headline font-bold text-[18px] uppercase text-ink mt-3 leading-tight tracking-[0.005em] group-hover:text-cobalt transition-colors">
            {award.name}
          </h3>
          <p className="font-body italic text-[13px] text-stone-text mt-1">
            {award.org}
          </p>
          <p className="font-mono text-[10px] tracking-[0.14em] text-ink/55 uppercase mt-1">
            {award.region}
          </p>
        </div>

        <div className="h-[1px] w-full bg-ink/10" />

        <p className="font-body text-[13.5px] text-ink/80 leading-[1.65]">
          {award.description}
        </p>
        <p className="font-body italic text-[12.5px] text-ink/65 leading-[1.65] border-l-2 border-cobalt/50 pl-3 mt-auto">
          “{award.citation}”
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 pt-3 border-t border-ink/10 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-ink/40 uppercase">
        <span>VERIFIED</span>
        <span>SEAL · D.S.A.M.</span>
      </div>
    </article>
  );
}

export default function Section08Awards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    const cards = sectionRef.current.querySelectorAll('.award-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        }
      );

      const seal = card.querySelector('.award-seal');
      if (seal) {
        gsap.fromTo(
          seal,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(2)',
            delay: 0.2,
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      }
    });
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="honors"
      className="w-full bg-creme py-28 lg:py-36 px-6 lg:px-20 texture-grid relative overflow-hidden"
    >
      {/* Decorative numeral */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute -top-6 left-6 font-headline font-bold text-[180px] leading-none text-ink/[0.04] select-none pointer-events-none tracking-tighter"
      >
        08
      </span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Registry header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-ink/55 uppercase border-b border-ink/15 pb-3 mb-12">
          <span>LEDGER · DSR/2026/008 — MERIT REGISTER</span>
          <span className="text-cobalt">{AWARDS.length} ENTRIES</span>
          <span>WITNESSED · SEALED</span>
        </div>

        <SectionEyebrow text="HONORS" />
        <div className="mt-4 lg:flex lg:items-end lg:justify-between gap-8">
          <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-ink leading-[0.95] tracking-[-0.015em]">
            AWARDS &amp;<br />
            <span className="text-cobalt">RECOGNITION</span>
          </h2>
          <p className="font-body italic text-[14px] text-ink/65 mt-4 lg:mt-0 max-w-sm">
            Selected distinctions, archived in chronological order with their citations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {AWARDS.map((award, i) => (
            <AwardCard key={award.serial} award={award} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
