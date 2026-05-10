import { useLenis } from '@/lib/lenis-context';

export default function SkipLink() {
  const lenis = useLenis();

  const handleSkip = () => {
    const target = document.getElementById('main-content');
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -64 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    target.focus({ preventScroll: true });
  };

  return (
    <button type="button" onClick={handleSkip} className="skip-link">
      Skip to main content
    </button>
  );
}
