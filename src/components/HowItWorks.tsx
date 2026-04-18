'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import { Search, MessageSquare, Rocket, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HowItWorks() {
  const t = useTranslations('process');

  const steps = [
    {
      step: '01',
      title: t('step1_title'),
      description: t('step1_desc'),
      icon: Search,
      color: 'from-blue-500 to-cyan-400',
    },
    {
      step: '02',
      title: t('step2_title'),
      description: t('step2_desc'),
      icon: MessageSquare,
      color: 'from-primary to-primary-light',
    },
    {
      step: '03',
      title: t('step3_title'),
      description: t('step3_desc'),
      icon: Rocket,
      color: 'from-secondary to-secondary-light',
    },
    {
      step: '04',
      title: t('step4_title'),
      description: t('step4_desc'),
      icon: BarChart3,
      color: 'from-accent to-success',
    },
  ];

  return (
    <section id="processo" className="py-32 bg-background-secondary/20 relative">
      <Container>
        <SectionTitle
          title={t('title')}
          subtitle={t('subtitle')}
          centered
          className="mx-auto"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-28 h-28 rounded-[2.5rem] bg-background-secondary border-2 border-border flex items-center justify-center mb-8 relative group-hover:border-primary transition-all duration-500 shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-2`}>
                   <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-lg shadow-primary/20">
                    {step.step}
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-black/20`}>
                    <step.icon size={28} className="text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors uppercase">{step.title}</h3>
                <p className="text-foreground-secondary text-base leading-relaxed max-w-[240px] font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
