import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import MechanicalButton from '@/components/MechanicalButton';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface Publication {
  serial: string;
  type: string;
  typeColor: string;
  title: string;
  authors: string;
  venue?: string;
  description: string;
  tags: string[];
  cta: { label: string; href?: string; to?: string; variant: 'filled-cobalt' | 'outline' }[];
}

const PUBLICATIONS: Publication[] = [
  {
    serial: 'PUB-2022/01',
    type: 'TECHNICAL ANALYSIS',
    typeColor: 'text-oxblood border-oxblood/50',
    title: 'ADR-47: The Case Against PACT xUSD Launch',
    authors: 'Diego Said Anaya Mancilla',
    venue: 'Architecture Decision Record · xBacked DAO · 2022',
    description:
      'A formal mathematical proof by contradiction demonstrating that the proposed PACT/xUSD LP-seeding mechanism contained fundamental economic flaws that would violate the no-arbitrage condition. The analysis prevented the mechanism from launching and addressed systemic risk patterns later observed in the 2022 algorithmic stablecoin failures across the DeFi ecosystem.',
    tags: ['FORMAL PROOF', 'DeFi', 'RISK ANALYSIS', 'ALGORAND'],
    cta: [{ label: 'READ ADR-47 →', to: '/blog/adr47', variant: 'filled-cobalt' }],
  },
  {
    serial: 'PUB-2019/02',
    type: 'PEER-REVIEWED · JOURNAL',
    typeColor: 'text-cobalt border-cobalt/60',
    title: 'VCF/Plotein: Clinical Genomic Interpretation From Exome Sequencing',
    authors: 'Co-authored with researchers from Oxford, UNAM, and Cambridge',
    venue: 'Bioinformatics · Oxford Academic Press · June 2019',
    description:
      'VCF/Plotein is a web application for clinical interpretation of genomic variants from exome sequencing. The platform enables researchers and clinicians to visualize, annotate, and interpret VCF data from next-generation sequencing pipelines, streamlining the genomic variant review process.',
    tags: ['BIOINFORMATICS', 'GENOMICS', 'VUE.JS', 'NODE.JS'],
    cta: [
      { label: 'VIEW ON GITHUB →', href: 'https://github.com/redcpp/vcfplotein', variant: 'outline' },
      { label: 'VIEW ON PUBMED →', href: 'https://pubmed.ncbi.nlm.nih.gov/31161195/', variant: 'outline' },
    ],
  },
];

function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="pub-card opacity-0 group relative bg-parchment/95 border border-creme/15 p-8 lg:p-10 overflow-hidden">
      {/* Top studio lighting */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
        }}
      />

      {/* Registry */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase border-b border-ink/15 pb-3">
        <span className="text-ink/55">{pub.serial}</span>
        <span className={`px-2 py-[1px] border ${pub.typeColor} text-[9px] tracking-[0.18em]`}>
          {pub.type}
        </span>
      </div>

      <div className="relative z-10 mt-6">
        <h3 className="font-headline font-bold text-[22px] sm:text-[28px] uppercase text-ink leading-[1.1] tracking-[-0.005em]">
          {pub.title}
        </h3>
        <p className="font-body italic text-[13px] text-stone-text mt-2">
          {pub.authors}
        </p>
        {pub.venue && (
          <p className="font-mono text-[10px] tracking-[0.14em] text-cobalt uppercase mt-1">
            {pub.venue}
          </p>
        )}

        <div className="h-px w-full bg-ink/10 my-5" />

        <p className="font-body text-[14px] text-ink/80 leading-[1.7]">
          {pub.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-5">
          {pub.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/70 border border-ink/20 px-2 py-[3px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-ink/10">
          {pub.cta.map((c) => (
            <MechanicalButton
              key={c.label}
              variant={c.variant}
              href={c.href}
              to={c.to}
            >
              {c.label}
            </MechanicalButton>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Section09Publications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.pub-card'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-ink pt-28 lg:pt-32 pb-24 px-6 lg:px-20 relative overflow-hidden border-t border-creme/15"
    >
      {/* Decorative numeral */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute -top-6 left-6 font-headline font-bold text-[180px] leading-none text-creme/[0.04] select-none pointer-events-none tracking-tighter"
      >
        09
      </span>

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Registry strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-stone uppercase border-b border-creme/15 pb-3 mb-12">
          <span>RECORD · DSR/2026/P-09 — PUBLICATIONS</span>
          <span className="text-cobalt">{PUBLICATIONS.length} ENTRIES · OPEN ACCESS</span>
          <span>VERIFIED · CITED</span>
        </div>

        <SectionEyebrow text="PUBLICATIONS" color="var(--color-stone)" />
        <div className="mt-4 lg:flex lg:items-end lg:justify-between gap-8 mb-12">
          <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-creme leading-[0.95] tracking-[-0.015em]">
            PUBLISHED<br />
            <span className="text-cobalt">WORK.</span>
          </h2>
          <p className="font-body italic text-[14px] text-stone mt-4 lg:mt-0 max-w-sm">
            Formal records — a peer-reviewed journal article and an architecture decision record
            that altered a protocol's launch.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:gap-8">
          {PUBLICATIONS.map((pub) => (
            <PublicationCard key={pub.serial} pub={pub} />
          ))}
        </div>
      </div>
    </section>
  );
}
