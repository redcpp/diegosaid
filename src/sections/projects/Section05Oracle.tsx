import { useRef } from 'react';
import { useLazyVideo } from '@/hooks/use-lazy-video';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HorizontalPanWipe from '@/components/HorizontalPanWipe';

gsap.registerPlugin(ScrollTrigger);

const METRICS = ['OCI PIPELINES', 'CI/CD AUTOMATION', 'SEV-1 SUPPORT', 'DOCKER'];

export default function Section05Oracle() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
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
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="oracle" className="w-full bg-blush pt-32 lg:pt-40 pb-24 px-6 lg:px-20">
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
            aria-label="Oracle Cloud Infrastructure Big Data showcase video"
          >
            <source src="/video-projects-oracle.webm" type="video/webm" />
            <source src="/video-projects-oracle.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          {/* Label overlay */}
          <div className="absolute bottom-6 left-6">
            <span className="font-headline font-bold text-[48px] text-creme opacity-30 block leading-none">04</span>
            <span className="font-headline font-bold text-[24px] uppercase text-creme block leading-tight">ORACLE BIG DATA</span>
          </div>
        </div>

        {/* Part B — Case Study Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Left Column */}
          <div ref={leftRef} className="opacity-0">
            <h2 className="font-headline font-bold text-[28px] sm:text-display-md uppercase text-ink leading-tight">
              CLOUD-NATIVE BIG DATA INFRASTRUCTURE
            </h2>
            <p className="font-headline font-medium text-label uppercase text-stone tracking-[0.08em] mt-4">
              JANUARY 2019 — FEBRUARY 2021
            </p>
            <p className="font-body text-[14px] text-cobalt mt-2">
              Software Developer II — Oracle Cloud Infrastructure
            </p>
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="opacity-0">
            <p className="font-body text-[16px] text-ink leading-[1.65]">
              Built OCI image pipelines migrating on-premise Big Data
              applications to the Oracle Cloud. Designed and maintained TeamCity
              CI/CD pipelines, Docker containerization workflows, and Artifactory
              artifact management. Automated server re-imaging processes,
              firmware update testing, and release qualification. Provided global
              support for Severity 1 production incidents across Oracle Cloud
              Infrastructure Big Data Service deployments.
            </p>

            {/* Key Metrics */}
            <div ref={metricsRef} className="flex flex-wrap gap-4 mt-6">
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
              Java · Python · Docker · TeamCity · Artifactory · OCI · REST APIs · Linux
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
