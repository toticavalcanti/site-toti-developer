'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import { Check, MessageCircle, Zap, Shield, Globe } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/utils';
import ScrollReveal from './ui/ScrollReveal';
import AnimatedButton from './ui/AnimatedButton';

import { useQualification } from '@/lib/qualification-context';
import { ProjectType } from '@/lib/qualification-schema';
import { packagePricing, Locale } from '@/lib/pricing';

export default function PackagesSection() {
  const t = useTranslations('packages');
  const tc = useTranslations('ctas');
  const locale = useLocale() as Locale;
  const { open } = useQualification();

  const allPackages = [
    { 
      id: 'landing', 
      name: t('lp_name'), 
      icon: Zap, 
      desc: t('lp_desc'), 
      features: [
        t('features.lp.0'), 
        t('features.lp.1'), 
        t('features.lp.2'), 
        t('features.lp.3'), 
        t('features.lp.4')
      ], 
      highlight: false 
    },
    { 
      id: 'ecommerce', 
      name: t('store_name'), 
      icon: Globe, 
      desc: t('store_desc'), 
      features: [
        t('features.store.0'), 
        t('features.store.1'), 
        t('features.store.2'), 
        t('features.store.3'), 
        t('features.store.4')
      ], 
      highlight: true 
    },
    { 
      id: 'automation', 
      name: t('automation_name'), 
      icon: MessageCircle, 
      desc: t('automation_desc'), 
      features: [
        t('features.automation.0'), 
        t('features.automation.1'), 
        t('features.automation.2'), 
        t('features.automation.3'), 
        t('features.automation.4')
      ], 
      highlight: false 
    },
    { 
      id: 'custom', 
      name: t('custom_name'), 
      icon: Shield, 
      desc: t('custom_desc'), 
      features: [
        t('features.custom.0'), 
        t('features.custom.1'), 
        t('features.custom.2'), 
        t('features.custom.3'), 
        t('features.custom.4')
      ], 
      highlight: false 
    },
  ];

  return (
    <section id="pacotes" className="py-16 sm:py-20 relative">
      <Container>
        <SectionTitle
          title={t('title')}
          subtitle={t('subtitle')}
          centered
        />

        {/* Auditoria Express - Entry Offer Block */}
        <ScrollReveal delay={0.1} className="mt-16 mb-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-primary/30 bg-background-secondary p-8 sm:p-12 shadow-2xl shadow-primary/10">
            <div className="absolute top-0 right-0 px-6 py-2 rounded-bl-3xl bg-primary text-white text-xs font-black uppercase tracking-widest shadow-lg">
              {t('audit_express_badge')}
            </div>
            
            <div className="relative flex flex-col xl:flex-row gap-12 items-center">
              <div className="flex-1 text-center xl:text-left">
                <div className="inline-flex items-center justify-center xl:justify-start gap-4 mb-6 text-primary">
                  <div className="p-4 rounded-2xl bg-primary/10 shadow-inner">
                    <Shield size={32} className="fill-primary/20" />
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-white">{t('audit_express_title')}</h3>
                </div>
                
                <p className="text-foreground-secondary text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto xl:mx-0">
                  {t('audit_express_desc')}
                </p>
                
                <div className="flex flex-wrap justify-center xl:justify-start gap-x-8 gap-y-4 mb-10">
                  <div className="flex items-center gap-3">
                    <Zap size={20} className="text-primary fill-primary/20" />
                    <span className="font-bold text-xl text-primary">{locale === 'pt' ? 'A partir de R$ 197' : 'Starting at $49'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield size={20} className="text-foreground-muted" />
                    <span className="font-medium text-foreground-secondary uppercase tracking-wider text-sm">{locale === 'pt' ? '2 a 3 dias úteis' : '2-3 business days'}</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full xl:w-auto flex-shrink-0">
                <div className="bg-background-tertiary/50 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl min-w-[320px]">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground-muted mb-6 text-center">
                    {locale === 'pt' ? 'O que você recebe' : 'What you get'}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {(t.raw('audit_express_features') as string[]).map((feature, i) => (
                      <li key={i} className="flex gap-4 items-start text-sm text-foreground-secondary">
                        <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="font-medium leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div onClick={() => open('audit', 'package_audit_express')} className="w-full cursor-pointer">
                    <AnimatedButton variant="primary" className="w-full h-14 text-base">
                      <MessageCircle size={20} />
                      {locale === 'pt' ? 'Solicitar auditoria' : 'Request audit'}
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {allPackages.map((pkg, index) => {
            const pricing = packagePricing[pkg.id as keyof typeof packagePricing];
            return (
              <ScrollReveal
                key={pkg.id}
                delay={index * 0.1}
                className={cn(
                  "relative flex flex-col p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2",
                  pkg.highlight 
                    ? "bg-background-secondary border-primary shadow-2xl shadow-primary/10 z-10" 
                    : "bg-background-secondary/40 border-border hover:border-primary/50 backdrop-blur-sm"
                )}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest shadow-xl">
                    {t('popular')}
                  </div>
                )}

                <div className="mb-8 overflow-hidden">
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-xl",
                    pkg.highlight ? "bg-primary text-white shadow-primary/20" : "bg-background-tertiary text-primary"
                  )}>
                    <pkg.icon size={22} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 tracking-tight">{pkg.name}</h3>
                  <p className="text-foreground-secondary text-sm leading-relaxed min-h-[40px]">{pkg.desc}</p>
                </div>

                <div className="mb-8">
                  <div className={cn(
                    "text-2xl font-bold tracking-tight text-primary",
                    pkg.id === 'custom' ? "text-xl" : "text-2xl"
                  )}>
                    {pricing.priceFrom[locale]}
                  </div>
                  {pricing.priceNote && (
                    <div className="text-xs text-foreground-muted mt-1 font-bold uppercase tracking-widest">
                      {pricing.priceNote[locale]}
                    </div>
                  )}
                  <div className="text-sm text-foreground-muted mt-2 font-medium">
                    {pricing.timeline[locale]}
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex gap-3 text-sm text-foreground-secondary items-start leading-tight">
                      <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div onClick={() => open(pkg.id as ProjectType, `package_${pkg.id}`)} className="w-full cursor-pointer">
                  <AnimatedButton 
                    variant={pkg.highlight ? 'primary' : 'secondary'} 
                    className="w-full"
                  >
                    <MessageCircle size={18} />
                    {tc('want_this_package')}
                  </AnimatedButton>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <p className="text-sm text-foreground-muted max-w-2xl mx-auto text-center mt-12 leading-relaxed italic">
          {t('disclaimer')}
        </p>
      </Container>
    </section>
  );
}
