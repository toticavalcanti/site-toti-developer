'use client';
import { motion, useReducedMotion } from 'framer-motion';

export default function GridBackground() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" style={{ transform: 'translateZ(0)' }} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] z-10" />
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }} />
      {!shouldReduceMotion && (
        <motion.div
          initial={{ scale: 1, opacity: 0.25 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full"
          style={{ filter: 'blur(100px)', willChange: 'transform, opacity' }}
        />
      )}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0.2 }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-secondary/20 rounded-full"
          style={{ filter: 'blur(120px)', willChange: 'transform, opacity' }}
        />
      )}
    </div>
  );
}
