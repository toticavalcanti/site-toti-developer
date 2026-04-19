'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import { Layout, ShoppingCart, MessageSquare, Code2, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import SpotlightCard from './ui/SpotlightCard';
import ScrollReveal from './ui/ScrollReveal';

export default function ServicesOverview() {
  const t = useTranslations('services');

  const services = [
    {
      id: 'landing-pages',
      title: t('lp_title'),
      description: t('lp_desc'),
      icon: Layout,
      href: '/services#landing-pages',
      cta: 'Details',
      gradient: 'from-primary to-primary-light',
    },
    {
      id: 'ecommerce',
      title: t('store_title'),
      description: t('store_desc'),
      icon: ShoppingCart,
      href: '/services#ecommerce',
      cta: 'Details',
      gradient: 'from-secondary to-secondary-light',
    },
    {
      id: 'automation',
      title: t('automation_title'),
      description: t('automation_desc'),
      icon: MessageSquare,
      href: '/services#automation',
      cta: 'Details',
      gradient: 'from-emerald-500 to-teal-400',
    },
    {
      id: 'custom',
      title: t('custom_title'),
      description: t('custom_desc'),
      icon: Code2,
      href: '/services#custom',
      cta: 'Details',
      gradient: 'from-blue-600 to-indigo-500',
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative">
      <Container>
        <SectionTitle
          title={t('title')}
          subtitle={t('subtitle')}
          centered
          className="mx-auto"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.1}>
              <SpotlightCard className="h-full p-8 rounded-2xl border border-border bg-background-secondary/40 backdrop-blur-sm transition-all duration-500 hover:border-primary/30">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
                  <service.icon size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">{service.title}</h3>
                <p className="text-foreground-secondary text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link href={service.href as any} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-3 transition-all duration-300">
                  {service.cta} <ArrowRight size={14} />
                </Link>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
