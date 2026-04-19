'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  y?: number;
  x?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  width = "100%", 
  delay = 0.2, 
  direction = "up",
  y,
  x,
  className
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitial = () => {
    if (y !== undefined || x !== undefined) {
      return { opacity: 0, y: y ?? 0, x: x ?? 0 };
    }
    switch (direction) {
      case "up": return { opacity: 0, y: 75 };
      case "down": return { opacity: 0, y: -75 };
      case "left": return { opacity: 0, x: 75 };
      case "right": return { opacity: 0, x: -75 };
      default: return { opacity: 0, y: 75 };
    }
  };

  return (
    <div ref={ref} className={className} style={{ position: "relative", width, overflow: "visible" }}>
      <motion.div
        variants={{
          hidden: getInitial(),
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ 
          duration: 1.2, 
          delay, 
          ease: [0.25, 1, 0.5, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
