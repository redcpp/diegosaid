import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import MechanicalButton from '@/components/MechanicalButton';

gsap.registerPlugin(ScrollTrigger);

function TypewriterLabel({
  text,
  color = 'var(--color-oxblood)',
  delay = 0,
}: {
  text: string;
  color?: string;
  delay?: number;
}) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 25);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [started, text, delay]);

  return (
    <span
      ref={ref}
      className="font-headline font-medium text-[11px] uppercase tracking-[0.1em] block"
      style={{ color }}
    >
      {displayed}
      {started && displayed.length < text.length && (
        <span className="animate-cursor-blink">_</span>
      )}
    </span>
  );
}

export default function Section09Publications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const cta1Ref = useRef<HTMLDivElement>(null);
  const cta2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    if (card1Ref.current) {
      tl.fromTo(card1Ref.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0);
    }
    if (card2Ref.current) {
      tl.fromTo(card2Ref.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.2);
    }
    if (cta1Ref.current) {
      tl.fromTo(cta1Ref.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.5);
    }
    if (cta2Ref.current) {
      tl.fromTo(cta2Ref.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.6);
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-ink pt-32 lg:pt-40 pb-24 px-6 lg:px-20">
      <div className="max-w-[900px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionEyebrow text="PUBLICATIONS" color="var(--color-stone)" />
          <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-creme mt-4">
            PUBLISHED WORK
          </h2>
        </div>

        {/* Publications List */}
        <div className="flex flex-col gap-10">
          {/* Card 1 — ADR-47 */}
          <div
            ref={card1Ref}
            className="bg-blush border border-stone/20 rounded-xl p-8 lg:p-12 opacity-0"
          >
            <TypewriterLabel text="TECHNICAL ANALYSIS" color="var(--color-oxblood)" delay={300} />
            <h3 className="font-headline font-bold text-[20px] sm:text-heading uppercase text-ink mt-3 leading-tight">
              ADR-47: THE CASE AGAINST PACT xUSD LAUNCH
            </h3>
            <p className="font-body text-[13px] text-stone-text mt-3">
              Diego Said Anaya Mancilla
            </p>
            <p className="font-body text-[14px] text-ink leading-[1.65] mt-4">
              A formal mathematical proof by contradiction demonstrating that the proposed PACT/xUSD LP-seeding mechanism contained fundamental economic flaws that would violate the no-arbitrage condition. The analysis prevented the mechanism from launching and addressed systemic risk patterns later observed in the 2022 algorithmic stablecoin failures across the DeFi ecosystem.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['FORMAL PROOF', 'DeFi', 'RISK ANALYSIS', 'ALGORAND'].map((tag) => (
                <span
                  key={tag}
                  className="font-headline font-medium text-[11px] uppercase tracking-[0.04em] text-cobalt bg-creme px-3 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div ref={cta1Ref} className="mt-6 opacity-0">
              <MechanicalButton variant="filled-cobalt" to="/blog/adr47">
                READ ADR-47 →
              </MechanicalButton>
            </div>
          </div>

          {/* Card 2 — VCF/Plotein */}
          <div
            ref={card2Ref}
            className="bg-blush border border-stone/20 rounded-xl p-8 lg:p-12 opacity-0"
          >
            <TypewriterLabel text="PEER-REVIEWED JOURNAL ARTICLE" color="var(--color-cobalt)" delay={500} />
            <h3 className="font-headline font-bold text-[20px] sm:text-heading uppercase text-ink mt-3 leading-tight">
              VCF/PLOTEIN: CLINICAL GENOMIC INTERPRETATION FROM EXOME SEQUENCING
            </h3>
            <p className="font-body text-[13px] text-cobalt italic mt-2">
              Bioinformatics, Oxford Academic Press, June 2019
            </p>
            <p className="font-body text-[13px] text-stone-text mt-2">
              Co-authored with researchers from Oxford University, UNAM, and the University of Cambridge
            </p>
            <p className="font-body text-[14px] text-ink leading-[1.65] mt-4">
              VCF/Plotein is a web application for clinical interpretation of genomic variants from exome sequencing. The platform enables researchers and clinicians to visualize, annotate, and interpret VCF data from next-generation sequencing pipelines, streamlining the genomic variant review process.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['BIOINFORMATICS', 'GENOMICS', 'VUE.JS', 'NODE.JS'].map((tag) => (
                <span
                  key={tag}
                  className="font-headline font-medium text-[11px] uppercase tracking-[0.04em] text-cobalt bg-creme px-3 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div ref={cta2Ref} className="mt-6 flex flex-wrap gap-3 opacity-0">
              <MechanicalButton variant="outline" href="https://github.com/redcpp/vcfplotein">
                VIEW ON GITHUB →
              </MechanicalButton>
              <MechanicalButton variant="outline" href="https://pubmed.ncbi.nlm.nih.gov/31161195/">
                VIEW ON PUBMED →
              </MechanicalButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
