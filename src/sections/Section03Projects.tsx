import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import MechanicalButton from '@/components/MechanicalButton';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  video: string | null;
  description: string;
  tags: string[];
  sectionId: string;
  role: string;
  year: string;
  status: 'SHIPPED' | 'OPS' | 'ARCHIVE' | 'PUBLISHED';
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    name: 'CAM GRUPO',
    video: './video-projects-realestate.mp4',
    description:
      'Luxury real estate brokerage in Riviera Nayarit. Corporate websites, HDR photography pipeline, on-premise LLM inference stack.',
    tags: ['Real Estate', 'LLM', 'Automation'],
    sectionId: 'cam-grupo',
    role: 'Founder · Technical Director',
    year: '2020 →',
    status: 'OPS',
    featured: true,
  },
  {
    name: 'XBACKED DAO',
    video: './video-projects-defi.mp4',
    description:
      'DeFi lending protocol on Algorand. Authored ADR-47 — a formal proof by contradiction that prevented a flawed LP-seeding mechanism.',
    tags: ['DeFi', 'Smart Contracts', 'Risk Analysis'],
    sectionId: 'xbacked',
    role: 'Core Developer',
    year: '2021–22',
    status: 'SHIPPED',
  },
  {
    name: 'VCF/PLOTEIN',
    video: './video-projects-genomics.mp4',
    description:
      'Clinical genomic interpretation web app. Published in Bioinformatics, Oxford Academic. Co-authored with Oxford, UNAM, and Cambridge researchers.',
    tags: ['Genomics', 'Vue.js', 'Bioinformatics'],
    sectionId: 'vcf-plotein',
    role: 'Software Engineer Intern',
    year: '2018',
    status: 'PUBLISHED',
  },
  {
    name: 'ORACLE BIG DATA',
    video: './video-projects-oracle.mp4',
    description:
      'OCI image pipelines and CI/CD for Big Data workloads. Automated server re-imaging, firmware updates, release testing, global Severity 1 support.',
    tags: ['Cloud', 'CI/CD', 'Python'],
    sectionId: 'oracle',
    role: 'Software Developer II',
    year: '2019',
    status: 'SHIPPED',
  },
  {
    name: 'DECENTRACARE CRM',
    video: './video-projects-decentracare.mp4',
    description:
      'Healthcare CRM platform for hundreds of nurses. ETL pipelines for MiHIN (HIPAA-compliant).',
    tags: ['Healthcare', 'React', 'ETL'],
    sectionId: 'decentracare',
    role: 'Full Stack (Contract)',
    year: '2021',
    status: 'SHIPPED',
  },
  {
    name: 'ML & LLM SYSTEMS',
    video: './video-projects-ml-llm.mp4',
    description:
      'Private MLX inference stack on Apple Silicon. Custom Claude-based skills for legal documents. Market intelligence dashboard analyzing 1,500+ MLS transactions.',
    tags: ['Machine Learning', 'LLM', 'Quantitative'],
    sectionId: 'ml-llm',
    role: 'Independent R&D',
    year: '2023 →',
    status: 'OPS',
  },
  {
    name: 'HARVARD CORe',
    video: null,
    description:
      'Harvard Business School CORe — Business Analytics, Economics, Financial Accounting. Credential earned 2022.',
    tags: ['Business', 'Analytics', 'Economics'],
    sectionId: 'harvard-core',
    role: 'Credential',
    year: '2022',
    status: 'ARCHIVE',
  },
];

