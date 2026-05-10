import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Section01PageHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [eyebrowText, setEyebrowText] = useState('');
  const eyebrowStarted = useRef(false);

  // Typewriter eyebrow effect
  useEffect(() => {
    if (eyebrowStarted.current) return;
    eyebrowStarted.current = true;

    const fullText = '// \u2501\u2501\u2501 ENGINEERING PORTFOLIO \u2501\u2501\u2501';
    let i = 0;
    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setEyebrowText(fullText.slice(0, i));
        if (i >= fullText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(delayTimer);
  }, []);

  // GSAP character split + entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split title into character spans
      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        titleRef.current.innerHTML = '';
        text.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'scale(0.8)';
          titleRef.current!.appendChild(span);
        });

        // Animate characters
        gsap.to(titleRef.current.children, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.03,
          ease: 'power4.out',
          delay: 0.5,
        });
      }

      // Subtitle fade up
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.9 }
        );
      }

      // Stats stagger
      if (statsRef.current) {
        const statItems = statsRef.current.children;
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 1.2,
          }
        );
      }

      // Ambient circle pulse
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          scale: 1.05,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '70vh',
        backgroundColor: 'var(--color-ink)',
      }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/pattern-grid.svg)',
          backgroundSize: '40px 40px',
          opacity: 0.2,
        }}
      />

      {/* Pulsing cobalt ambient circle */}
      <div
        ref={circleRef}
        className="absolute pointer-events-none"
        style={{
          width: 'min(400px, 80vw)',
          height: 'min(400px, 80vw)',
          borderRadius: '50%',
          backgroundColor: 'var(--color-cobalt)',
          opacity: 0.08,
          filter: 'blur(80px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-24">
        {/* Eyebrow typewriter */}
        <span
          className="font-mono text-label tracking-[0.04em] block mb-6"
          style={{ color: 'var(--color-stone)' }}
        >
          {eyebrowText}
          <span className="animate-cursor-blink">_</span>
        </span>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-headline font-bold text-[48px] sm:text-[64px] md:text-display-xl uppercase tracking-[-0.02em]"
          style={{
            color: 'var(--color-creme)',
            lineHeight: '0.9em',
          }}
        >
          SELECTED WORKS
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-[16px] sm:text-[18px] italic text-center mx-auto mt-6 opacity-0"
          style={{
            color: 'var(--color-stone)',
            maxWidth: '600px',
          }}
        >
          Seven projects. Seven worlds. One obsession with correctness.
        </p>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-8"
        >
          {[
            { num: '7', label: 'PROJECTS' },
            { num: '7+', label: 'YEARS' },
            { num: '5', label: 'DOMAINS' },
            { num: '2', label: 'PUBLICATIONS' },
          ].map((stat) => (
            <div key={stat.label} className="text-center opacity-0">
              <span
                className="font-headline font-medium text-[12px] sm:text-label uppercase tracking-[0.1em]"
                style={{ color: 'var(--color-cobalt)' }}
              >
                {stat.num}
              </span>{' '}
              <span
                className="font-headline font-medium text-[12px] sm:text-label uppercase tracking-[0.1em]"
                style={{ color: 'var(--color-stone)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
