import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalPanWipeProps {
  color?: string;
  width?: string;
  className?: string;
}

export default function HorizontalPanWipe({
  color = 'var(--color-stone)',
  width = '100%',
  className = '',
}: HorizontalPanWipeProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 85%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === lineRef.current) t.kill();
      });
    };
  }, []);

  return (
    <div className={`flex justify-center ${className}`} style={{ width }}>
      <div
        ref={lineRef}
        className="w-full h-[1px] origin-center"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