const STATUS_COLOR: Record<Project['status'], string> = {
  SHIPPED: 'text-sage border-sage/50',
  OPS: 'text-cobalt border-cobalt/60',
  ARCHIVE: 'text-stone-text border-stone',
  PUBLISHED: 'text-terracotta border-terracotta/60',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };
  const handleMouseLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
  };

  const serial = `CASE/${String(index + 1).padStart(2, '0')}`;

  return (
    <Link to={`/projects?section=${project.sectionId}`} className="block group">
      <article
        className={`project-card opacity-0 bg-parchment border border-ink/15 overflow-hidden transition-all duration-300 relative h-full flex flex-col
          ${hovered ? 'border-cobalt shadow-[0_24px_48px_-24px_rgba(43,76,140,0.35)]' : ''}
          ${project.featured ? 'lg:col-span-2' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-index={index}
      >
        {/* Top registry strip */}
        <div className="flex items-center justify-between px-5 lg:px-6 py-2.5 border-b border-ink/10 bg-creme/50 font-mono text-[10px] tracking-[0.16em] text-ink/55 uppercase">
          <span>{serial}</span>
          {project.featured && (
            <span className="text-cobalt">★ FEATURED</span>
          )}
          <span
            className={`px-2 py-[1px] border ${STATUS_COLOR[project.status]} tracking-[0.18em]`}
          >
            {project.status}
          </span>
        </div>

        {/* Video Thumbnail */}
        <div className="relative aspect-video bg-ink/5 overflow-hidden">
          {project.video ? (
            <>
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                style={{ boxShadow: 'inset 0 4px 32px rgba(0,0,0,0.10)' }}
              >
                <source src={project.video?.replace('.mp4', '.webm')} type="video/webm" />
                <source src={project.video} type="video/mp4" />
              </video>
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)',
                }}
              />
              {/* Corner crops */}
              <span aria-hidden="true" className="absolute top-2 left-2 w-4 h-4 border-t border-l border-creme/40" />
              <span aria-hidden="true" className="absolute top-2 right-2 w-4 h-4 border-t border-r border-creme/40" />
              <span aria-hidden="true" className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-creme/40" />
              <span aria-hidden="true" className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-creme/40" />

              {/* Hover hint */}
              <div
                className={`absolute bottom-3 right-3 z-20 font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-1 border border-creme/40 bg-ink/60 text-creme transition-opacity ${hovered ? 'opacity-100' : 'opacity-0'}`}
              >
                ▸ PREVIEW LIVE
              </div>
            </>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center bg-ink/5"
              style={{ boxShadow: 'inset 0 4px 32px rgba(0,0,0,0.10)' }}
            >
              <div className="text-center">
                <span className="font-headline font-bold text-[48px] text-ink/15 uppercase tracking-[-0.02em]">
                  HBS
                </span>
                <p className="font-mono text-[10px] text-stone-text mt-1 tracking-[0.14em] uppercase">
                  CORe · 2022
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 lg:p-7 relative flex-1 flex flex-col">
          <div
            className="absolute top-0 left-0 right-0 h-[35%] pointer-events-none z-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)',
            }}
          />
          <div className="relative z-10 flex items-baseline justify-between gap-4">
            <h3 className="font-headline font-bold text-[22px] sm:text-[26px] uppercase text-ink leading-tight tracking-[-0.005em] group-hover:text-cobalt transition-colors">
              {project.name}
            </h3>
            <span className="font-mono text-[10px] tracking-[0.16em] text-ink/55 uppercase shrink-0">
              {project.year}
            </span>
          </div>
          <p className="font-mono italic text-[11px] text-stone-text mt-2 uppercase tracking-[0.06em] relative z-10">
            {project.role}
          </p>
          <p className="font-body text-[13.5px] text-ink/75 mt-4 leading-[1.65] relative z-10 flex-1">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-5 relative z-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/70 border border-ink/20 px-2 py-[3px] bg-transparent"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer with read more */}
          <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between relative z-10">
            <span className="font-mono text-[10px] tracking-[0.16em] text-ink/40 uppercase">
              CASE STUDY
            </span>
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-cobalt uppercase">
              OPEN FILE
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function Section03Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    const cards = sectionRef.current.querySelectorAll('.project-card');
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full bg-creme pt-28 pb-24 px-6 lg:px-20 texture-grid relative overflow-hidden"
    >
      {/* Decorative numeral */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute -top-6 right-6 font-headline font-bold text-[180px] leading-none text-ink/[0.04] select-none pointer-events-none tracking-tighter"
      >
        03
      </span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Registry strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-ink/55 uppercase border-b border-ink/15 pb-3 mb-12">
          <span>CASE FILES · DSR/2026/003 — SELECTED WORK</span>
          <span className="text-cobalt">{PROJECTS.length} ENTRIES · 2018 → PRESENT</span>
          <span>SORT · BY RELEVANCE</span>
        </div>

        <SectionEyebrow text="SELECTED WORK" />
        <div className="mt-4 lg:flex lg:items-end lg:justify-between gap-8 mb-12">
          <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-ink leading-[0.95] tracking-[-0.015em]">
            SEVEN PROJECTS.<br />
            <span className="text-cobalt">SEVEN DIORAMAS.</span>
          </h2>
          <p className="font-body italic text-[14px] text-ink/65 mt-4 lg:mt-0 max-w-sm">
            Every system tells a story. Every story has a miniature world — preserved here as a
            case file.
          </p>
        </div>

        {/* Column legend */}
        <div className="hidden lg:flex items-center gap-4 mb-4 font-mono text-[10px] tracking-[0.18em] text-ink/40 uppercase">
          <span>★ FEATURED</span>
          <span className="w-1 h-1 rounded-full bg-ink/30" />
          <span className="text-sage">SHIPPED</span>
          <span className="text-cobalt">OPS</span>
          <span className="text-terracotta">PUBLISHED</span>
          <span className="text-stone-text">ARCHIVE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-ink/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55 uppercase">
            // END OF SUMMARY · FULL CASE FILES AVAILABLE
          </span>
          <Link to="/projects">
            <MechanicalButton variant="outline">
              VIEW FULL CASE STUDIES &rarr;
            </MechanicalButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
