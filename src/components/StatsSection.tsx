'use client';

import Container from './Container';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Users, Code, Zap, Globe } from 'lucide-react';

export default function StatsSection() {
  const t = useTranslations('stats');

  const stats = [
    {
      id: 'leads',
      value: '10k+',
      label: t('leads'),
      icon: Users,
      color: 'from-primary to-primary-light'
    },
    {
      id: 'projects',
      value: '50+',
      label: t('projects'),
      icon: Code,
      color: 'from-secondary to-secondary-light'
    },
    {
      id: 'performance',
      value: '100',
      label: t('performance'),
      icon: Zap,
      color: 'from-emerald-400 to-teal-500'
    },
    {
      id: 'clients',
      value: '5',
      label: t('countries'),
      icon: Globe,
      color: 'from-blue-600 to-indigo-500'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden border-y border-border/50 bg-background/50 backdrop-blur-sm">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={28} className="text-white" />
              </div>
              <span className="text-4xl sm:text-5xl font-black mb-2 tracking-tighter gradient-text">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-foreground-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
