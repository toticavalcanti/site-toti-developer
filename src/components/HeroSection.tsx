'use client';

import Container from './Container';
import Button from './Button';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, MousePointer2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { aboutInfo } from '@/mockData';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');
  const whatsappUrl = `https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}?text=Olá! Vim pelo site e gostaria de um orçamento.`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] },
    },
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] -z-10 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-0 left-[-10%] w-[40%] h-[40%] bg-secondary/15 blur-[120px] -z-10 rounded-full animate-pulse-slow-reverse" />

      <Container>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center relative"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary">
              {t('badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-7xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
          >
            {t('title')} <br />
            <span className="gradient-text drop-shadow-[0_10px_10px_rgba(var(--primary-rgb),0.2)]">
              {t('title_accent')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-2xl text-foreground-secondary mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            {t('subtitle')}
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Button size="lg" asChild className="w-full sm:w-auto h-16 px-10 rounded-2xl shadow-2xl shadow-primary/30 text-lg font-black group">
              <Link href={whatsappUrl as any} target="_blank">
                <MessageCircle size={22} className="mr-3 group-hover:scale-125 transition-transform" /> 
                {t('cta_primary')}
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto h-16 px-10 rounded-2xl border-border bg-background/50 backdrop-blur-md text-lg font-black group">
              <Link href="/cases">
                {t('cta_secondary')} 
                <ArrowRight size={22} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Footer Hero */}
          <motion.div
            variants={itemVariants}
            className="mt-20 pt-10 border-t border-border/30"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-foreground-muted">
                <MousePointer2 size={12} />
                Focus Tech Stack
              </div>
              <div className="flex flex-wrap justify-center gap-8 sm:gap-16 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                <span className="text-2xl font-black tracking-tighter">NEXT.JS</span>
                <span className="text-2xl font-black tracking-tighter">TYPESCRIPT</span>
                <span className="text-2xl font-black tracking-tighter">TAILWIND</span>
                <span className="text-2xl font-black tracking-tighter">AI AGENTS</span>
                <span className="text-2xl font-black tracking-tighter">Vercel</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
      
      {/* Scroll indicator - added for more life */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent animate-bounce-slow" />
      </motion.div>
    </section>
  );
}
