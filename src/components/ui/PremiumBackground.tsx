'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function PremiumBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Aurora 1 */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Aurora 2 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[100px]"
        animate={{
          x: [100, 200, 150, 100],
          y: [200, 100, 250, 200],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          right: '10%',
          top: '20%',
        }}
      />

      {/* Aurora 3 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[80px]"
        animate={{
          x: [-50, 50, 0, -50],
          y: [0, 100, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          left: '20%',
          bottom: '10%',
        }}
      />

      {/* Grain Effect */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
