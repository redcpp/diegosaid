import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface Post {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  dateCode: string;
  readTime: string;
  tags: string[];
  topic: string;
  serial: string;
  featured?: boolean;
}

const POSTS: Post[] = [
  {
    slug: 'adr47',
    title: 'ADR-47 Explained for Engineers',
    subtitle:
      'How a proof by contradiction saved a DeFi protocol from a flawed LP-seeding mechanism — and why the math held up against the 2022 algorithmic stablecoin failures.',
    date: 'MAY 2024',
    dateCode: '2024.05',
    readTime: '12 MIN',
    tags: ['DeFi', 'Formal Proof', 'Risk Analysis'],
    topic: 'PROTOCOL DESIGN',
    serial: '01',
    featured: true,
  },
  {
    slug: 'distributed-systems',
    title: 'Distributed Systems Patterns',
    subtitle:
      'Lessons learned building resilient infrastructure at Oracle Cloud and CAM Grupo — failure modes, retries, idempotency, and the patterns that earn their keep.',
    date: 'JULY 2024',
    dateCode: '2024.07',
    readTime: '15 MIN',
    tags: ['Systems Design', 'Cloud', 'CI/CD'],
    topic: 'INFRASTRUCTURE',
    serial: '02',
  },
  {
    slug: 'llm-inference',
    title: 'LLM Inference On-Premise',
    subtitle:
      'Running private MLX + Tailscale + Apple Silicon for secure, cost-effective LLM serving. A practical guide to the hardware, software, and trade-offs.',
    date: 'SEPTEMBER 2024',
    dateCode: '2024.09',
    readTime: '10 MIN',
    tags: ['LLM', 'MLX', 'Apple Silicon'],
    topic: 'AI INFRA',
    serial: '03',
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.fromTo(
      heroRef.current?.querySelectorAll('.hero-stagger') ?? [],
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );

    const cards = sectionRef.current.querySelectorAll('.blog-row');
    gsap.fromTo(
      cards,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, { dependencies: [reducedMotion] });

  return (
    <div className="w-full min-h-screen bg-creme">
      {/* Dossier hero */}
      <header
        ref={heroRef}
        className="w-full bg-ink pt-24 pb-12 lg:pt-28 lg:pb-16 px-6 lg:px-20 relative overflow-hidden"
      >
        {/* Faint grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,243,239,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,239,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black 0%, black 55%, transparent 100%)',
          }}
        />

        <div className="max-w-[1240px] mx-auto relative z-10">
          <h1 className="hero-stagger font-headline font-bold text-[56px] sm:text-[80px] lg:text-display-xl uppercase text-creme leading-[0.9] tracking-[-0.025em]">
            FIELD<br />
            <span className="text-cobalt">NOTES.</span>
          </h1>

          <p className="hero-stagger font-body italic text-[15px] sm:text-[17px] text-stone mt-6 max-w-[60ch] leading-[1.65]">
            Long-form essays on protocol design, distributed systems, and on-premise AI
            infrastructure.
          </p>
        </div>
      </header>

      {/* Articles table */}
      <div
        ref={sectionRef}
        className="max-w-[1240px] mx-auto px-6 lg:px-20 py-14 lg:py-20"
      >
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="blog-row opacity-0 group grid grid-cols-12 gap-x-6 items-baseline py-8 lg:py-10 border-b border-ink/15 hover:bg-ink/[0.025] transition-colors relative"
          >
            {/* Hover rail */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-cobalt scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"
            />

            {/* Date */}
            <span className="col-span-12 lg:col-span-1 font-mono text-[11px] tracking-[0.14em] text-ink/55 uppercase">
              {post.dateCode}
            </span>

            {/* Title + tags */}
            <div className="col-span-12 lg:col-span-6 mt-3 lg:mt-0">
              <h2 className="font-headline font-bold text-[22px] sm:text-[28px] uppercase text-ink leading-[1.05] tracking-[-0.005em] group-hover:text-cobalt transition-colors">
                {post.title}
              </h2>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/65 border border-ink/20 px-2 py-[2px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <p className="col-span-12 lg:col-span-4 font-body text-[13.5px] text-ink/75 leading-[1.65] mt-3 lg:mt-0">
              {post.subtitle}
            </p>

            {/* Read time + arrow */}
            <div className="col-span-12 lg:col-span-1 flex items-center justify-end gap-2 mt-3 lg:mt-0">
              <span className="font-mono text-[10px] tracking-[0.14em] text-ink/55 uppercase">
                {post.readTime}
              </span>
              <span className="text-cobalt group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
