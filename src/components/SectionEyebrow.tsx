import { useEffect, useRef, useState } from 'react';

interface SectionEyebrowProps {
  text: string;
  color?: string;
  className?: string;
  delay?: number;
}

export default function SectionEyebrow({
  text,
  color = 'var(--color-stone)',
  className = '',
  delay = 0,
}: SectionEyebrowProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const fullText = `// \u2501\u2501\u2501 ${text} \u2501\u2501\u2501`;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(fullText.slice(0, i));
        if (i >= fullText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [started, text, delay]);

  return (
    <span
      ref={ref}
      className={`font-mono text-label tracking-[0.04em] block text-center ${className}`}
      style={{ color }}
    >
      {displayed}
      <span className="animate-cursor-blink">_</span>
    </span>
  );
}
