import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import HorizontalPanWipe from '@/components/HorizontalPanWipe';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface Award {
  name: string;
  year: string;
  org: string;
  description: string;
}

const AWARDS: Award[] = [
  {
    name: 'ACM-ICPC Regional Finalist',
    year: '2018',
    org: 'Mexico & Central America',
    description: 'Competitive programming world finals qualifier.',
  },
  {
    name: 'ACM-ICPC Honorable Mention',
    year: '2017',
    org: 'Mexico & Central America',
    description: 'Top placement in regional algorithmic competition.',
  },
  {
    name: 'Youth Summit Delegate',
    year: '2013',
    org: 'World Bank Group',
    description: 'Selected to represent Mexico in Washington, D.C.',
  },
];

function AwardCard({ award }: { award: Award }) {
  return (
    <div className="award-card opacity-0 bg-parchment rounded-sm border border-ink/10 p-8 lg:p-16 flex flex-col items-center text-center relative overflow-hidden">
      {/* Top gradient for studio lighting */}
      <div
        className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none z-0"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)' }}
      />
      {/* Geometric Diamond Icon */}
      <div className="award-icon w-12 h-12 text-cobalt opacity-0 scale-0 relative z-10" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="12" y="12" width="24" height="24" transform="rotate(45 24 24)"/>
          <rect x="18" y="18" width="12" height="12" transform="rotate(45 24 24)"/>
        </svg>
      </div>

      <h3 className="font-headline font-bold text-[18px] uppercase text-ink mt-4 relative z-10">
        {award.name}
      </h3>
      <span className="font-headline font-medium text-[14px] uppercase tracking-[0.08em] text-cobalt mt-2 relative z-10">
        {award.year}
      </span>
      <p className="font-body text-[13px] text-stone-text italic mt-1 relative z-10">{award.org}</p>
      <div className="my-4 w-[40%] relative z-10">
        <HorizontalPanWipe color="var(--color-stone)" width="100%" />
      </div>
      <p className="font-body text-[15px] text-ink/75 relative z-10">{award.description}</p>
    </div>
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
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );

      const icon = card.querySelector('.award-icon');
      if (icon) {
        gsap.fromTo(
          icon,
          { scale: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            delay: 0.2,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      }
    });
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-creme py-32 lg:py-40 px-6 lg:px-20 texture-grid"
    >
      <div className="max-w-[1200px] mx-auto relative z-10">
        <SectionEyebrow text="HONORS" />
        <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-ink text-center mt-4">
          AWARDS & RECOGNITION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {AWARDS.map((award) => (
            <AwardCard key={award.name} award={award} />
          ))}
        </div>
      </div>
    </section>
  );
}
