'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import { Layout, ShoppingCart, MessageSquare, Code2, ArrowRight, Zap } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import SpotlightCard from './ui/SpotlightCard';
import ScrollReveal from './ui/ScrollReveal';

export default function ServicesOverview() {
  const t = useTranslations('services');
  const locale = useLocale();

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

        {/* Diagnostic Callout Banner */}
        <ScrollReveal delay={0.2} className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-background-secondary/40 backdrop-blur-md p-8 sm:p-10 group transition-all duration-500 hover:border-primary/40 shadow-2xl shadow-primary/5">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                  <Zap size={12} className="fill-primary" />
                  {locale === 'pt' ? 'Diagnóstico Inicial' : 'Initial Diagnosis'}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
                  {t('audit_callout_title')}
                </h3>
                <p className="text-foreground-secondary text-base leading-relaxed max-w-2xl">
                  {t('audit_callout_desc')}
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <Link 
                  href="/services#auditoria" 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold text-sm tracking-wide hover:bg-primary-light transition-all duration-300 shadow-xl shadow-primary/20 group/btn"
                >
                  {t('audit_cta')}
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

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
