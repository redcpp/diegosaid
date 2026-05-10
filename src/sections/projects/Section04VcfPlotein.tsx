import { useRef } from 'react';
import { useLazyVideo } from '@/hooks/use-lazy-video';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HorizontalPanWipe from '@/components/HorizontalPanWipe';
import MechanicalButton from '@/components/MechanicalButton';

gsap.registerPlugin(ScrollTrigger);

const METRICS = ['OXFORD PUBLISHED', 'GENOMIC VARIANTS', 'VUE.JS · NODE.JS'];

export default function Section04VcfPlotein() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const pubBoxRef = useRef<HTMLDivElement>(null);
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
    if (pubBoxRef.current) {
      tl.fromTo(pubBoxRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5);
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
    <section ref={sectionRef} id="vcf-plotein" className="w-full bg-creme pt-32 lg:pt-40 pb-24 px-6 lg:px-20">
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
            aria-label="VCF/Plotein genomics platform showcase video"
          >
            <source src="/video-projects-genomics.webm" type="video/webm" />
            <source src="/video-projects-genomics.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          {/* Label overlay */}
          <div className="absolute bottom-6 left-6">
            <span className="font-headline font-bold text-[48px] text-creme opacity-30 block leading-none">03</span>
            <span className="font-headline font-bold text-[24px] uppercase text-creme block leading-tight">VCF/PLOTEIN</span>
          </div>
        </div>

        {/* Part B — Case Study Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Left Column */}
          <div ref={leftRef} className="opacity-0">
            <h2 className="font-headline font-bold text-[28px] sm:text-display-md uppercase text-ink leading-tight">
              CLINICAL GENOMIC INTERPRETATION PLATFORM
            </h2>
            <p className="font-headline font-medium text-label uppercase text-stone tracking-[0.08em] mt-4">
              JANUARY 2018 — DECEMBER 2018
            </p>
            <p className="font-body text-[14px] text-cobalt mt-2">
              Software Engineer Intern — Cancer Genomics Lab
            </p>
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="opacity-0">
            <p className="font-body text-[16px] text-ink leading-[1.65]">
              Built VCF/Plotein, a web application for clinical interpretation
              of genomic variants from exome sequencing. The platform enables
              researchers and clinicians to visualize, annotate, and interpret
              VCF (Variant Call Format) data from next-generation sequencing
              pipelines. Published in Bioinformatics, Oxford Academic,
              co-authored with researchers from Oxford, UNAM, and the University
              of Cambridge.
            </p>

            {/* Publication Citation Box */}
            <div
              ref={pubBoxRef}
              className="mt-8 opacity-0 bg-blush border border-stone rounded-lg p-8"
            >
              <span className="font-headline font-medium text-[11px] uppercase tracking-[0.1em] block mb-4 text-cobalt">
                PUBLICATION
              </span>
              <p className="font-body text-[14px] italic text-ink leading-[1.65]">
                VCF/Plotein: a web application for clinical interpretation of
                genomic variants from exome sequencing. Bioinformatics, Oxford
                Academic Press, June 2019.
              </p>
              <p className="font-body text-[12px] text-stone mt-3">
                Co-authored with Oxford, UNAM, and Cambridge researchers.
              </p>
            </div>

            {/* Key Metrics */}
            <div ref={metricsRef} className="flex flex-wrap gap-4 mt-8">
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
              Vue.js · Node.js · PostgreSQL · VCF Parsing · Bioinformatics
            </p>

            {/* CTA */}
            <div ref={ctaRef} className="mt-6 opacity-0">
              <MechanicalButton
                variant="outline"
                href="https://github.com/redcpp/vcfplotein"
              >
                VIEW ON GITHUB →
              </MechanicalButton>
              <div className="mt-3">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/31161195/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] underline underline-offset-4 hover:text-cobalt transition-colors text-ink"
                >
                  View on PubMed →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
