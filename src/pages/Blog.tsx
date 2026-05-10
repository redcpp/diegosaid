import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, FileText, GitBranch, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const POSTS = [
  {
    slug: 'adr47',
    title: 'ADR-47 Explained for Engineers',
    subtitle: 'How a proof by contradiction saved a DeFi protocol from a flawed LP-seeding mechanism.',
    date: 'MAY 2024',
    readTime: '12 MIN READ',
    tags: ['DeFi', 'Formal Proof', 'Risk Analysis'],
    icon: FileText,
    color: 'var(--color-oxblood)',
  },
  {
    slug: 'distributed-systems',
    title: 'Distributed Systems Patterns',
    subtitle: 'Lessons learned building resilient infrastructure at Oracle Cloud and CAM Grupo.',
    date: 'JULY 2024',
    readTime: '15 MIN READ',
    tags: ['Systems Design', 'Cloud', 'CI/CD'],
    icon: Server,
    color: 'var(--color-cobalt)',
  },
  {
    slug: 'llm-inference',
    title: 'LLM Inference On-Premise',
    subtitle: 'Running private MLX + Tailscale + Apple Silicon for secure, cost-effective LLM serving.',
    date: 'SEPTEMBER 2024',
    readTime: '10 MIN READ',
    tags: ['LLM', 'MLX', 'Apple Silicon'],
    icon: GitBranch,
    color: 'var(--color-ink)',
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.blog-card');
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, {});

  return (
    <div className="w-full min-h-screen bg-creme">
      {/* Hero Header */}
      <div className="w-full bg-ink pt-32 pb-20 px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="font-headline font-medium text-label uppercase tracking-[0.12em] text-stone">
            TECHNICAL WRITING
          </span>
          <h1 className="font-headline font-bold text-[36px] sm:text-[56px] uppercase text-creme mt-4 leading-tight">
            BLOG
          </h1>
          <p className="font-body text-[16px] text-stone mt-4 max-w-lg mx-auto">
            Deep dives into protocol design, distributed systems, and on-premise AI infrastructure.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div
        ref={sectionRef}
        className="max-w-[1200px] mx-auto px-6 lg:px-20 py-20 lg:py-32"
      >
        <div className="flex flex-col gap-8">
          {POSTS.map((post) => {
            const Icon = post.icon;
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="blog-card group flex flex-col lg:flex-row gap-6 lg:gap-10 p-8 lg:p-10 bg-parchment rounded-sm border border-ink/10 hover:border-cobalt transition-colors"
              >
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: post.color }}
                >
                  <Icon size={24} className="text-creme" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-3 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-headline font-medium text-[11px] uppercase tracking-[0.04em] text-ink/75 border border-ink/15 px-3 py-1 bg-transparent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-headline font-bold text-[22px] sm:text-[28px] uppercase text-ink leading-tight group-hover:text-cobalt transition-colors">
                    {post.title}
                  </h2>

                  <p className="font-body text-[14px] sm:text-[16px] text-ink/65 mt-2 leading-relaxed">
                    {post.subtitle}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <span className="font-mono text-[12px] text-stone">{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-stone" />
                    <span className="font-mono text-[12px] text-stone">{post.readTime}</span>
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center">
                  <div className="w-12 h-12 rounded-full border border-stone flex items-center justify-center group-hover:border-cobalt group-hover:bg-cobalt transition-all">
                    <ArrowRight
                      size={18}
                      className="text-stone group-hover:text-creme transition-colors"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
