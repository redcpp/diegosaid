import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HorizontalPanWipe from '@/components/HorizontalPanWipe';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  'Software', 'Engineer.', 'Systems', 'Architect.', 'DeFi', 'Protocol', 'Designer.',
  'ACM-ICPC', 'Finalist.', 'Founder.',
];

export default function Section02Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.fromTo(
      wordsRef.current.filter(Boolean),
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-ink py-24 lg:py-32 px-6 lg:px-20"
    >
      <HorizontalPanWipe color="var(--color-stone)" />
      <div className="max-w-[800px] mx-auto text-center mt-12">
        <p className="font-body text-body-lg text-creme leading-relaxed">
          {WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              className="inline-block mr-[0.4em] opacity-0"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
