import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BlogPostLayoutProps {
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  children: React.ReactNode;
}

export default function BlogPostLayout({
  title,
  subtitle,
  date,
  readTime,
  tags,
  children,
}: BlogPostLayoutProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, {});

  return (
    <div className="w-full min-h-screen bg-creme">
      {/* Header */}
      <div className="w-full bg-ink pt-32 pb-20 px-6 lg:px-20">
        <div className="max-w-[800px] mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-headline font-medium text-label uppercase text-stone hover:text-creme transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            ALL ARTICLES
          </Link>

          <div ref={headerRef}>
            <div className="flex flex-wrap gap-3 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-headline font-medium text-[11px] uppercase tracking-[0.04em] text-ink/75 border border-ink/15 px-3 py-1 bg-transparent"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-headline font-bold text-[32px] sm:text-[48px] uppercase text-creme leading-tight">
              {title}
            </h1>

            <p className="font-body text-[16px] sm:text-[18px] text-ink/65 mt-4 leading-relaxed">
              {subtitle}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <span className="font-mono text-[12px] text-stone">{date}</span>
              <span className="w-1 h-1 rounded-full bg-stone" />
              <span className="font-mono text-[12px] text-stone">{readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div
        ref={contentRef}
        className="max-w-[800px] mx-auto px-6 lg:px-0 py-16 lg:py-24"
      >
        <article className="blog-article">{children}</article>

        {/* Footer CTA */}
        <div className="mt-20 pt-10 border-t border-stone">
          <p className="font-headline font-medium text-label uppercase text-stone tracking-[0.08em] mb-4">
            WANT MORE?
          </p>
          <Link
            to="/blog"
            className="font-headline font-bold text-[20px] uppercase text-ink hover:text-cobalt transition-colors"
          >
            READ ALL ARTICLES →
          </Link>
        </div>
      </div>
    </div>
  );
}
