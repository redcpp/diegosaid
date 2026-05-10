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
    excerpt: 'How a proof by contradiction saved a DeFi protocol from a flawed LP-seeding mechanism.',
    date: 'MAY 2024',
    readTime: '12 MIN',
  },
  {
    slug: 'distributed-systems',
    title: 'Distributed Systems Patterns',
    excerpt: 'Lessons learned building resilient infrastructure at Oracle Cloud and CAM Grupo.',
    date: 'JULY 2024',
    readTime: '15 MIN',
  },
  {
    slug: 'llm-inference',
    title: 'LLM Inference On-Premise',
    excerpt: 'Running private MLX + Tailscale + Apple Silicon for secure, cost-effective LLM serving.',
    date: 'SEPTEMBER 2024',
    readTime: '10 MIN',
  },
];

export default function Section11BlogPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    const cards = sectionRef.current.querySelectorAll('.blog-preview-card');
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-ink pt-32 pb-24 px-6 lg:px-20"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionEyebrow text="LATEST WRITING" color="var(--color-stone)" />
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-4 mb-12">
          <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-creme">
            TECHNICAL ARTICLES
          </h2>
          <Link
            to="/blog"
            className="font-headline font-medium text-label uppercase text-cobalt hover:text-terracotta transition-colors flex items-center gap-2 group"
          >
            VIEW ALL
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="blog-preview-card group flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 p-6 lg:p-8 bg-ink/50 rounded-sm border border-cobalt/20 hover:border-cobalt transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-headline font-bold text-[18px] sm:text-[22px] uppercase text-creme group-hover:text-cobalt transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="font-body text-[15px] text-stone mt-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-stone uppercase">
                    {post.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-stone" />
                  <span className="font-mono text-[11px] text-stone">
                    {post.readTime}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-stone flex items-center justify-center group-hover:border-cobalt group-hover:bg-cobalt transition-all">
                  <ArrowRight
                    size={14}
                    className="text-stone group-hover:text-creme transition-colors"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
