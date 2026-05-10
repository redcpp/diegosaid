import { memo } from 'react';

const FuturisticScrollIndicator = memo(function FuturisticScrollIndicator({
  color = 'var(--color-creme)',
}: {
  color?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0">
      <div className="relative w-[1px] h-[60px] overflow-hidden" style={{ backgroundColor: color, opacity: 0.3 }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full animate-scroll-circle"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
});

export default FuturisticScrollIndicator;
