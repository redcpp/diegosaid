import { useRef } from 'react';
import { useLazyVideo } from '@/hooks/use-lazy-video';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HorizontalPanWipe from '@/components/HorizontalPanWipe';
import MechanicalButton from '@/components/MechanicalButton';

gsap.registerPlugin(ScrollTrigger);

const METRICS = ['DEFI PROTOCOL', 'PROOF BY CONTRACTION', 'RISK PREVENTION', 'ALGORAND'];

export default function Section03Xbacked() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const adrBoxRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    if (videoRef.current) {
      tl.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 1.0, ease: 'power2.out' }, 0);
    }
    if (leftRef.current) {
      tl.fromTo(leftRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.15);
    }
    if (rightRef.current) {
      tl.fromTo(rightRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.3);
    }
    if (adrBoxRef.current) {
      tl.fromTo(adrBoxRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, 0.5);
    }
    if (metricsRef.current) {
      const pills = metricsRef.current.querySelectorAll('.metric-pill');
      tl.fromTo(pills, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.6);
    }
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.8);
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="xbacked" className="w-full bg-blush pt-32 lg:pt-40 pb-24 px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Horizontal Pan Wipe Divider */}
        <HorizontalPanWipe className="mb-16" />

        {/* Part A — Video Diorama */}
        <div
          ref={videoRef}
          className="relative w-full aspect-video max-w-[1200px] mx-auto rounded-lg border border-stone overflow-hidden opacity-0"
        >
          <video
            ref={useLazyVideo()}
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover"
            aria-label="xBacked DAO DeFi protocol showcase video"
          >
            <source src="/video-projects-defi.webm" type="video/webm" />
            <source src="/video-projects-defi.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          {/* Label overlay */}
          <div className="absolute bottom-6 left-6">
            <span className="font-headline font-bold text-[48px] text-creme opacity-30 block leading-none">02</span>
            <span className="font-headline font-bold text-[24px] uppercase text-creme block leading-tight">XBACKED DAO</span>
          </div>
        </div>

        {/* Part B — Case Study Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Left Column */}
          <div ref={leftRef} className="opacity-0">
            <h2 className="font-headline font-bold text-[28px] sm:text-display-md uppercase text-ink leading-tight">
              DECENTRALIZED FINANCE PROTOCOL &amp; FORMAL RISK ANALYSIS
            </h2>
            <p className="font-headline font-medium text-label uppercase text-stone tracking-[0.08em] mt-4">
              AUGUST 2021 — MAY 2022
            </p>
            <p className="font-body text-[14px] text-cobalt mt-2">
              Core Developer
            </p>
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="opacity-0">
            <p className="font-body text-[16px] text-ink leading-[1.65]">
              Core developer on xBacked DAO, a DeFi lending/borrowing protocol
              on the Algorand blockchain featuring the xUSD stablecoin.
              Implemented staking and governance features. Authored ADR-47: The
              Case Against Pact xUSD Launch — a formal mathematical proof by
              contradiction demonstrating that the proposed LP-seeding mechanism
              contained fundamental economic flaws. The analysis prevented the
              mechanism from launching and addressed systemic risk patterns
              later observed in the 2022 algorithmic stablecoin failures.
            </p>

            {/* ADR-47 Highlight Box */}
            <div
              ref={adrBoxRef}
              className="mt-8 opacity-0 bg-ink rounded-lg p-8"
            >
              <span className="font-headline font-medium text-[11px] uppercase tracking-[0.1em] block mb-4 text-oxblood">
                ADR-47 HIGHLIGHT
              </span>
              <blockquote
                className="font-body text-[14px] italic pl-4 text-creme leading-[1.65]"
                style={{ borderLeft: '3px solid var(--color-oxblood)' }}
              >
                The proposed LP-seeding mechanism can be shown to violate the
                no-arbitrage condition through a proof by contradiction. Assume
                the mechanism maintains the peg...
              </blockquote>
              <p className="font-body text-[12px] mt-4 text-right text-stone">
                — ADR-47, Diego Said Anaya Mancilla
              </p>
            </div>

            {/* Key Metrics */}
            <div ref={metricsRef} className="flex flex-wrap gap-4 mt-8">
              {METRICS.map((m) => (
                <span
                  key={m}
                  className="metric-pill font-headline font-medium text-[11px] uppercase tracking-[0.04em] text-cobalt bg-creme px-4 py-1.5 rounded opacity-0"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Tech Stack */}
            <p className="font-mono text-[12px] text-stone mt-4">
              Python · Algorand Smart Contracts · PyTeal · DeFi Protocol Design · Risk Analysis
            </p>

            {/* CTA */}
            <div ref={ctaRef} className="mt-6 opacity-0">
              <MechanicalButton
                variant="filled-cobalt"
                to="/blog/adr47"
              >
                READ ADR-47 →
              </MechanicalButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
