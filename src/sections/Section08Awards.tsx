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
}

const AWARDS: Award[] = [
  {
    serial: 'REG-2018/01',
    name: 'ACM-ICPC Regional Finalist',
    year: '2018',
    org: 'ACM International Collegiate Programming Contest',
    region: 'Mexico & Central America',
    description:
      'Top regional standing in algorithmic problem solving — combinatorics, graph theory, dynamic programming under contest time.',
  },
  {
    serial: 'REG-2017/02',
    name: 'ACM-ICPC Honorable Mention',
    year: '2017',
    org: 'ACM International Collegiate Programming Contest',
    region: 'Mexico & Central America',
    description:
      'Recognized for technical depth and consistency across a multi-round programming gauntlet.',
  },
];

function AwardCard({ award }: { award: Award }) {
  return (
    <article className="award-card opacity-0 group relative bg-parchment border border-ink/15 p-7 lg:p-9 flex flex-col h-full overflow-hidden">
      {/* Body */}
      <div className="relative z-10 flex flex-col items-start gap-5">
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
    });
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="honors"
      className="w-full bg-creme py-20 lg:py-24 px-6 lg:px-20 texture-grid relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto relative z-10">
        <SectionEyebrow text="HONORS" />
        <div className="mt-4 mb-12">
          <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-ink leading-[0.95] tracking-[-0.015em]">
            AWARDS &amp;<br />
            <span className="text-cobalt">RECOGNITION</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-16 max-w-[860px]">
          {AWARDS.map((award) => (
            <AwardCard key={award.serial} award={award} />
          ))}
        </div>
      </div>
    </section>
  );
}
