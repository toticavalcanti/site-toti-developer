'use client';

import { motion } from 'framer-motion';

export default function GridBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Deep Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] z-10" />

      {/* Primary Tech Grid */}
      <div 
        className="absolute inset-0 opacity-[0.2]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Secondary Fine Grid */}
      <div 
        className="absolute inset-0 opacity-[0.1]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Moving Light Rays / Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, 50, 0] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px]" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -100, 0],
          y: [0, -50, 0] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] bg-secondary/20 rounded-full blur-[180px]" 
      />

      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
    </div>
  );
}
