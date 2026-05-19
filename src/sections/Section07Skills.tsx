import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  experience: string;
  active?: boolean;
}

interface Column {
  code: string;
  title: string;
  caption: string;
  skills: Skill[];
}

const COLUMNS: Column[] = [
  {
    code: 'I',
    title: 'LANGUAGES',
    caption: 'Core dialects of thought.',
    skills: [
      { name: 'Python', experience: '7 yrs', active: true },
      { name: 'Go', experience: 'Learning', active: true },
      { name: 'TypeScript', experience: '5 yrs', active: true },
      { name: 'SQL', experience: '7 yrs' },
      { name: 'Java', experience: '2 yrs' },
      { name: 'C / C++', experience: '2 yrs' },
    ],
  },
  {
    code: 'II',
    title: 'FRAMEWORKS',
    caption: 'Architectures shipped.',
    skills: [
      { name: 'Next.js', experience: 'Production', active: true },
      { name: 'React', experience: 'Production', active: true },
      { name: 'Vue.js', experience: 'Production' },
      { name: 'Node.js', experience: 'Production' },
      { name: 'Django', experience: 'Production' },
      { name: 'PostgreSQL', experience: 'Production' },
      { name: 'Redis', experience: 'Production' },
      { name: 'Docker', experience: 'Production' },
    ],
  },
  {
    code: 'III',
    title: 'INFRASTRUCTURE',
    caption: 'Cloud, transport, telemetry.',
    skills: [
      { name: 'AWS', experience: 'Production' },
      { name: 'OCI', experience: 'Production' },
      { name: 'Terraform', experience: 'Production' },
      { name: 'CI/CD', experience: 'Production' },
      { name: 'Linux', experience: 'Production', active: true },
      { name: 'gRPC', experience: 'Production' },
      { name: 'REST APIs', experience: 'Production' },
      { name: 'RabbitMQ', experience: 'Production' },
      { name: 'Kafka', experience: 'Production' },
    ],
  },
  {
    code: 'IV',
    title: 'DOMAINS',
    caption: 'Specialist territories.',
    skills: [
      { name: 'Distributed Systems', experience: 'Focus', active: true },
      { name: 'System Design', experience: 'Production', active: true },
      { name: 'LLM Inference', experience: 'R&D' },
      { name: 'Quantitative Analysis', experience: 'Production' },
      { name: 'Risk Analysis', experience: 'Production' },
      { name: 'DeFi Protocols', experience: 'Shipped' },
      { name: 'Smart Contracts', experience: 'Shipped' },
      { name: 'Genomics', experience: 'Published' },
    ],
  },
];

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <li className="skill-row opacity-0 group flex items-baseline gap-3 py-2.5 border-b border-creme/10 hover:border-cobalt/40 transition-colors">
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 translate-y-[1px]
          ${skill.active ? 'bg-cobalt shadow-[0_0_0_3px_rgba(43,76,140,0.18)]' : 'bg-stone/40'}`}
        aria-hidden="true"
      />
      <span
        className={`font-headline font-medium text-[14px] tracking-[0.005em] flex-1 min-w-0
          ${skill.active ? 'text-creme' : 'text-creme/85'} group-hover:text-cobalt transition-colors`}
      >
        {skill.name}
      </span>
      <span className="font-mono text-[10px] tracking-[0.14em] text-stone uppercase shrink-0">
        {skill.experience}
      </span>
    </li>
  );
}

function ColumnBlock({ column, idx }: { column: Column; idx: number }) {
  return (
    <div className="matrix-column opacity-0 relative flex flex-col">
      {/* Column header */}
      <div className="flex items-baseline justify-between border-b border-creme/30 pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] tracking-[0.18em] text-cobalt">
            COL. {column.code}
          </span>
          <h3 className="font-headline font-bold text-[16px] sm:text-[18px] uppercase text-creme tracking-[0.01em]">
            {column.title}
          </h3>
        </div>
        <span className="font-mono text-[10px] tracking-[0.14em] text-stone uppercase">
          {String(column.skills.length).padStart(2, '0')}
        </span>
      </div>
      <p className="font-body italic text-[12px] text-stone mt-2 leading-snug">
        {column.caption}
      </p>

      {/* Skill list */}
      <ul className="mt-4">
        {column.skills.map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </ul>

      {/* Footer index */}
      <div className="mt-auto pt-4 font-mono text-[10px] tracking-[0.16em] text-stone/60 uppercase">
        — {idx + 1} / {COLUMNS.length}
      </div>
    </div>
  );
}

export default function Section07Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.matrix-column'),
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    );

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.skill-row'),
      { x: -8, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  const total = COLUMNS.reduce((sum, col) => sum + col.skills.length, 0);
  const active = COLUMNS.reduce(
    (sum, col) => sum + col.skills.filter((s) => s.active).length,
    0
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="w-full bg-ink py-28 lg:py-36 px-6 lg:px-20 relative overflow-hidden"
    >
      {/* Faint engineering grid backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,243,239,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,239,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, black 55%, transparent 100%)',
        }}
      />

      {/* Decorative numeral */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute -top-6 right-6 font-headline font-bold text-[180px] leading-none text-creme/[0.04] select-none pointer-events-none tracking-tighter"
      >
        07
      </span>

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Registry strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-stone uppercase border-b border-creme/15 pb-3 mb-12">
          <span>SHEET · DSR/2026/007 — TECHNICAL MATRIX</span>
          <span className="text-cobalt">
            {total} CAPABILITIES · {active} ACTIVE
          </span>
          <span>SORT · BY CATEGORY</span>
        </div>

        <SectionEyebrow text="COMPETENCIES" color="var(--color-stone)" />
        <div className="mt-4 lg:flex lg:items-end lg:justify-between gap-8">
          <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-creme leading-[0.95] tracking-[-0.015em]">
            OPERATIONAL<br />
            <span className="text-cobalt">MATRIX</span>
          </h2>
          <p className="font-body italic text-[14px] text-stone mt-4 lg:mt-0 max-w-sm">
            Four columns of capability — every tool, indexed.
            <span className="block mt-1 not-italic font-mono text-[10px] tracking-[0.14em] text-cobalt uppercase">
              ● = current focus
            </span>
          </p>
        </div>

        {/* Matrix grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-12 mt-16">
          {COLUMNS.map((col, i) => (
            <ColumnBlock key={col.code} column={col} idx={i} />
          ))}
        </div>

        {/* Bottom signature row */}
        <div className="mt-16 pt-6 border-t border-creme/15 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between font-mono text-[10px] tracking-[0.18em] text-stone/70 uppercase">
          <span>VERIFIED · SELF-CERTIFIED · OPEN TO AUDIT</span>
          <span>// COMPILED 2026.05</span>
        </div>
      </div>
    </section>
  );
}
