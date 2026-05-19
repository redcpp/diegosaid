import { useRef } from 'react';
import { useLazyVideo } from '@/hooks/use-lazy-video';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MechanicalButton from '@/components/MechanicalButton';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const METRICS = ['20+ AGENTS', '7-FIGURE SALES', '6-STAGE HDR PIPELINE', 'PRIVATE LLM STACK'];

export default function Section02CamGrupo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    });

    if (leftRef.current) {
      tl.fromTo(leftRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0);
    }
    if (rightRef.current) {
      tl.fromTo(rightRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.15);
    }
    tl.fromTo(
      sectionRef.current.querySelectorAll('.metric-pill'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
      0.35
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="cam-grupo"
      className="w-full bg-creme pt-20 lg:pt-24 pb-20 px-6 lg:px-20"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Registry strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-ink/55 uppercase border-b border-ink/15 pb-3 mb-10">
          <span>CASE FILE · DSR/2026/P-01</span>
          <span className="text-cobalt">CENTURY 21 CAM GRUPO</span>
          <span>2020 → PRESENT · OPS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column — video + identity */}
          <div ref={leftRef} className="opacity-0 lg:col-span-5">
            <div className="relative w-full aspect-video rounded-sm border border-stone overflow-hidden">
              <video
                ref={useLazyVideo()}
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover"
                aria-label="Century 21 CAM Grupo real estate showcase video"
              >
                <source src="/video-projects-realestate.webm" type="video/webm" />
                <source src="/video-projects-realestate.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-creme/55 pointer-events-none" />
              <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-creme/55 pointer-events-none" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] tracking-[0.18em] text-creme/80 uppercase z-10">
                <span>CASE / 01</span>
                <span>№ 01 / 07</span>
              </div>
            </div>

            <div className="mt-6">
              <span className="font-mono text-[10px] tracking-[0.18em] text-cobalt uppercase">
                CENTURY 21 CAM GRUPO
              </span>
              <h2 className="font-headline font-bold text-[24px] sm:text-[30px] uppercase text-ink leading-[1.05] tracking-[-0.01em] mt-2">
                LUXURY REAL ESTATE BROKERAGE &amp; AI INFRASTRUCTURE
              </h2>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text uppercase">
                  MARCH 2020 — PRESENT
                </span>
                <span className="font-mono text-[11px] tracking-[0.14em] text-stone-text/60 uppercase">·</span>
                <span className="font-body italic text-[13px] text-cobalt">
                  Founder &amp; Technical Director
                </span>
              </div>
            </div>
          </div>

          {/* Right column — body */}
          <div ref={rightRef} className="opacity-0 lg:col-span-7 lg:pt-1">
            <p className="font-body text-[15px] text-ink leading-[1.7]">
              Founded and lead a 20+ agent luxury residential brokerage in Riviera Nayarit,
              producing seven-figure sales of pre-sale developments. Built the entire corporate
              technology stack: websites and property portals, an automated contract generation
              system for NOM-247 compliant documents, a private on-premise LLM inference stack on
              Apple Silicon (MLX, Tailscale), and custom Claude-based skills for contract
              comparison and legal document organization. Automated a 6-stage HDR photography
              pipeline (perspective correction, sharpening, CLAHE, cinematic LUT application).
            </p>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {METRICS.map((m) => (
                <span
                  key={m}
                  className="metric-pill opacity-0 font-mono text-[10px] uppercase tracking-[0.12em] text-cobalt border border-cobalt/40 bg-cobalt/5 px-2 py-[3px]"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-ink/10">
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45 uppercase">
                § STACK
              </span>
              <p className="font-mono text-[12px] text-stone-text mt-2 leading-[1.7]">
                Python · TypeScript · React · Next.js · MLX · Tailscale · Claude API · PostgreSQL · AWS
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-ink/10">
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45 uppercase">
                § FEATURED DEVELOPMENTS
              </span>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                {[
                  { name: 'Kumo Living', url: 'https://kumoliving.com.mx/' },
                  { name: 'Cumbres de Mita', url: 'https://cumbresdemita.com/' },
                  { name: 'Della Residencial', url: 'https://dellagoresidencial.com/' },
                ].map((dev) => (
                  <a
                    key={dev.name}
                    href={dev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group font-body text-[13px] text-ink hover:text-cobalt transition-colors flex items-center gap-1.5"
                  >
                    {dev.name}
                    <span className="text-cobalt opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <MechanicalButton variant="outline" href="https://camgrupo.com">
                VISIT CAMGRUPO.COM →
              </MechanicalButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
