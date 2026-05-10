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
}

const EVENTS: TimelineEvent[] = [
  {
    year: '2013',
    title: 'YOUTH SUMMIT DELEGATE',
    org: 'World Bank Group',
    description: 'Selected to represent Mexico at the World Bank Group Youth Summit in Washington, D.C.',
    tags: ['Policy', 'Leadership'],
  },
  {
    year: '2015–2018',
    title: 'B.SC. SOFTWARE ENGINEERING',
    org: 'Universidad Autonoma de Queretaro',
    description: 'Grade: 9.5/10. ACM-ICPC Regional Finalist (2018). Honorable Mention (2017).',
    tags: ['ACM-ICPC', '9.5/10'],
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
    description: 'Built VCF/Plotein. Published in Bioinformatics, Oxford Academic. Co-authored with Oxford, UNAM, and Cambridge.',
    tags: ['Vue.js', 'Genomics', 'Published'],
  },
  {
    year: '2019',
    title: 'SOFTWARE DEVELOPER II',
    org: 'Oracle — Big Data Service',
    description: 'OCI image pipelines, CI/CD automation, Docker containerization, global Severity 1 support.',
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
    description: 'Built Decentracare CRM for hundreds of nurses. AWS Glue ETL pipelines for MiHIN (HIPAA).',
    tags: ['React', 'AWS', 'HIPAA'],
  },
  {
    year: '2021–2022',
    title: 'CORE DEVELOPER',
    org: 'xBacked DAO',
    description: 'DeFi protocol on Algorand. Authored ADR-47 — formal proof by contradiction preventing flawed LP-seeding launch.',
    tags: ['DeFi', 'Smart Contracts', 'Risk'],
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
    description: '20+ agent luxury brokerage. Built corporate tech stack, LLM inference, HDR pipeline, quantitative market intelligence.',
    tags: ['Founder', 'LLM', 'Quantitative'],
  },
  {
    year: '2023–PRESENT',
    title: 'INDEPENDENT R&D',
    org: 'Self-Directed',
    description: 'Private MLX inference stack on Apple Silicon. Custom Claude skills. Monte Carlo investment analysis. 1,500+ MLS transaction analysis.',
    tags: ['MLX', 'Claude', 'Monte Carlo'],
  },
  {
    year: 'PRESENT',
    title: 'STRATEGIC RETURN',
    org: 'Full-Time Engineering',
    description: 'Executing a strategic return to full-time engineering with focus on Go, distributed systems, and cloud-native backend architecture.',
    tags: ['Go', 'Distributed Systems'],
  },
];

function TimelineCard({ event, side }: { event: TimelineEvent; side: 'left' | 'right' }) {
  return (
    <div
      className={`timeline-card opacity-0 relative flex items-start gap-4
        ${side === 'left' ? 'lg:flex-row-reverse lg:text-right' : ''}`}
      data-side={side}
    >
      <div className="hidden lg:block w-[calc(50%-40px)]" />
      <div className="relative flex flex-col items-center">
        <div className="timeline-dot w-4 h-4 rounded-full border-2 border-cobalt bg-creme opacity-0" />
      </div>
      <div className="flex-1 lg:w-[calc(50%-40px)] bg-blush rounded-sm border border-ink/10 p-6 lg:p-8 relative z-10">
        {/* Top gradient for studio lighting */}
        <div
          className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none z-0 rounded-t-sm"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)' }}
        />
        <span className="font-headline font-medium text-label uppercase tracking-[0.1em] text-cobalt relative z-10">
          {event.year}
        </span>
        <h3 className="font-headline font-bold text-[18px] uppercase text-ink mt-2 leading-tight relative z-10">
          {event.title}
        </h3>
        <p className="font-body text-[13px] text-stone-text italic mt-1 relative z-10">{event.org}</p>
        <p className="font-body text-[13px] sm:text-[14px] text-ink/85 leading-[1.6] mt-3 relative z-10">
          {event.description}
        </p>
        <div className={`flex flex-wrap gap-2 mt-4 relative z-10 ${side === 'left' ? 'lg:justify-end' : ''}`}>
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="font-headline font-medium text-[10px] uppercase tracking-[0.04em] border border-ink/15 text-ink/75 px-2 py-0.5 bg-transparent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Section06Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || !lineRef.current || reducedMotion) return;

    // Timeline line drawing
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: true,
        },
      }
    );

    // Cards stagger in
    const cards = sectionRef.current.querySelectorAll('.timeline-card');
    cards.forEach((card) => {
      const side = card.getAttribute('data-side');
      gsap.fromTo(
        card,
        { x: side === 'left' ? -40 : 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );

      // Dot fade (smooth, not bouncy)
      const dot = card.querySelector('.timeline-dot');
      if (dot) {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
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
      className="w-full bg-blush py-32 lg:py-40 px-6 lg:px-20 relative texture-noise"
    >
      <div className="max-w-[1200px] mx-auto relative z-10">
        <SectionEyebrow text="CAREER TIMELINE" color="var(--color-cobalt)" />
        <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-ink text-center mt-4">
          EVERY MILESTONE, IN ORDER
        </h2>

        <div className="relative mt-20">
          {/* Center Line */}
          <div
            ref={lineRef}
            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[2px] bg-stone origin-top"
            style={{ transform: 'scaleY(0)' }}
          />

          {/* Events */}
          <div className="space-y-12 lg:space-y-16 relative">
            {EVENTS.map((event, i) => (
              <TimelineCard
                key={`${event.year}-${event.title}`}
                event={event}
                side={i % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
