'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // duração em segundos para um ciclo completo
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 200,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth);
    }
  }, [children]);

  return (
    <div 
      className={`group relative flex overflow-hidden ${className}`} 
      style={{ 
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
      }}
    >
      <motion.div
        className="flex shrink-0 items-center gap-16 py-4"
        animate={{
          x: direction === 'left' ? [-contentWidth / 3, -(contentWidth * 2) / 3] : [-(contentWidth * 2) / 3, -contentWidth / 3],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: 'max-content',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      >
        <div ref={contentRef} className="flex items-center gap-16 shrink-0">
          {children}
        </div>
        <div className="flex items-center gap-16 shrink-0" aria-hidden="true">
          {children}
        </div>
        <div className="flex items-center gap-16 shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
