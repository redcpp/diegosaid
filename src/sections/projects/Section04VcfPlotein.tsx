import { useRef } from 'react';
import { useLazyVideo } from '@/hooks/use-lazy-video';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MechanicalButton from '@/components/MechanicalButton';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const METRICS = ['OXFORD PUBLISHED', 'GENOMIC VARIANTS', 'VUE.JS · NODE.JS'];

export default function Section04VcfPlotein() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    });

    if (leftRef.current) {
      tl.fromTo(leftRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0);
    }
    if (rightRef.current) {
      tl.fromTo(rightRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.15);
    }
    tl.fromTo(
      sectionRef.current.querySelectorAll('.metric-pill'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
      0.35
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="vcf-plotein"
      className="w-full bg-creme pt-20 lg:pt-24 pb-20 px-6 lg:px-20"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div ref={leftRef} className="opacity-0 lg:col-span-5">
            <div className="relative w-full aspect-video rounded-sm border border-stone overflow-hidden">
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
              <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-creme/55 pointer-events-none" />
            </div>

            <div className="mt-6">
              <h2 className="font-headline font-bold text-[24px] sm:text-[30px] uppercase text-ink leading-[1.05] tracking-[-0.01em]">
                CLINICAL GENOMIC INTERPRETATION PLATFORM
              </h2>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text uppercase">
                  JAN 2018 — DEC 2018
                </span>
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text/60 uppercase">·</span>
                <span className="font-body italic text-[13px] text-cobalt">
                  SWE Intern — Cancer Genomics Lab
                </span>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="opacity-0 lg:col-span-7 lg:pt-1">
            <p className="font-body text-[15px] text-ink leading-[1.7]">
              Built VCF/Plotein, a web application for clinical interpretation of genomic variants
              from exome sequencing. The platform lets researchers and clinicians visualize,
              annotate, and interpret VCF data from next-generation sequencing pipelines.
            </p>

            <div className="mt-6 bg-blush/70 border border-ink/15 rounded-sm p-5 lg:p-6">
              <div className="font-mono text-[10px] tracking-[0.18em] text-cobalt uppercase border-b border-ink/15 pb-2">
                PUBLICATION
              </div>
              <p className="font-body text-[14px] italic text-ink leading-[1.7] mt-4">
                VCF/Plotein: a web application for clinical interpretation of genomic variants
                from exome sequencing.
              </p>
              <p className="font-mono text-[10px] tracking-[0.14em] mt-2 text-cobalt uppercase">
                Bioinformatics · Oxford Academic Press · June 2019
              </p>
              <p className="font-body text-[12px] text-stone-text mt-2">
                Co-authored with Oxford, UNAM, and Cambridge researchers.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-6">
              {METRICS.map((m) => (
                <span
                  key={m}
                  className="metric-pill opacity-0 font-mono text-[10px] uppercase tracking-[0.12em] text-cobalt border border-cobalt/40 bg-cobalt/5 px-2 py-[3px]"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <MechanicalButton variant="outline" href="https://vcfplotein.liigh.unam.mx">
                LAUNCH VCF/PLOTEIN →
              </MechanicalButton>
              <MechanicalButton variant="outline" href="https://github.com/redcpp/vcfplotein">
                VIEW ON GITHUB →
              </MechanicalButton>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/31161195/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink hover:text-cobalt transition-colors underline underline-offset-4"
              >
                VIEW ON PUBMED →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
