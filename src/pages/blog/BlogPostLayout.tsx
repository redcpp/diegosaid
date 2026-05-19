import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft } from 'lucide-react';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface BlogPostLayoutProps {
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  serial?: string;
  children: React.ReactNode;
}

export default function BlogPostLayout({
  title,
  subtitle,
  date,
  readTime,
  tags,
  serial = '01',
  children,
}: BlogPostLayoutProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const article = contentRef.current;
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useGSAP(() => {
    if (reducedMotion) return;
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.querySelectorAll('.hero-row'),
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    }
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 85%' },
        }
      );
    }
  }, { dependencies: [reducedMotion] });

  return (
    <div className="w-full min-h-screen bg-creme relative">
      {/* Reading progress bar */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed top-[3.5rem] md:top-[5.25rem] left-0 right-0 z-40 h-[2px] bg-transparent pointer-events-none"
      >
        <div
          className="h-full bg-cobalt transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Dossier hero */}
      <header className="w-full bg-ink pt-24 lg:pt-28 pb-14 lg:pb-16 px-6 lg:px-20 relative overflow-hidden border-b border-creme/15">
        {/* Faint grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,243,239,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,239,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse at center, black 0%, black 55%, transparent 100%)',
          }}
        />

        <div ref={headerRef} className="max-w-[920px] mx-auto relative z-10">
          {/* Registry strip */}
          <div className="hero-row flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-stone uppercase border-b border-creme/15 pb-3 mb-10">
            <span>ARTICLE · DSR/W/{serial}</span>
            <span className="text-cobalt">CLEARANCE · PUBLIC</span>
            <span>READ · {readTime}</span>
          </div>

          {/* Back link */}
          <Link
            to="/blog"
            className="hero-row inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-cobalt transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            ALL ARTICLES
          </Link>

          {/* Serial + topic */}
          <div className="hero-row flex items-baseline gap-4 mb-4">
            <span className="font-mono text-[10px] tracking-[0.18em] text-cobalt uppercase">
              Nº.{serial}
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-stone/70 uppercase">
              {date}
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-row font-headline font-bold text-[36px] sm:text-[52px] lg:text-[64px] uppercase text-creme leading-[0.95] tracking-[-0.02em]">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="hero-row font-body italic text-[15px] sm:text-[17px] text-stone mt-5 leading-[1.65] max-w-[58ch]">
            {subtitle}
          </p>

          {/* Tags */}
          <div className="hero-row flex flex-wrap gap-1.5 mt-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-creme/75 border border-creme/25 px-2 py-[3px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article */}
      <div
        ref={contentRef}
        className="max-w-[760px] mx-auto px-6 lg:px-0 py-16 lg:py-24"
      >
        {/* Drop cap accent */}
        <div className="mb-10 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.18em] text-cobalt uppercase">
            § BEGIN ARTICLE
          </span>
          <span className="flex-1 h-px bg-ink/15" />
        </div>

        <article className="blog-article">{children}</article>

        {/* End mark */}
        <div className="mt-16 flex items-center gap-4">
          <span className="flex-1 h-px bg-ink/15" />
          <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45 uppercase">
            ∎ END OF ARTICLE
          </span>
          <span className="flex-1 h-px bg-ink/15" />
        </div>

        {/* Continue reading */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/blog"
            className="group flex flex-col gap-2 p-6 border border-ink/15 hover:border-cobalt hover:bg-ink/[0.025] transition-colors"
          >
            <span className="font-mono text-[10px] tracking-[0.18em] text-cobalt uppercase">
              ← BACK
            </span>
            <span className="font-headline font-bold text-[18px] uppercase text-ink group-hover:text-cobalt transition-colors">
              FULL INDEX
            </span>
            <span className="font-body text-[13px] text-ink/65">
              Every article in this volume.
            </span>
          </Link>
          <Link
            to="/"
            className="group flex flex-col gap-2 p-6 border border-ink/15 hover:border-cobalt hover:bg-ink/[0.025] transition-colors"
          >
            <span className="font-mono text-[10px] tracking-[0.18em] text-cobalt uppercase">
              ↑ COVER
            </span>
            <span className="font-headline font-bold text-[18px] uppercase text-ink group-hover:text-cobalt transition-colors">
              RETURN TO DOSSIER
            </span>
            <span className="font-body text-[13px] text-ink/65">
              The personal record.
            </span>
          </Link>
        </div>

        {/* Footer caption */}
        <div className="mt-10 pt-4 border-t border-ink/10 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-ink/40 uppercase">
          <span>// EOF · ARTICLE</span>
          <span>FILE CLOSED · OK</span>
        </div>
      </div>
    </div>
  );
}
