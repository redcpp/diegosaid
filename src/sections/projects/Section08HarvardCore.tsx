import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HorizontalPanWipe from '@/components/HorizontalPanWipe';

gsap.registerPlugin(ScrollTrigger);

const METRICS = ['HARVARD CORe', 'BUSINESS ANALYTICS', 'ECONOMICS', 'FINANCIAL ACCOUNTING'];

export default function Section08HarvardCore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    if (visualRef.current) {
      tl.fromTo(visualRef.current, { opacity: 0 }, { opacity: 1, duration: 1.0, ease: 'power2.out' }, 0);
    }
    if (leftRef.current) {
      tl.fromTo(leftRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.15);
    }
    if (rightRef.current) {
      tl.fromTo(rightRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.3);
    }
    if (metricsRef.current) {
      const pills = metricsRef.current.querySelectorAll('.metric-pill');
      tl.fromTo(pills, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.5);
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="harvard-core" className="w-full bg-creme pt-32 lg:pt-40 pb-24 px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Horizontal Pan Wipe Divider */}
        <HorizontalPanWipe className="mb-16" />

        {/* Part A — Visual Header (typographic, no video) */}
        <div
          ref={visualRef}
          className="relative w-full aspect-video max-w-[1200px] mx-auto rounded-lg border border-stone overflow-hidden opacity-0"
          style={{
            background: 'linear-gradient(135deg, #A41034 0%, #8C2B3D 50%, #2B4C8C 100%)',
          }}
        >
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'url(/pattern-grid.svg)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Centered typographic treatment */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Massive HBS watermark */}
            <span
              className="font-headline font-bold text-[80px] sm:text-[120px] uppercase text-creme select-none absolute"
              style={{ opacity: 0.15 }}
            >
              HBS
            </span>
            {/* Foreground text */}
            <div className="relative z-10 text-center px-6">
              <span className="font-headline font-bold text-[18px] sm:text-[24px] uppercase text-creme block">
                HARVARD BUSINESS SCHOOL
              </span>
              <span className="font-headline font-medium text-[12px] sm:text-[14px] uppercase text-creme block tracking-[0.2em] mt-2">
                ONLINE
              </span>
            </div>
          </div>

          {/* Label overlay */}
          <div className="absolute bottom-6 left-6 z-10">
            <span className="font-headline font-bold text-[48px] text-creme opacity-30 block leading-none">07</span>
            <span className="font-headline font-bold text-[24px] uppercase text-creme block leading-tight">HARVARD CORE</span>
          </div>
        </div>

        {/* Part B — Case Study Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Left Column */}
          <div ref={leftRef} className="opacity-0">
            <h2 className="font-headline font-bold text-[28px] sm:text-display-md uppercase text-ink leading-tight">
              BUSINESS ANALYTICS, ECONOMICS &amp; FINANCIAL ACCOUNTING
            </h2>
            <p className="font-headline font-medium text-label uppercase text-stone tracking-[0.08em] mt-4">
              2022
            </p>
            <p className="font-body text-[14px] text-cobalt mt-2">
              Credential of Readiness (CORe)
            </p>
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="opacity-0">
            <p className="font-body text-[16px] text-ink leading-[1.65]">
              Completed the Harvard Business School Online Credential of Readiness (CORe) program, covering Business Analytics, Economics for Managers, and Financial Accounting. This credential complements the technical engineering background with quantitative business analysis, economic decision-making frameworks, and financial statement literacy — skills directly applied in real estate quantitative investment analyses (DCF, IRR, Monte Carlo simulations) and the strategic management of a 20+ agent brokerage.
            </p>

            {/* Key Metrics */}
            <div ref={metricsRef} className="flex flex-wrap gap-4 mt-6">
              {METRICS.map((m) => (
                <span
                  key={m}
                  className="metric-pill font-headline font-medium text-[11px] uppercase tracking-[0.04em] text-cobalt bg-blush px-4 py-1.5 rounded opacity-0"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Tech Stack */}
            <p className="font-mono text-[12px] text-stone mt-4">
              Quantitative Analysis · DCF · IRR · Monte Carlo · Financial Modeling · Economics
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
