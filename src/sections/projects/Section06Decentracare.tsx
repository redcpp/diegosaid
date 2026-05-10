import { useRef } from 'react';
import { useLazyVideo } from '@/hooks/use-lazy-video';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HorizontalPanWipe from '@/components/HorizontalPanWipe';
import MechanicalButton from '@/components/MechanicalButton';

gsap.registerPlugin(ScrollTrigger);

const METRICS = ['HIPAA COMPLIANT', 'AWS GLUE ETL', '100+ NURSES', 'REACT.JS'];

export default function Section06Decentracare() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
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
    if (metricsRef.current) {
      const pills = metricsRef.current.querySelectorAll('.metric-pill');
      tl.fromTo(pills, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.5);
    }
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.7);
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="decentracare" className="w-full bg-creme pt-32 lg:pt-40 pb-24 px-6 lg:px-20">
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
            aria-label="Decentracare healthcare CRM showcase video"
          >
            <source src="/video-projects-decentracare.webm" type="video/webm" />
            <source src="/video-projects-decentracare.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          {/* Label overlay */}
          <div className="absolute bottom-6 left-6">
            <span className="font-headline font-bold text-[48px] text-creme opacity-30 block leading-none">05</span>
            <span className="font-headline font-bold text-[24px] uppercase text-creme block leading-tight">DECENTRACARE CRM</span>
          </div>
        </div>

        {/* Part B — Case Study Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Left Column */}
          <div ref={leftRef} className="opacity-0">
            <h2 className="font-headline font-bold text-[28px] sm:text-display-md uppercase text-ink leading-tight">
              HEALTHCARE CRM &amp; ETL PIPELINES
            </h2>
            <p className="font-headline font-medium text-label uppercase text-stone tracking-[0.08em] mt-4">
              MARCH 2021 — DECEMBER 2023
            </p>
            <p className="font-body text-[14px] text-cobalt mt-2">
              Full Stack Developer (Contractor) — Augusto Consulting
            </p>
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="opacity-0">
            <p className="font-body text-[16px] text-ink leading-[1.65]">
              Built Decentracare, a CRM platform serving hundreds of nurses in the healthcare sector. Developed ETL pipelines using AWS Glue for the Michigan Health Information Network Shared Services (MiHIN), processing healthcare data in full HIPAA compliance. The CRM provides care coordination, patient management, and real-time scheduling for distributed nursing teams.
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
              React.js · Node.js · AWS Glue · AWS Lambda · PostgreSQL · HIPAA · ETL
            </p>

            {/* CTA */}
            <div ref={ctaRef} className="mt-6 opacity-0">
              <MechanicalButton variant="outline" href="https://augustoconsulting.com">
                VIEW PROJECT →
              </MechanicalButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
