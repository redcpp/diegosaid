import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  experience: string;
  ring: number;
}

const SKILLS: Skill[] = [
  // Ring 1 — Core Languages
  { name: 'Python', experience: '7 YEARS', ring: 1 },
  { name: 'Go', experience: 'LEARNING', ring: 1 },
  { name: 'TypeScript', experience: '5 YEARS', ring: 1 },
  { name: 'Java', experience: '2 YEARS', ring: 1 },
  { name: 'SQL', experience: '7 YEARS', ring: 1 },
  { name: 'C/C++', experience: '2 YEARS', ring: 1 },
  // Ring 2 — Frameworks & Platforms
  { name: 'Next.js', experience: 'EXPERIENCED', ring: 2 },
  { name: 'React', experience: 'EXPERIENCED', ring: 2 },
  { name: 'Vue.js', experience: 'EXPERIENCED', ring: 2 },
  { name: 'Node.js', experience: 'EXPERIENCED', ring: 2 },
  { name: 'Django', experience: 'EXPERIENCED', ring: 2 },
  { name: 'PostgreSQL', experience: 'EXPERIENCED', ring: 2 },
  { name: 'Redis', experience: 'EXPERIENCED', ring: 2 },
  { name: 'Docker', experience: 'EXPERIENCED', ring: 2 },
  // Ring 3 — Infrastructure & Cloud
  { name: 'AWS', experience: 'EXPERIENCED', ring: 3 },
  { name: 'OCI', experience: 'EXPERIENCED', ring: 3 },
  { name: 'Terraform', experience: 'EXPERIENCED', ring: 3 },
  { name: 'CI/CD', experience: 'EXPERIENCED', ring: 3 },
  { name: 'Linux', experience: 'EXPERIENCED', ring: 3 },
  { name: 'gRPC', experience: 'EXPERIENCED', ring: 3 },
  { name: 'REST APIs', experience: 'EXPERIENCED', ring: 3 },
  { name: 'RabbitMQ', experience: 'EXPERIENCED', ring: 3 },
  { name: 'Kafka', experience: 'EXPERIENCED', ring: 3 },
  // Ring 4 — Specialized Domains
  { name: 'DeFi Protocols', experience: 'EXPERIENCED', ring: 4 },
  { name: 'Smart Contracts', experience: 'EXPERIENCED', ring: 4 },
  { name: 'Genomics', experience: 'EXPERIENCED', ring: 4 },
  { name: 'LLM Inference', experience: 'EXPERIENCED', ring: 4 },
  { name: 'Quantitative Analysis', experience: 'EXPERIENCED', ring: 4 },
  { name: 'System Design', experience: 'EXPERIENCED', ring: 4 },
  { name: 'Risk Analysis', experience: 'EXPERIENCED', ring: 4 },
];

function SkillBadge({ skill }: { skill: Skill }) {
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleClick = useCallback(() => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
      setActive((a) => !a);
    }, 150);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className={`skill-badge font-headline font-medium text-[11px] uppercase tracking-[0.04em]
          px-4 py-2 border rounded-sm transition-all duration-200 cursor-pointer select-none
          ${pressed
            ? 'bg-oxblood border-oxblood text-creme scale-[0.96]'
            : active
              ? 'bg-cobalt border-cobalt text-creme'
              : 'bg-transparent border-stone text-creme hover:bg-cobalt hover:border-cobalt hover:text-creme'
          }`}
        style={{
          transitionTimingFunction: pressed ? undefined : 'var(--ease-bounce)',
        }}
      >
        {skill.name}
      </button>
      {active && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-ink border border-cobalt rounded-sm
            font-mono text-[11px] text-creme whitespace-nowrap z-20"
        >
          {skill.experience}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink border-l border-t border-cobalt rotate-45" />
        </div>
      )}
    </div>
  );
}

export default function Section07Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    const badges = sectionRef.current.querySelectorAll('.skill-badge');
    gsap.fromTo(
      badges,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-ink py-32 lg:py-40 px-6 lg:px-20"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionEyebrow text="COMPETENCIES" color="var(--color-stone)" />
        <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-creme text-center mt-4">
          SKILLS CONSTELLATION
        </h2>
        <p className="font-body text-[14px] text-stone italic text-center mt-3">
          Click any skill to see its depth.
        </p>

        {/* Center Diamond */}
        <div className="flex flex-col items-center my-10">
          <div className="w-12 h-12 border-2 border-creme rotate-45 animate-diamond-pulse" />
          <span className="font-headline font-bold text-[10px] uppercase tracking-[0.1em] text-creme mt-4">
            SYSTEMS
          </span>
        </div>

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {SKILLS.map((skill) => (
            <SkillBadge key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
