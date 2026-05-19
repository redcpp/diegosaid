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
  skills: Skill[];
}

const COLUMNS: Column[] = [
  {
    code: 'I',
    title: 'LANGUAGES',
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

function ColumnBlock({ column }: { column: Column }) {
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
      </div>

      {/* Skill list */}
      <ul className="mt-4">
        {column.skills.map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </ul>
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

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="w-full bg-ink py-20 lg:py-24 px-6 lg:px-20 relative overflow-hidden"
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

      <div className="max-w-[1280px] mx-auto relative z-10">
        <SectionEyebrow text="COMPETENCIES" color="var(--color-stone)" />
        <div className="mt-4 mb-12">
          <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-creme leading-[0.95] tracking-[-0.015em]">
            OPERATIONAL<br />
            <span className="text-cobalt">MATRIX</span>
          </h2>
        </div>

        {/* Matrix grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-12 mt-16">
          {COLUMNS.map((col) => (
            <ColumnBlock key={col.code} column={col} />
          ))}
        </div>
      </div>
    </section>
  );
}
