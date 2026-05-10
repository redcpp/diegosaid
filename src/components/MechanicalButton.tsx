import type { ReactNode, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

interface MechanicalButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'outline' | 'filled' | 'filled-cobalt';
  className?: string;
  type?: 'button' | 'submit';
  href?: string;
  to?: string;
}

export default function MechanicalButton({
  children,
  onClick,
  variant = 'outline',
  className = '',
  type = 'button',
  href,
  to,
}: MechanicalButtonProps) {
  const base =
    'inline-flex items-center justify-center h-12 px-8 rounded-full font-headline font-medium text-[12px] uppercase tracking-[0.08em] transition-all duration-200 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2';

  const variants = {
    outline: 'border-2 border-ink text-ink bg-transparent hover:bg-ink hover:text-creme',
    filled: 'border-2 border-creme text-creme bg-transparent hover:bg-creme hover:text-ink',
    'filled-cobalt': 'border-0 text-creme bg-cobalt hover:bg-cobalt/90',
  };

  const clickDown = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.style.transform = 'scale(0.97)';
    el.style.boxShadow = 'inset 0 0 0 2px currentColor';
  };
  const clickUp = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.style.transform = 'scale(1)';
    el.style.boxShadow = 'none';
  };

  const combined = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        className={combined}
        onMouseDown={clickDown}
        onMouseUp={clickUp}
        onMouseLeave={clickUp}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combined}
        onMouseDown={clickDown}
        onMouseUp={clickUp}
        onMouseLeave={clickUp}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combined}
      onMouseDown={clickDown}
      onMouseUp={clickUp}
      onMouseLeave={clickUp}
    >
      {children}
    </button>
  );
}
