'use client';

import Container from './Container';
import { aboutInfo } from '@/mockData';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code2, Zap, Layout } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AboutPreview() {
  const t = useTranslations();

  const highlights = [
    { 
      icon: Code2, 
      label: t('about.robust_systems'), 
      color: 'from-primary to-primary-light' 
    },
    { 
      icon: Layout, 
      label: t('about.ui_ux'), 
      color: 'from-secondary to-secondary-light' 
    },
    { 
      icon: Zap, 
      label: t('about.performance'), 
      color: 'from-emerald-500 to-teal-400' 
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-primary/5 blur-[100px] -z-10" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border bg-background-secondary shadow-2xl shadow-primary/5 group">
                <Image
                  src={aboutInfo.avatar}
                  alt={aboutInfo.name}
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  priority
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-secondary/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="absolute -bottom-6 -right-6 bg-background border border-border p-6 rounded-2xl shadow-xl z-20 hidden md:block">
              <p className="text-3xl font-bold gradient-text">10+</p>
              <p className="text-xs uppercase tracking-widest text-foreground-muted">Years Exp</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-8">
               <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                {t('about.title_prefix')}
                <span className="gradient-text">
                  {t('about.title_accent')}
                </span>
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </div>

            <p className="text-foreground-secondary mb-10 text-lg leading-relaxed">
              {t('about.bio')}
            </p>

            <div className="grid grid-cols-3 gap-6 mb-12">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-[2rem] bg-background-secondary border border-border group hover:border-primary/50 transition-all duration-500"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform shadow-lg shadow-black/20`}>
                    <item.icon size={26} className="text-white" />
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground-secondary group-hover:text-primary transition-colors">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-foreground-secondary text-sm leading-relaxed group-hover:text-foreground transition-colors">
                    {t(`about.point${i}`)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
