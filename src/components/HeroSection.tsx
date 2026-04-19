'use client';

import Container from './Container';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { aboutInfo } from '@/mockData';
import { useTranslations } from 'next-intl';
import MagneticButton from './ui/MagneticButton';
import AnimatedButton from './ui/AnimatedButton';

export default function HeroSection() {
  const t = useTranslations('hero');
  const whatsappUrl = `https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}?text=Olá! Vim pelo site e gostaria de um orçamento.`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12">
      <Container>
        <motion.div 
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge - GIANT BUT CLEAN */}
          <motion.div
            variants={itemVariants}
            className="mb-12 px-10 py-5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md"
          >
            <span className="text-sm sm:text-lg md:text-xl font-medium uppercase tracking-[0.2em] text-primary/90">
              {t('badge')}
            </span>
          </motion.div>

          {/* Title - Elegant & Authoritative Scale */}
          <div className="mb-12">
            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl md:text-8xl font-light leading-[1] tracking-tight text-white mb-2"
            >
              {t('title')}
            </motion.h1>
            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl md:text-8xl font-light leading-[1] tracking-tight text-white/30"
            >
              {t('title_accent')}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-foreground-secondary mb-16 max-w-2xl leading-relaxed font-light"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs - Unified & Equalized */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <MagneticButton>
              <Link href={whatsappUrl as any} target="_blank">
                <AnimatedButton variant="primary" size="lg" className="w-[280px] h-16 rounded-full tracking-wide">
                  {t('cta_primary')}
                </AnimatedButton>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/cases">
                <AnimatedButton variant="outline" size="lg" className="w-[280px] h-16 rounded-full border-primary/40 text-primary/90 hover:text-white hover:bg-primary/20 tracking-wide">
                  {t('cta_secondary')}
                </AnimatedButton>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
      </motion.div>
    </section>
  );
}
