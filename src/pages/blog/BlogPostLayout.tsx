import { Link } from 'react-router-dom';

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
  children,
}: BlogPostLayoutProps) {
  return (
    <div className="max-w-[780px] mx-auto px-6 lg:px-8 py-16 lg:py-24">
      <Link to="/blog" className="text-[14px] font-mono text-muted hover:text-accent transition-colors">
        ← All articles
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-baseline gap-3 text-[13px] font-mono text-muted">
          <span>{date}</span>
          <span>·</span>
          <span>{readTime}</span>
        </div>
        <h1 className="text-[28px] lg:text-[32px] font-bold tracking-tight mt-3">{title}</h1>
        <p className="text-[17px] text-muted mt-3 italic leading-relaxed">{subtitle}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span key={tag} className="text-[12px] font-mono text-muted border border-rule px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <article className="blog-article mt-12 border-t border-rule pt-8">
        {children}
      </article>

      <div className="mt-16 flex items-center gap-4">
        <span className="flex-1 h-px bg-rule" />
        <span className="text-muted text-[13px]">∎</span>
      </div>

      <div className="mt-8">
        <Link to="/blog" className="text-[14px] font-mono text-muted hover:text-accent transition-colors">
          ← All articles
        </Link>
      </div>
    </div>
  );
}
