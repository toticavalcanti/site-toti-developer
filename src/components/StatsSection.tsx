'use client';

import Container from './Container';
import { useTranslations } from 'next-intl';
import { Users, Code, Zap, Globe } from 'lucide-react';
import AnimatedCounter from './ui/AnimatedCounter';
import ScrollReveal from './ui/ScrollReveal';

export default function StatsSection() {
  const t = useTranslations('stats');

  const stats = [
    { id: 'leads', value: 10000, suffix: '+', label: t('leads'), icon: Users, color: 'from-primary to-primary-light' },
    { id: 'projects', value: 50, suffix: '+', label: t('projects'), icon: Code, color: 'from-secondary to-secondary-light' },
    { id: 'performance', value: 100, suffix: '', label: t('performance'), icon: Zap, color: 'from-emerald-400 to-teal-500' },
    { id: 'clients', value: 5, suffix: '', label: t('countries'), icon: Globe, color: 'from-blue-600 to-indigo-500' },
  ];

  return (
    <section className="py-32 relative border-y border-border/30">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.id} delay={index * 0.1} className="flex flex-col items-center text-center group">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-5 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <div className="text-4xl sm:text-5xl font-semibold mb-2 tracking-tighter gradient-text">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2} />
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
                {stat.label}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
