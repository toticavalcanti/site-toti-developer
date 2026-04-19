'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HeroVisualExperimental() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* Structural Grid */}
      <div 
        className="absolute inset-0 opacity-[0.08]" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff15 1px, transparent 1px), linear-gradient(to bottom, #ffffff15 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        }} 
      />
      
      {/* Floating Interface Panels (Pseudo-3D) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-7xl h-[600px]">
          
          {/* Panel 1: Analytics / Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 15, rotateY: -15 }}
            animate={{ 
              opacity: 1, 
              y: [0, -20, 0],
              rotateX: [15, 12, 15],
              rotateY: [-15, -12, -15],
            }}
            transition={{ 
              opacity: { duration: 1.2 },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-[10%] -right-12 sm:right-[15%] w-[320px] h-[240px] rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl p-6 hidden sm:block"
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <div className="w-12 h-2 bg-white/10 rounded-full mb-6" />
            <div className="space-y-4">
              <div className="h-4 bg-primary/20 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-1/2" />
              <div className="pt-4 flex gap-2">
                <div className="h-16 flex-1 bg-gradient-to-t from-primary/20 to-transparent rounded-lg" />
                <div className="h-16 flex-1 bg-gradient-to-t from-primary/10 to-transparent rounded-lg" />
                <div className="h-16 flex-1 bg-gradient-to-t from-primary/30 to-transparent rounded-lg" />
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl -z-10 opacity-50" />
          </motion.div>

          {/* Panel 2: Code / Technical Surface */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: -10, rotateY: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, 20, 0],
              rotateX: [-10, -8, -10],
              rotateY: [20, 18, 20],
            }}
            transition={{ 
              opacity: { duration: 1.2, delay: 0.2 },
              y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 11, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 13, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-[20%] -left-12 sm:left-[10%] w-[380px] h-[280px] rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl p-6 hidden md:block"
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <div className="flex gap-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-red-500/30" />
              <div className="w-2 h-2 rounded-full bg-amber-500/30" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/30" />
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-4 h-4 rounded bg-white/10" />
                <div className="h-4 bg-secondary/20 rounded w-1/2" />
              </div>
              <div className="ml-7 h-3 bg-white/5 rounded w-3/4" />
              <div className="ml-7 h-3 bg-white/5 rounded w-2/3" />
              <div className="ml-7 h-3 bg-white/5 rounded w-1/2" />
              <div className="flex gap-3 pt-4">
                <div className="w-4 h-4 rounded bg-white/10" />
                <div className="h-4 bg-primary/20 rounded w-1/3" />
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-secondary/20 to-transparent rounded-2xl -z-10 opacity-50" />
          </motion.div>

          {/* Background Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-20" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-20" />
        </div>
      </div>
    </div>
  );
}
