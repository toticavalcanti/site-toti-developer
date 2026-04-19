'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import { Check, MessageCircle, Zap, Shield, Globe } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils';
import ScrollReveal from './ui/ScrollReveal';
import AnimatedButton from './ui/AnimatedButton';

export default function PackagesSection() {
  const t = useTranslations('packages');
  const tc = useTranslations('cta');

  const packages = [
    {
      id: 'lp',
      name: t('lp_name'),
      description: t('lp_desc'),
      price: t('price_on_request'),
      features: [
        t('features.lp.0'),
        t('features.lp.1'),
        t('features.lp.2'),
        t('features.lp.3'),
        t('features.lp.4'),
      ],
      icon: Zap,
      cta: tc('button'),
      highlight: false
    },
    {
      id: 'store',
      name: t('store_name'),
      description: t('store_desc'),
      price: t('price_on_request'),
      features: [
        t('features.store.0'),
        t('features.store.1'),
        t('features.store.2'),
        t('features.store.3'),
        t('features.store.4'),
      ],
      icon: Globe,
      cta: tc('button'),
      highlight: true
    },
    {
      id: 'custom',
      name: t('custom_name'),
      description: t('custom_desc'),
      price: t('price_on_request'),
      features: [
        t('features.custom.0'),
        t('features.custom.1'),
        t('features.custom.2'),
        t('features.custom.3'),
        t('features.custom.4'),
      ],
      icon: Shield,
      cta: tc('button'),
      highlight: false
    }
  ];

  return (
    <section id="pacotes" className="py-32 relative">
      <Container>
        <SectionTitle
          title={t('title')}
          subtitle={t('subtitle')}
          centered
        />

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {packages.map((pkg, index) => (
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

              <div className="mb-8">
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-xl",
                  pkg.highlight ? "bg-primary text-white shadow-primary/20" : "bg-background-tertiary text-primary"
                )}>
                  <pkg.icon size={22} />
                </div>
                <h3 className="text-2xl font-semibold mb-3 tracking-tight">{pkg.name}</h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">{pkg.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-3xl font-bold tracking-tight text-primary">{pkg.price}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex gap-3 text-sm text-foreground-secondary items-start">
                    <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={`https://wa.me/5521988714006?text=Olá! Me interessei pelo pacote ${pkg.name}.`} target="_blank" className="w-full">
                <AnimatedButton 
                  variant={pkg.highlight ? 'primary' : 'secondary'} 
                  className="w-full"
                >
                  <MessageCircle size={18} />
                  {pkg.cta}
                </AnimatedButton>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
