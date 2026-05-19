import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MechanicalButton from '@/components/MechanicalButton';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const META = [
  { label: 'OUTCOME', value: 'Launch averted' },
  { label: 'STATUS', value: 'Published · 2022' },
];

export default function Section04Adr47() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fileNoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

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

    gsap.fromTo(
      fileNoRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );

    gsap.fromTo(
      titleRef.current,
      { scale: 1.3, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
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
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
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
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
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
        scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' },
      }
    );

    gsap.fromTo(
      metaRef.current?.querySelectorAll('.adr-meta-row') ?? [],
      { x: -10, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' },
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
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      >
        <source src="./video-projects-defi.webm" type="video/webm" />
        <source src="./video-projects-defi.mp4" type="video/mp4" />
      </video>

      {/* Dark scrim */}
      <div className="absolute inset-0 bg-ink/50 pointer-events-none" />

      <div className="relative z-10 max-w-[920px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: File no. + meta */}
        <div ref={fileNoRef} className="opacity-0 lg:col-span-4">
          <div className="border border-creme/20 p-5 bg-ink/40 backdrop-blur-[1px]">
            <p className="font-mono text-[10px] tracking-[0.18em] text-creme/55 uppercase">
              FILE NO.
            </p>
            <p className="font-headline font-bold text-[28px] sm:text-[36px] uppercase text-creme leading-none mt-1 tracking-[-0.01em]">
              ADR-047/22
            </p>
            <p className="font-mono italic text-[11px] text-stone mt-3">
              xBacked DAO · Algorand
            </p>

            <div ref={metaRef} className="mt-5 pt-4 border-t border-creme/15 space-y-2">
              {META.map((row) => (
                <div
                  key={row.label}
                  className="adr-meta-row opacity-0 grid grid-cols-3 gap-2 items-baseline"
                >
                  <span className="col-span-1 font-mono text-[9px] tracking-[0.18em] text-creme/45 uppercase">
                    {row.label}
                  </span>
                  <span className="col-span-2 font-headline text-[11px] tracking-[0.04em] text-creme uppercase">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Main content */}
        <div className="lg:col-span-8 flex flex-col items-start gap-5 text-left">
          <h2
            ref={titleRef}
            className="font-headline font-bold text-[64px] sm:text-[96px] lg:text-[128px] uppercase text-creme opacity-0 leading-[0.85] tracking-[-0.03em]"
          >
            ADR<span className="text-terracotta">-47</span>
          </h2>

          <p
            ref={subtitleRef}
            className="font-headline font-medium text-[13px] sm:text-[15px] uppercase tracking-[0.06em] text-stone opacity-0 border-l-2 border-terracotta/60 pl-3"
          >
            THE CASE AGAINST PACT xUSD LAUNCH
          </p>

          <p
            ref={descRef}
            className="font-body text-[15px] sm:text-[16.5px] text-creme/90 leading-[1.7] opacity-0 max-w-[60ch]"
          >
            A formal proof by contradiction that prevented a flawed LP-seeding mechanism from
            launching. Anticipated risk patterns later seen in the
            <span className="text-terracotta"> 2022 algorithmic stablecoin failures</span>.
          </p>

          <div ref={ctaRef} className="mt-3 opacity-0 flex items-center gap-4">
            <MechanicalButton variant="filled-cobalt" to="/blog/adr47">
              READ THE FULL ANALYSIS &rarr;
            </MechanicalButton>
          </div>
        </div>
      </div>
    </section>
  );
}
