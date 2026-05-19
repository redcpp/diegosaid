import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const POSTS = [
  {
    slug: 'adr47',
    title: 'ADR-47 Explained for Engineers',
    excerpt:
      'How a proof by contradiction saved a DeFi protocol from a flawed LP-seeding mechanism.',
    date: '2024.05',
    readTime: '12 MIN',
    topic: 'DeFi · Proofs',
  },
  {
    slug: 'distributed-systems',
    title: 'Distributed Systems Patterns',
    excerpt:
      'Lessons learned building resilient infrastructure at Oracle Cloud and CAM Grupo.',
    date: '2024.07',
    readTime: '15 MIN',
    topic: 'Systems · Infra',
  },
  {
    slug: 'llm-inference',
    title: 'LLM Inference On-Premise',
    excerpt:
      'Running private MLX + Tailscale + Apple Silicon for secure, cost-effective LLM serving.',
    date: '2024.09',
    readTime: '10 MIN',
    topic: 'LLM · MLX',
  },
];

export default function Section11BlogPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    const rows = sectionRef.current.querySelectorAll('.toc-row');
    gsap.fromTo(
      rows,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="writing"
      className="w-full bg-ink pt-28 pb-24 px-6 lg:px-20 relative overflow-hidden"
    >
      {/* Decorative numeral */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute -top-6 right-6 font-headline font-bold text-[180px] leading-none text-creme/[0.04] select-none pointer-events-none tracking-tighter"
      >
        09
      </span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Registry strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-stone uppercase border-b border-creme/15 pb-3 mb-12">
          <span>INDEX · DSR/2026/009 — WRITINGS</span>
          <span className="text-cobalt">{POSTS.length} ARTICLES INDEXED</span>
          <span>SORT · BY DATE DESC</span>
        </div>

        <SectionEyebrow text="LATEST WRITING" color="var(--color-stone)" />

        <div className="mt-4 lg:flex lg:items-end lg:justify-between gap-8 mb-14">
          <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-creme leading-[0.95] tracking-[-0.015em]">
            TECHNICAL<br />
            <span className="text-cobalt">ARTICLES</span>
          </h2>
          <div className="flex flex-col gap-3 mt-4 lg:mt-0 lg:items-end">
            <p className="font-body italic text-[14px] text-stone max-w-sm lg:text-right">
              Notes from production. Long-form essays on systems, protocols, and inference.
            </p>
            <Link
              to="/blog"
              className="font-headline font-medium text-label uppercase text-cobalt hover:text-terracotta transition-colors flex items-center gap-2 group"
            >
              VIEW FULL INDEX
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Table of contents */}
        <div className="border-t border-creme/20">
          {/* Column legend */}
          <div className="hidden lg:grid grid-cols-12 gap-x-6 py-3 font-mono text-[10px] tracking-[0.18em] text-stone/70 uppercase border-b border-creme/15">
            <span className="col-span-1">№</span>
            <span className="col-span-1">DATE</span>
            <span className="col-span-5">TITLE</span>
            <span className="col-span-3">SYNOPSIS</span>
            <span className="col-span-1">TOPIC</span>
            <span className="col-span-1 text-right">PP.</span>
          </div>

          {POSTS.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="toc-row opacity-0 group grid grid-cols-12 gap-x-6 items-baseline py-7 border-b border-creme/15 hover:bg-creme/[0.03] transition-colors relative"
            >
              {/* Hover bar */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-cobalt scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"
              />

              {/* Number */}
              <span className="col-span-2 lg:col-span-1 font-mono text-[11px] tracking-[0.16em] text-cobalt">
                Nº.{String(i + 1).padStart(2, '0')}
              </span>

              {/* Date */}
              <span className="col-span-10 lg:col-span-1 font-mono text-[11px] tracking-[0.14em] text-stone uppercase">
                {post.date}
              </span>

              {/* Title */}
              <h3 className="col-span-12 lg:col-span-5 font-headline font-bold text-[20px] sm:text-[24px] uppercase text-creme group-hover:text-cobalt transition-colors leading-tight tracking-[-0.005em] mt-2 lg:mt-0">
                {post.title}
              </h3>

              {/* Synopsis */}
              <p className="col-span-12 lg:col-span-3 font-body text-[13.5px] text-stone leading-[1.6] mt-2 lg:mt-0">
                {post.excerpt}
              </p>

              {/* Topic */}
              <span className="col-span-6 lg:col-span-1 font-mono text-[10px] tracking-[0.12em] text-cobalt uppercase mt-2 lg:mt-0">
                {post.topic}
              </span>

              {/* Read time + arrow */}
              <div className="col-span-6 lg:col-span-1 flex items-center justify-end gap-2 mt-2 lg:mt-0">
                <span className="font-mono text-[10px] tracking-[0.14em] text-stone uppercase">
                  {post.readTime}
                </span>
                <span className="text-cobalt group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-stone/60 uppercase">
          <span>// END OF INDEX</span>
          <span>NEXT PUBLICATION TBA</span>
        </div>
      </div>
    </section>
  );
}
