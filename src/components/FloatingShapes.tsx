'use client';

import { motion } from 'framer-motion';

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Oracle Circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/20"
          initial={{ width: 200, height: 200, opacity: 0 }}
          animate={{
            width: [200, 600, 200],
            height: [200, 600, 200],
            opacity: [0.1, 0.3, 0.1],
            x: [Math.random() * 100, Math.random() * 500, Math.random() * 100],
            y: [Math.random() * 100, Math.random() * 500, Math.random() * 100],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${10 + i * 30}%`,
            top: `${10 + i * 20}%`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Speed Lines */}
      <div className="absolute inset-0 opacity-[0.05]">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ x: '-100%', width: '100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            style={{ top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
