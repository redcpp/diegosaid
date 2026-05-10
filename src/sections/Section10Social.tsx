import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface SocialLink {
  platform: string;
  url: string;
  href: string;
}

const SOCIALS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'linkedin.com/in/redcpp', href: 'https://linkedin.com/in/redcpp' },
  { platform: 'GitHub', url: 'github.com/redcpp', href: 'https://github.com/redcpp' },
  { platform: 'Website', url: 'diegosaid.com', href: 'https://diegosaid.com' },
];

export default function Section10Social() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typedCoords, setTypedCoords] = useState('');
  const reducedMotion = useReducedMotion();

  // Typewriter for coordinates
  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const text = '20.6975° N, 105.2921° W';
          let i = 0;
          const delayTimer = setTimeout(() => {
            const interval = setInterval(() => {
              i++;
              setTypedCoords(text.slice(0, i));
              if (i >= text.length) clearInterval(interval);
            }, 40);
            return () => clearInterval(interval);
          }, 800);
          observer.disconnect();
          return () => clearTimeout(delayTimer);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    const links = sectionRef.current.querySelectorAll('.social-link');
    gsap.fromTo(
      links,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.location-card',
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        delay: 0.4,
        ease: 'back.out(1.5)',
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
      <div className="max-w-[500px] mx-auto flex flex-col items-center">
        <SectionEyebrow text="ELSEWHERE" color="var(--color-stone)" />
        <h2 className="font-headline font-bold text-[28px] sm:text-display-md uppercase text-creme text-center mt-4">
          FIND ME ONLINE
        </h2>

        {/* Social Links */}
        <div className="w-full flex flex-col gap-4 mt-12">
          {SOCIALS.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link opacity-0 flex items-center justify-between h-14 px-6 border border-stone rounded-sm
                hover:border-cobalt hover:bg-cobalt/10 transition-all duration-300 group"
              onMouseDown={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'scale(0.97)';
              }}
              onMouseUp={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'scale(1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'scale(1)';
              }}
            >
              <span className="font-headline font-medium text-label uppercase tracking-[0.08em] text-stone">
                {social.platform}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-body text-[14px] text-creme">{social.url}</span>
                <span className="text-cobalt group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </a>
          ))}
        </div>

        {/* Location Card */}
        <div className="location-card opacity-0 mt-12 w-full bg-ink border border-stone rounded-sm p-8 text-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cobalt mx-auto">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p className="font-headline font-medium text-label uppercase tracking-[0.08em] text-stone mt-4">
            HEADQUARTERS
          </p>
          <p className="font-mono text-[18px] sm:text-[20px] text-creme tracking-[0.05em] mt-3">
            {typedCoords}
            {!typedCoords.includes('W') && <span className="animate-cursor-blink">_</span>}
          </p>
          <p className="font-body text-[14px] text-stone mt-2">
            Nuevo Vallarta, Nayarit, M&eacute;xico
          </p>
          <p className="font-mono text-[12px] text-stone mt-1">
            UTC-6 (Central Time)
          </p>
        </div>
      </div>
    </section>
  );
}
