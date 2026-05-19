import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  year: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
  emphasis?: boolean;
}

const EVENTS: TimelineEvent[] = [
  {
    year: '2013',
    title: 'YOUTH SUMMIT DELEGATE',
    org: 'World Bank Group',
    description:
      'Selected to represent Mexico at the World Bank Group Youth Summit in Washington, D.C.',
    tags: ['Policy', 'Leadership'],
  },
  {
    year: '2015–2018',
    title: 'B.SC. SOFTWARE ENGINEERING',
    org: 'Universidad Autónoma de Querétaro',
    description:
      'Grade: 9.5/10. ACM-ICPC Regional Finalist (2018). Honorable Mention (2017).',
    tags: ['ACM-ICPC', '9.5/10'],
    emphasis: true,
  },
  {
    year: '2017',
    title: 'SCRUM FUNDAMENTALS CERTIFIED',
    org: 'Scrum Study',
    description: 'Professional Scrum certification for agile software development.',
    tags: ['Agile', 'Scrum'],
  },
  {
    year: '2018',
    title: 'SOFTWARE ENGINEER INTERN',
    org: 'ILHGR — Cancer Genomics Lab',
    description:
      'Built VCF/Plotein. Published in Bioinformatics, Oxford Academic. Co-authored with Oxford, UNAM, and Cambridge.',
    tags: ['Vue.js', 'Genomics', 'Published'],
    emphasis: true,
  },
  {
    year: '2019',
    title: 'SOFTWARE DEVELOPER II',
    org: 'Oracle — Big Data Service',
    description:
      'OCI image pipelines, CI/CD automation, Docker containerization, global Severity 1 support.',
    tags: ['Java', 'Python', 'Cloud'],
  },
  {
    year: '2021',
    title: 'GCP FUNDAMENTALS CERTIFIED',
    org: 'Google Cloud',
    description: 'Cloud infrastructure fundamentals certification.',
    tags: ['Cloud', 'GCP'],
  },
  {
    year: '2021',
    title: 'FULL STACK DEVELOPER (CONTRACTOR)',
    org: 'Augusto Consulting',
    description:
      'Built Decentracare CRM for hundreds of nurses. AWS Glue ETL pipelines for MiHIN (HIPAA).',
    tags: ['React', 'AWS', 'HIPAA'],
  },
  {
    year: '2021–2022',
    title: 'CORE DEVELOPER',
    org: 'xBacked DAO',
    description:
      'DeFi protocol on Algorand. Authored ADR-47 — formal proof by contradiction preventing flawed LP-seeding launch.',
    tags: ['DeFi', 'Smart Contracts', 'Risk'],
    emphasis: true,
  },
  {
    year: '2022',
    title: 'CREDENTIAL OF READINESS (CORE)',
    org: 'Harvard Business School Online',
    description: 'Business Analytics, Economics, Financial Accounting.',
    tags: ['HBS', 'Analytics', 'Economics'],
  },
  {
    year: '2020–PRESENT',
    title: 'FOUNDER & TECHNICAL DIRECTOR',
    org: 'Century 21 CAM Grupo',
    description:
      '20+ agent luxury brokerage. Built corporate tech stack, LLM inference, HDR pipeline, quantitative market intelligence.',
    tags: ['Founder', 'LLM', 'Quantitative'],
    emphasis: true,
  },
  {
    year: '2023–PRESENT',
    title: 'INDEPENDENT R&D',
    org: 'Self-Directed',
    description:
      'Private MLX inference stack on Apple Silicon. Custom Claude skills. Monte Carlo investment analysis. 1,500+ MLS transaction analysis.',
    tags: ['MLX', 'Claude', 'Monte Carlo'],
  },
  {
    year: 'PRESENT',
    title: 'STRATEGIC RETURN',
    org: 'Full-Time Engineering',
    description:
      'Returning to full-time engineering with focus on backend architecture.',
    tags: ['Go', 'Distributed Systems'],
    emphasis: true,
  },
];

function TimelineRow({ event }: { event: TimelineEvent }) {
  return (
    <article
      className="timeline-row opacity-0 group relative grid grid-cols-12 gap-x-4 lg:gap-x-8 py-8 lg:py-10 border-t border-ink/15 hover:bg-ink/[0.02] transition-colors"
      data-emphasis={event.emphasis ? 'true' : 'false'}
    >
      {/* Year column */}
      <div className="col-span-12 lg:col-span-3 relative">
        <div className="flex lg:block items-baseline gap-3">
          <span
            className={`font-headline font-bold uppercase leading-none tracking-[-0.01em] block
              ${event.emphasis ? 'text-cobalt' : 'text-ink'}
              text-[28px] sm:text-[36px] lg:text-[44px]`}
          >
            {event.year.split('–')[0]}
          </span>
          {event.year.includes('–') && (
            <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text uppercase lg:mt-2 lg:block">
              → {event.year.split('–')[1]}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="col-span-12 lg:col-span-9 mt-3 lg:mt-0">
        <h3 className="font-headline font-bold text-[16px] sm:text-[18px] uppercase text-ink leading-tight tracking-[0.005em] group-hover:text-cobalt transition-colors">
          {event.title}
        </h3>
        <p className="font-body italic text-[13px] text-stone-text mt-1">
          {event.org}
        </p>
        <p className="font-body text-[13.5px] sm:text-[14.5px] text-ink/85 leading-[1.65] mt-3 max-w-[68ch]">
          {event.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/65 border border-ink/20 px-2 py-[3px] bg-parchment/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Section06Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;
    const rows = sectionRef.current.querySelectorAll('.timeline-row');
    rows.forEach((row) => {
      gsap.fromTo(
        row,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 88%' },
        }
      );
    });
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="w-full bg-blush py-28 lg:py-36 px-6 lg:px-20 relative texture-noise overflow-hidden"
    >
      {/* Decorative numeral */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute -top-6 left-6 font-headline font-bold text-[180px] leading-none text-ink/[0.04] select-none pointer-events-none tracking-tighter"
      >
        06
      </span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        <SectionEyebrow text="CAREER TIMELINE" color="var(--color-cobalt)" />
        <h2 className="mt-4 font-headline font-bold text-[36px] sm:text-display-lg uppercase text-ink leading-[0.95] tracking-[-0.015em]">
          EVERY MILESTONE,<br />
          <span className="text-cobalt">IN ORDER</span>
        </h2>

        {/* Timeline rows */}
        <div className="mt-16 border-b border-ink/15">
          {EVENTS.map((event) => (
            <TimelineRow key={`${event.year}-${event.title}`} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
