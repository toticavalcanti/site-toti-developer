'use client';

import Container from './Container';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { aboutInfo } from '@/mockData';
import { useTranslations } from 'next-intl';
import MagneticButton from './ui/MagneticButton';
import AnimatedButton from './ui/AnimatedButton';
import TextReveal from './ui/TextReveal';
import ArchitecturalCore from './ArchitecturalCore';
import { useQualification } from '@/lib/qualification-context';

export default function HeroSection() {
  const t = useTranslations('hero');
  const { open } = useQualification();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-32 overflow-hidden">
      <ArchitecturalCore />
      
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <motion.div 
          className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-10 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-xl"
          >
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-primary/80">
              {t('badge')}
            </span>
          </motion.div>

          <div className="mb-8 w-full">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight text-white flex flex-col items-center">
              <TextReveal delay={0.2} className="justify-center">
                {t('title')}
              </TextReveal>
              <div className="mt-4 flex justify-center w-full">
                <TextReveal 
                  delay={0.6} 
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent italic font-serif py-2 justify-center"
                >
                  {t('title_accent')}
                </TextReveal>
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 max-w-2xl px-4">
            <TextReveal delay={0.8} className="text-sm sm:text-lg md:text-xl text-foreground-secondary leading-relaxed font-light justify-center">
              {t('subtitle')}
            </TextReveal>
          </div>

          {/* CTAs - Unified & Equalized */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full px-4"
          >
            <MagneticButton>
              <div className="w-full sm:w-auto overflow-visible cursor-pointer" onClick={() => open(undefined, 'hero')}>
                <AnimatedButton variant="primary" size="lg" className="w-full sm:w-72 h-16 rounded-full tracking-wider shadow-2xl shadow-primary/10 group overflow-hidden">
                  <span className="relative z-10">{t('cta_primary')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </AnimatedButton>
              </div>
            </MagneticButton>
            
            <MagneticButton>
              <Link href="/cases" className="w-full sm:w-auto">
                <AnimatedButton variant="outline" size="lg" className="w-full sm:w-72 h-16 rounded-full border-primary/30 text-primary/90 hover:text-white hover:border-primary/60 transition-all duration-500 tracking-wider">
                  {t('cta_secondary')}
                </AnimatedButton>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium rotate-90 origin-left translate-x-[4px]">SCROLL</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
      </motion.div>
    </section>
  );
}

