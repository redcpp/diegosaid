import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  href: string;
  glyph: 'in' | 'gh';
}

const SOCIALS: SocialLink[] = [
  {
    platform: 'LinkedIn',
    handle: '@redcpp',
    url: 'linkedin.com/in/redcpp',
    href: 'https://linkedin.com/in/redcpp',
    glyph: 'in',
  },
  {
    platform: 'GitHub',
    handle: '@redcpp',
    url: 'github.com/redcpp',
    href: 'https://github.com/redcpp',
    glyph: 'gh',
  },
];

function Glyph({ kind }: { kind: SocialLink['glyph'] }) {
  if (kind === 'in') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="8" y1="10" x2="8" y2="17" />
        <circle cx="8" cy="6.5" r="0.6" fill="currentColor" />
        <path d="M12 17v-4a2.5 2.5 0 0 1 5 0v4" />
        <line x1="12" y1="10" x2="12" y2="17" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.87a3.4 3.4 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 5a5.07 5.07 0 0 0-.14-3.77S17.65 1 15 2.48a13.4 13.4 0 0 0-7 0C5.35 1 4.14 1.23 4.14 1.23A5.07 5.07 0 0 0 4 5a5.44 5.44 0 0 0-1.5 3.5c0 5.45 3.3 6.65 6.44 7A3.37 3.37 0 0 0 8 18.13V22" />
    </svg>
  );
}

function CompassRose() {
  return (
    <div className="relative w-32 h-32 mx-auto" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-creme/15" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-cobalt">
          <line x1="50" y1="8" x2="50" y2="92" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="1" />
          <polygon points="50,12 56,50 50,46 44,50" fill="currentColor" />
          <polygon points="50,88 56,50 50,54 44,50" fill="currentColor" opacity="0.4" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
        </svg>
      </div>
      <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.18em] text-creme/70">N</span>
    </div>
  );
}

export default function Section10Social() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const FULL_COORDS = '20.6975° N, 105.2921° W';

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.social-card'),
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );

    gsap.fromTo(
      '.location-card',
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="elsewhere"
      className="w-full bg-ink py-24 lg:py-32 px-6 lg:px-20 relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto relative z-10">
        <SectionEyebrow text="ELSEWHERE" color="var(--color-stone)" />

        <div className="mt-4 mb-14">
          <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-creme leading-[0.95] tracking-[-0.015em]">
            FIND ME<br />
            <span className="text-cobalt">ONLINE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Social cards */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card opacity-0 group flex items-center gap-5 p-5 lg:p-6 border border-creme/15 hover:border-cobalt hover:bg-cobalt/[0.06] transition-all relative overflow-hidden"
              >
                {/* Glyph badge */}
                <div className="shrink-0 w-12 h-12 rounded-sm border border-creme/20 flex items-center justify-center text-stone group-hover:text-cobalt group-hover:border-cobalt transition-colors">
                  <Glyph kind={social.glyph} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span className="font-headline font-medium text-[12px] uppercase tracking-[0.1em] text-stone">
                    {social.platform}
                  </span>
                  <div className="font-headline font-bold text-[18px] sm:text-[20px] text-creme mt-1 tracking-[-0.005em] group-hover:text-cobalt transition-colors">
                    {social.url}
                  </div>
                </div>

                {/* Arrow */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-stone uppercase">
                    {social.handle}
                  </span>
                  <span className="text-cobalt text-xl group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Coordinates / location card */}
          <div className="lg:col-span-5">
            <div className="location-card opacity-0 bg-ink border border-creme/15 p-7 lg:p-8 flex flex-col">
              {/* Compass */}
              <div className="mt-2">
                <CompassRose />
              </div>

              {/* Coordinates */}
              <p className="font-mono text-[16px] sm:text-[18px] text-creme tracking-[0.05em] mt-6 text-center">
                {FULL_COORDS}
              </p>

              {/* Location */}
              <div className="mt-5 pt-5 border-t border-creme/15 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.18em] text-stone/70 uppercase">
                    CITY
                  </p>
                  <p className="font-headline font-medium text-[12px] text-creme mt-1 uppercase tracking-[0.04em]">
                    Nuevo Vallarta
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.18em] text-stone/70 uppercase">
                    STATE
                  </p>
                  <p className="font-headline font-medium text-[12px] text-creme mt-1 uppercase tracking-[0.04em]">
                    Nayarit
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.18em] text-stone/70 uppercase">
                    TZ
                  </p>
                  <p className="font-headline font-medium text-[12px] text-creme mt-1 uppercase tracking-[0.04em]">
                    UTC-6
                  </p>
                </div>
              </div>
            </div>

            {/* Spoken languages */}
            <div className="location-card opacity-0 mt-4 bg-ink border border-creme/15 p-6 lg:p-7">
              <p className="font-mono text-[9px] tracking-[0.18em] text-stone/70 uppercase">
                LANGUAGES
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="font-headline font-medium text-[13px] text-creme uppercase tracking-[0.04em]">
                    Spanish
                  </p>
                  <p className="font-body italic text-[11px] text-stone mt-1">Native</p>
                </div>
                <div>
                  <p className="font-headline font-medium text-[13px] text-creme uppercase tracking-[0.04em]">
                    English
                  </p>
                  <p className="font-body italic text-[11px] text-stone mt-1">Fluent</p>
                </div>
                <div>
                  <p className="font-headline font-medium text-[13px] text-creme uppercase tracking-[0.04em]">
                    Italian
                  </p>
                  <p className="font-body italic text-[11px] text-stone mt-1">Conversational</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
