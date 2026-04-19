'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useSpring(0, { damping: 20, stiffness: 250 });
  const mouseY = useSpring(0, { damping: 20, stiffness: 250 });

  const ringX = useSpring(0, { damping: 30, stiffness: 150 });
  const ringY = useSpring(0, { damping: 30, stiffness: 150 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(
        !!target.closest('a') || 
        !!target.closest('button') || 
        target.classList.contains('interactive')
      );
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, ringX, ringY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block">
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-white/40 rounded-full"
        animate={{
          width: isHovered ? 64 : (isActive ? 24 : 32),
          height: isHovered ? 64 : (isActive ? 24 : 32),
          opacity: isActive ? 0.8 : 0.4,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
}
