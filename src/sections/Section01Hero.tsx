import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MechanicalButton from '@/components/MechanicalButton';
import FuturisticScrollIndicator from '@/components/FuturisticScrollIndicator';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const CROSSFADE_DURATION = 1; // seconds
const MOBILE_QUERY = '(max-width: 639px)';

const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const getMobileSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
const getMobileServerSnapshot = () => false;

function CornerBracket({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const map = {
    tl: 'top-6 left-6 border-t border-l',
    tr: 'top-6 right-6 border-t border-r',
    bl: 'bottom-6 left-6 border-b border-l',
    br: 'bottom-6 right-6 border-b border-r',
  };
  return (
    <span
      aria-hidden="true"
      className={`absolute w-7 h-7 ${map[pos]} border-creme/40 pointer-events-none`}
    />
  );
}

export default function Section01Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const reducedMotion = useReducedMotion();

  const durationsRef = useRef<{ 1?: number; 2?: number }>({});
  const timeoutsRef = useRef<{
    crossfade?: ReturnType<typeof setTimeout>;
    cleanup?: ReturnType<typeof setTimeout>;
  }>({});

  const clearTimeouts = useCallback(() => {
    if (timeoutsRef.current.crossfade) clearTimeout(timeoutsRef.current.crossfade);
    if (timeoutsRef.current.cleanup) clearTimeout(timeoutsRef.current.cleanup);
  }, []);

  const startCrossfade = useCallback((from: 1 | 2) => {
    const to = from === 1 ? 2 : 1;
    const fromRef = from === 1 ? video1Ref : video2Ref;
    const toRef = to === 1 ? video1Ref : video2Ref;

    if (!toRef.current) return;

    toRef.current.currentTime = 0;
    toRef.current.play().catch(() => {});
    setActiveVideo(to);

    timeoutsRef.current.cleanup = setTimeout(() => {
      fromRef.current?.pause();
    }, CROSSFADE_DURATION * 1000);
  }, []);

  const scheduleCrossfade = useCallback(
    (videoNum: 1 | 2) => {
      const duration = durationsRef.current[videoNum];
      if (!duration) return;

      clearTimeouts();
      const delay = Math.max(0, (duration - CROSSFADE_DURATION) * 1000);
      timeoutsRef.current.crossfade = setTimeout(() => {
        startCrossfade(videoNum);
      }, delay);
    },
    [clearTimeouts, startCrossfade]
  );

  const handleLoadedMetadata = useCallback((videoNum: 1 | 2) => {
    const ref = videoNum === 1 ? video1Ref : video2Ref;
    if (ref.current && ref.current.duration && isFinite(ref.current.duration)) {
      durationsRef.current[videoNum] = ref.current.duration;
    }
  }, []);

  const handlePlay = useCallback(
    (videoNum: 1 | 2) => {
      scheduleCrossfade(videoNum);
    },
    [scheduleCrossfade]
  );

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      hudRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      0
    )
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -10 },
        { opacity: 0.85, y: 0, duration: 0.6, ease: 'power2.out' },
        0.2
      )
      .fromTo(
        titleRef.current,
        { scale: 0.5, opacity: 0, letterSpacing: '0.2em' },
        { scale: 1, opacity: 1, letterSpacing: '-0.02em', duration: 0.8, ease: 'power4.out' },
        0.4
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 0.85, y: 0, duration: 0.6, ease: 'power2.out' },
        1.0
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.3
      )
      .fromTo(
        metaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.5
      );

    // Scroll exit
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '20% top',
        scrub: true,
      },
    });

    // Parallax video
    gsap.to(video1Ref.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to(video2Ref.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Scroll indicator + HUD fade on scroll
    gsap.to([scrollRef.current, hudRef.current], {
      opacity: 0,
      duration: 0.3,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: '200px top',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);

  const navigate = useNavigate();
  const goToProjects = () => {
    navigate('/projects');
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #2B4C8C 0%, #1A1A1A 100%)' }}
    >
      {/* Video Background — Loop Connector (A) */}
      <video
        ref={video1Ref}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="./video-hero-poster.jpg"
        onLoadedMetadata={() => handleLoadedMetadata(1)}
        onPlay={() => handlePlay(1)}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          display: isMobile ? 'none' : 'block',
          opacity: activeVideo === 1 ? 1 : 0,
          transition: `opacity ${CROSSFADE_DURATION}s ease-in-out`,
        }}
      >
        <source src="./video-hero-loop-connector.webm" type="video/webm" />
        <source src="./video-hero-loop-connector.mp4" type="video/mp4" />
      </video>

      {/* Video Background — Hero Original (B) */}
      <video
        ref={video2Ref}
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={() => handleLoadedMetadata(2)}
        onPlay={() => handlePlay(2)}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          display: isMobile ? 'none' : 'block',
          opacity: activeVideo === 2 ? 1 : 0,
          transition: `opacity ${CROSSFADE_DURATION}s ease-in-out`,
        }}
      >
        <source src="./video-hero-dolly.webm" type="video/webm" />
        <source src="./video-hero-dolly.mp4" type="video/mp4" />
      </video>

      {/* Mobile gradient fallback */}
      {isMobile && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, #2B4C8C 0%, #1A1A1A 100%)' }}
        />
      )}

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      {/* Faint grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,243,239,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,239,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, transparent 0%, transparent 30%, black 100%)',
        }}
      />

      {/* Diamond watermark — symmetry motif */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="border border-creme/[0.06]"
          style={{ width: '60vw', height: '60vw', transform: 'rotate(45deg)' }}
        />
        <div
          className="absolute border border-creme/[0.04]"
          style={{ width: '40vw', height: '40vw', transform: 'rotate(45deg)' }}
        />
      </div>

      {/* HUD — corner brackets and registry */}
      <div ref={hudRef} className="absolute inset-0 pointer-events-none z-10 opacity-0">
        <CornerBracket pos="tl" />
        <CornerBracket pos="tr" />
        <CornerBracket pos="bl" />
        <CornerBracket pos="br" />

        {/* Top registry strip */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4 font-mono text-[10px] tracking-[0.18em] text-creme/55 uppercase">
          <span>DSR/2026/000</span>
          <span className="w-1 h-1 bg-creme/40 rounded-full" />
          <span>COVER · REV 04</span>
          <span className="w-1 h-1 bg-creme/40 rounded-full" />
          <span className="text-cobalt brightness-150">FILE OPEN</span>
        </div>

        {/* Bottom-left coords */}
        <div className="absolute bottom-6 left-12 hidden lg:flex flex-col font-mono text-[10px] tracking-[0.16em] text-creme/55 uppercase">
          <span>LAT 20.6975°N</span>
          <span>LON 105.2921°W</span>
        </div>

        {/* Bottom-right status */}
        <div className="absolute bottom-6 right-12 hidden lg:flex flex-col items-end font-mono text-[10px] tracking-[0.16em] text-creme/55 uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
            SYSTEM · NOMINAL
          </span>
          <span>UPTIME 99.97%</span>
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center gap-4 px-6"
      >
        <span
          ref={eyebrowRef}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-creme/85 opacity-0 flex items-center gap-3"
        >
          <span className="w-6 h-px bg-creme/50" />
          EST. 1996 · ENGINEER
          <span className="w-6 h-px bg-creme/50" />
        </span>

        <h1
          ref={titleRef}
          className="font-headline font-bold text-[48px] sm:text-[64px] lg:text-display-xl uppercase text-creme opacity-0"
          style={{ willChange: 'transform, opacity, letter-spacing' }}
        >
          DIEGO SAID
        </h1>

        <p
          ref={subtitleRef}
          className="font-body italic text-body-lg text-creme opacity-0 max-w-md"
        >
          Where Symmetry Is Policy
        </p>

        <div ref={ctaRef} className="mt-4 opacity-0">
          <MechanicalButton variant="filled" onClick={goToProjects}>ENTER PORTFOLIO</MechanicalButton>
        </div>

        {/* Specsheet strip */}
        <div
          ref={metaRef}
          className="opacity-0 mt-10 hidden sm:flex items-center gap-6 font-mono text-[10px] tracking-[0.18em] text-creme/65 uppercase"
        >
          <span>DISCIPLINE · SYSTEMS</span>
          <span className="w-px h-3 bg-creme/30" />
          <span>STACK · Go / Distributed</span>
          <span className="w-px h-3 bg-creme/30" />
          <span>STATUS · OPEN</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <FuturisticScrollIndicator color="#F5F3EF" />
      </div>
    </section>
  );
}
