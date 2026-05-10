import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MechanicalButton from '@/components/MechanicalButton';
import HorizontalPanWipe from '@/components/HorizontalPanWipe';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Section04Adr47() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [typedLabel, setTypedLabel] = useState('');
  const reducedMotion = useReducedMotion();

  // Typewriter effect for label
  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const text = 'FEATURED ANALYSIS';
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setTypedLabel(text.slice(0, i));
            if (i >= text.length) clearInterval(interval);
          }, 30);
          observer.disconnect();
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    // Parallax video
    gsap.to(videoRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { scale: 1.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      }
    );

    gsap.fromTo(
      descRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      }
    );

    gsap.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
        },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-ink"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="./video-projects-defi.webm" type="video/webm" />
        <source src="./video-projects-defi.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-[640px] mx-auto px-6 text-center flex flex-col items-center gap-6">
        <span
          ref={labelRef}
          className="font-headline font-medium text-label uppercase tracking-[0.12em] text-terracotta"
        >
          {typedLabel}
          <span className="animate-cursor-blink">_</span>
        </span>

        <h2
          ref={titleRef}
          className="font-headline font-bold text-[48px] sm:text-display-xl uppercase text-creme opacity-0"
        >
          ADR-47
        </h2>

        <p
          ref={subtitleRef}
          className="font-headline font-medium text-[12px] sm:text-[14px] uppercase tracking-[0.06em] text-stone opacity-0"
        >
          THE CASE AGAINST PACT xUSD LAUNCH
        </p>

        <HorizontalPanWipe color="var(--color-stone)" width="60%" className="my-2" />

        <p
          ref={descRef}
          className="font-body text-[14px] sm:text-[16px] text-creme leading-[1.65] opacity-0"
        >
          A formal mathematical proof by contradiction that prevented a flawed LP-seeding
          mechanism from launching on the xBacked DAO protocol. Addressed systemic risk patterns
          later observed in the 2022 algorithmic stablecoin failures.
        </p>

        <div ref={ctaRef} className="mt-4 opacity-0">
          <MechanicalButton variant="filled-cobalt" to="/blog/adr47">
            READ THE FULL ANALYSIS &rarr;
          </MechanicalButton>
        </div>
      </div>
    </section>
  );
}
