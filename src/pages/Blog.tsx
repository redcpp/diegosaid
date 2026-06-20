import { Link } from 'react-router-dom';

interface Post {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
}

const POSTS: Post[] = [
  {
    slug: 'adr47',
    title: 'ADR-47 Explained for Engineers',
    subtitle:
      'How a proof by contradiction saved a DeFi protocol from a flawed LP-seeding mechanism — and why the math held up against the 2022 algorithmic stablecoin failures.',
    date: 'May 2024',
    readTime: '12 min',
    tags: ['DeFi', 'Formal Proof', 'Risk Analysis'],
  },
  {
    slug: 'distributed-systems',
    title: 'Distributed Systems Patterns',
    subtitle:
      'Lessons learned building resilient infrastructure at Oracle Cloud and CAM Grupo — failure modes, retries, idempotency, and the patterns that earn their keep.',
    date: 'July 2024',
    readTime: '15 min',
    tags: ['Systems Design', 'Cloud', 'CI/CD'],
  },
  {
    slug: 'llm-inference',
    title: 'LLM Inference On-Premise',
    subtitle:
      'Running private MLX + Tailscale + Apple Silicon for secure, cost-effective LLM serving. A practical guide to the hardware, software, and trade-offs.',
    date: 'September 2024',
    readTime: '10 min',
    tags: ['LLM', 'MLX', 'Apple Silicon'],
  },
];

export default function Blog() {
  return (
    <div className="max-w-[780px] mx-auto px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="text-[28px] lg:text-[32px] font-bold tracking-tight">Writing</h1>
      <p className="mt-3 text-[17px] text-muted leading-relaxed">
        Long-form essays on protocol design, distributed systems, and AI infrastructure.
      </p>
      <div className="mt-12 border-t border-rule divide-y divide-rule">
        {POSTS.map((post) => (
          <Link key={post.slug} to={'/blog/' + post.slug} className="block py-8 group">
            <div className="flex items-baseline gap-3 text-[13px] font-mono text-muted">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-[20px] font-bold mt-2 group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            <p className="text-[15px] text-muted mt-2 leading-relaxed">
              {post.subtitle}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[12px] font-mono text-muted border border-rule px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
