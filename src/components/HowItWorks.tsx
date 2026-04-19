'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import { Search, MessageSquare, Rocket, BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';

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
      color: 'from-emerald-400 to-teal-500',
    },
  ];

  return (
    <section id="processo" className="py-16 sm:py-20 relative">
      <Container>
        <SectionTitle
          title={t('title')}
          subtitle={t('subtitle')}
          centered
          className="mx-auto"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mt-20 relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-[50px] left-[10%] right-[10%] h-[1px] bg-border/50 -z-10" />

          {steps.map((step, index) => (
            <ScrollReveal
              key={step.step}
              delay={index * 0.15}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-background-secondary border border-border flex items-center justify-center mb-8 relative group-hover:border-primary/50 transition-all duration-500 shadow-xl group-hover:-translate-y-2">
                   <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-primary/20">
                    {step.step}
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-black/20`}>
                    <step.icon size={22} className="text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 tracking-tight group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-foreground-secondary text-sm leading-relaxed max-w-[240px]">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
