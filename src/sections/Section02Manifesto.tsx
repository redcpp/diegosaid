import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const AXIOMS = [
  {
    n: 'I',
    title: 'CORRECTNESS',
    body: 'A proof beats consensus. If the math says no, the launch does not happen.',
  },
  {
    n: 'II',
    title: 'SYMMETRY',
    body: 'Systems should be balanced under stress. What I cannot draw, I do not ship.',
  },
  {
    n: 'III',
    title: 'EVIDENCE',
    body: 'Every claim has a benchmark. Every benchmark has a commit hash.',
  },
];

const ROLES = [
  'Software Engineer',
  'Systems Architect',
  'DeFi Protocol Designer',
  'ACM-ICPC Finalist',
  'Founder',
];

export default function Section02Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.thesis-word'),
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.axiom-row'),
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.role-pill'),
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-ink py-24 lg:py-32 px-6 lg:px-20 relative overflow-hidden"
    >
      {/* Decorative numeral */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute -top-6 left-6 font-headline font-bold text-[180px] leading-none text-creme/[0.04] select-none pointer-events-none tracking-tighter"
      >
        02
      </span>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Thesis statement */}
        <h2 className="font-headline font-medium uppercase text-creme leading-[1.05] text-[28px] sm:text-[40px] lg:text-[56px] tracking-[-0.015em]">
          <span className="thesis-word inline-block opacity-0">I build </span>
          <span className="thesis-word inline-block opacity-0 text-cobalt">systems </span>
          <span className="thesis-word inline-block opacity-0">that survive </span>
          <span className="thesis-word inline-block opacity-0">contact </span>
          <span className="thesis-word inline-block opacity-0">with reality.</span>
          <br />
          <span className="thesis-word inline-block opacity-0 italic font-body normal-case text-stone text-[18px] sm:text-[22px] lg:text-[28px] mt-3">
            Math first. Diff second.
          </span>
          <span className="thesis-word inline-block opacity-0 italic font-body normal-case text-stone text-[18px] sm:text-[22px] lg:text-[28px] ml-2">
            Conversation third.
          </span>
        </h2>

        {/* Roles strip */}
        <div className="mt-14 pt-8 border-t border-creme/15 flex flex-wrap gap-2">
          {ROLES.map((role) => (
            <span
              key={role}
              className="role-pill opacity-0 font-headline font-medium text-[12px] uppercase tracking-[0.08em] text-creme border border-creme/25 px-3 py-1.5"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Axioms */}
        <ol className="mt-14 pt-8 border-t border-creme/15 grid grid-cols-1 md:grid-cols-3 gap-px bg-creme/15 border-x border-b border-creme/15">
          {AXIOMS.map((a) => (
            <li
              key={a.n}
              className="axiom-row opacity-0 bg-ink p-7 lg:p-8 flex flex-col gap-3 relative group hover:bg-cobalt/10 transition-colors"
            >
              <span className="font-headline font-bold text-[42px] leading-none text-cobalt tracking-[-0.02em]">
                {a.n}
              </span>
              <h3 className="font-headline font-bold text-[16px] uppercase text-creme tracking-[0.005em] mt-2">
                {a.title}
              </h3>
              <p className="font-body text-[13.5px] text-stone leading-[1.7]">
                {a.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
