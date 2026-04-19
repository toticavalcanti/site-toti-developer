'use client';

import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // segundos por loop
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  return (
    <div className={`group relative flex overflow-hidden ${className}`} style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <div
        className={`flex shrink-0 items-center justify-around gap-16 py-2 ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          minWidth: '100%',
        }}
      >
        {children}
      </div>
      <div
        className={`flex shrink-0 items-center justify-around gap-16 py-2 ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        aria-hidden="true"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          minWidth: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}
