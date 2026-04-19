'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingShapes() {
  const shouldReduceMotion = useReducedMotion();
  const [positions, setPositions] = useState<Array<{left: string; top: string; dx: number; dy: number}>>([]);

  useEffect(() => {
    const p = [...Array(3)].map((_, i) => ({
      left: `${10 + i * 30}%`,
      top: `${10 + i * 20}%`,
      dx: Math.random() * 80 - 40,
      dy: Math.random() * 80 - 40,
    }));
    setPositions(p);
  }, []);

  if (shouldReduceMotion || positions.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }} aria-hidden="true">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/20"
          initial={{ scale: 0.6, opacity: 0.1, x: 0, y: 0 }}
          animate={{ scale: [0.6, 1.4, 0.6], opacity: [0.1, 0.25, 0.1], x: [0, pos.dx, 0], y: [0, pos.dy, 0] }}
          transition={{ duration: 24 + i * 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: pos.left, top: pos.top, width: 400, height: 400, filter: 'blur(40px)', willChange: 'transform, opacity' }}
        />
      ))}
    </div>
  );
}
