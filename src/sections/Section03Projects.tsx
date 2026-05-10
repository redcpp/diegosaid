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
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    name: 'CAM GRUPO',
    video: './video-projects-realestate.mp4',
    description: 'Luxury real estate brokerage in Riviera Nayarit. Corporate websites, HDR photography pipeline, on-premise LLM inference stack.',
    tags: ['Real Estate', 'LLM', 'Automation'],
    sectionId: 'cam-grupo',
    featured: true,
  },
  {
    name: 'XBACKED DAO',
    video: './video-projects-defi.mp4',
    description: 'DeFi lending protocol on Algorand. Authored ADR-47 — a formal proof by contradiction that prevented a flawed LP-seeding mechanism.',
    tags: ['DeFi', 'Smart Contracts', 'Risk Analysis'],
    sectionId: 'xbacked',
  },
  {
    name: 'VCF/PLOTEIN',
    video: './video-projects-genomics.mp4',
    description: 'Clinical genomic interpretation web app. Published in Bioinformatics, Oxford Academic. Co-authored with Oxford, UNAM, and Cambridge researchers.',
    tags: ['Genomics', 'Vue.js', 'Bioinformatics'],
    sectionId: 'vcf-plotein',
  },
  {
    name: 'ORACLE BIG DATA',
    video: './video-projects-oracle.mp4',
    description: 'OCI image pipelines and CI/CD for Big Data workloads. Automated server re-imaging, firmware updates, release testing, global Severity 1 support.',
    tags: ['Cloud', 'CI/CD', 'Python'],
    sectionId: 'oracle',
  },
  {
    name: 'DECENTRACARE CRM',
    video: './video-projects-decentracare.mp4',
    description: 'Healthcare CRM platform for hundreds of nurses. ETL pipelines for MiHIN (HIPAA-compliant).',
    tags: ['Healthcare', 'React', 'ETL'],
    sectionId: 'decentracare',
  },
  {
    name: 'ML & LLM SYSTEMS',
    video: './video-projects-ml-llm.mp4',
    description: 'Private MLX inference stack on Apple Silicon. Custom Claude-based skills for legal documents. Market intelligence dashboard analyzing 1,500+ MLS transactions.',
    tags: ['Machine Learning', 'LLM', 'Quantitative'],
    sectionId: 'ml-llm',
  },
  {
    name: 'HARVARD CORe',
    video: null,
    description: 'Harvard Business School CORe — Business Analytics, Economics, Financial Accounting. Credential earned 2022.',
    tags: ['Business', 'Analytics', 'Economics'],
    sectionId: 'harvard-core',
  },
];

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

  return (
    <Link
      to={`/projects?section=${project.sectionId}`}
      className="block group"
    >
      <div
        className={`project-card opacity-0 bg-parchment rounded-sm border border-ink/10 overflow-hidden transition-all duration-350
          ${hovered ? 'border-cobalt' : ''}
          ${project.featured ? 'lg:col-span-2' : ''}`}
        style={{ transitionTimingFunction: 'var(--ease-bounce)' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-index={index}
      >
        {/* Video Thumbnail — Diorama Frame */}
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
              {/* Glass reflection overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)',
                }}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-ink/5" style={{ boxShadow: 'inset 0 4px 32px rgba(0,0,0,0.10)' }}>
              <div className="text-center">
                <span className="font-headline font-bold text-[32px] text-ink/10 uppercase">HBS</span>
                <p className="font-mono text-[11px] text-stone-text mt-1">CORe Credential 2022</p>
              </div>
            </div>
          )}
        </div>

        {/* Content — Museum Placard */}
        <div className="p-6 lg:p-8 relative">
          {/* Top gradient for studio lighting */}
          <div
            className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none z-0"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)' }}
          />
          <h3 className="font-headline font-bold text-display-sm uppercase text-ink relative z-10">
            {project.name}
          </h3>
          <p className="font-body text-body-sm text-ink/65 mt-2 leading-relaxed relative z-10">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4 relative z-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-headline font-medium text-[11px] uppercase tracking-[0.04em] border border-ink/15 text-ink/75 px-3 py-1 bg-transparent"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
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
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full bg-creme pt-32 pb-24 px-6 lg:px-20 texture-grid"
    >
      <div className="max-w-[1200px] mx-auto relative z-10">
        <SectionEyebrow text="SELECTED WORK" />
        <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-ink text-center mt-4">
          SEVEN PROJECTS. SEVEN DIORAMAS.
        </h2>
        <p className="font-body text-body-sm text-ink/65 text-center mt-3 max-w-lg mx-auto">
          Every system tells a story. Every story has a miniature world.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-16">
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
