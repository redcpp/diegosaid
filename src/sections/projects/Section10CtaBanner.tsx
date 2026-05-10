import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MechanicalButton from '@/components/MechanicalButton';

gsap.registerPlugin(ScrollTrigger);

export default function Section10CtaBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    // Character split animation for title
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.02, ease: 'power3.out' },
        0
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.3);
    }

    if (buttonsRef.current) {
      const btns = buttonsRef.current.querySelectorAll('.cta-btn');
      tl.fromTo(btns, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.5);
    }
  }, { scope: sectionRef });

  const handleContactClick = () => {
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  const titleText = 'WANT TO GO DEEPER?';

  return (
    <section ref={sectionRef} className="relative w-full bg-ink py-32 lg:py-40 px-6 lg:px-20 overflow-hidden">
      {/* Animated noise texture overlay */}
      <div
        className="absolute inset-0 animate-noise pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
          opacity: 0.04,
        }}
      />

      {/* Pulsing cobalt circle */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full animate-pulse-slow pointer-events-none"
        style={{ backgroundColor: 'var(--color-cobalt)', opacity: 0.06 }}
      />

      {/* Content — dead center */}
      <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center text-center">
        {/* Title with character split */}
        <h2
          ref={titleRef}
          className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-creme"
        >
          {titleText.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-[16px] text-stone text-center max-w-[560px] mt-4"
        >
          Every project has a story. The full story is in the code.
        </p>

        {/* Button row */}
        <div ref={buttonsRef} className="flex flex-wrap gap-6 justify-center mt-10">
          <div className="cta-btn">
            <MechanicalButton variant="filled" to="/">BACK TO HOME →</MechanicalButton>
          </div>
          <div className="cta-btn">
            <MechanicalButton variant="filled-cobalt" onClick={handleContactClick}>
              GET IN TOUCH →
            </MechanicalButton>
          </div>
        </div>
      </div>
    </section>
  );
}
