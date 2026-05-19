import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MechanicalButton from '@/components/MechanicalButton';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Section10CtaBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.cta-row'),
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  const handleContactClick = () => {
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ink py-24 lg:py-32 px-6 lg:px-20 overflow-hidden border-t border-creme/15"
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

      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Registry strip */}
        <div className="cta-row flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-stone uppercase border-b border-creme/15 pb-3 mb-14">
          <span>CLOSING · DSR/2026/P-10 — CALL</span>
          <span className="text-cobalt">END OF VOLUME P</span>
          <span>NEXT · DOSSIER</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <span className="cta-row block font-mono text-[10px] tracking-[0.18em] text-cobalt uppercase mb-4">
              § INVITATION
            </span>
            <h2 className="cta-row font-headline font-bold text-[44px] sm:text-[72px] lg:text-[96px] uppercase text-creme leading-[0.92] tracking-[-0.025em]">
              WANT TO GO<br />
              <span className="text-cobalt">DEEPER?</span>
            </h2>
            <p className="cta-row font-body italic text-[15px] sm:text-[17px] text-stone mt-6 max-w-[55ch] leading-[1.65]">
              Every project has a story. The full story is in the code — and the conversation
              starts here.
            </p>
          </div>

          <div className="cta-row lg:col-span-4 flex flex-col gap-3">
            <MechanicalButton variant="filled-cobalt" onClick={handleContactClick}>
              GET IN TOUCH →
            </MechanicalButton>
            <MechanicalButton variant="filled" to="/">
              ← RETURN TO COVER
            </MechanicalButton>
            <span className="mt-2 font-mono text-[10px] tracking-[0.18em] text-stone/60 uppercase text-center">
              SLA · ~24 HRS
            </span>
          </div>
        </div>

        {/* Bottom rail */}
        <div className="cta-row mt-16 pt-4 border-t border-creme/10 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-stone/55 uppercase">
          <span>// EOF · VOLUME P</span>
          <span>FILE CLOSED · OK</span>
        </div>
      </div>
    </section>
  );
}
