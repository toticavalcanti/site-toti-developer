'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import Button from './Button';
import { Check, MessageCircle, Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils';

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
    <section id="pacotes" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 blur-[150px] -z-10" />
      
      <Container>
        <SectionTitle
          title={t('title')}
          subtitle={t('subtitle')}
          centered
        />

        <div className="grid md:grid-cols-3 gap-10 mt-20">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className={cn(
                "relative flex flex-col p-10 rounded-[3rem] border transition-all duration-500 hover:-translate-y-3",
                pkg.highlight 
                  ? "bg-background-secondary border-primary shadow-2xl shadow-primary/20 scale-105 z-10" 
                  : "bg-background-secondary/50 border-border hover:border-primary/30"
              )}
            >
              {pkg.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20">
                  {t('popular')}
                </div>
              )}

              <div className="mb-10">
                <div className={cn(
                  "w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 shadow-xl shadow-black/20",
                  pkg.highlight ? "bg-primary text-white" : "bg-background-tertiary text-primary"
                )}>
                  <pkg.icon size={28} />
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tight uppercase leading-none">{pkg.name}</h3>
                <p className="text-foreground-secondary text-base leading-relaxed font-medium">{pkg.description}</p>
              </div>

              <div className="mb-10">
                <span className="text-4xl font-black gradient-text">{pkg.price}</span>
              </div>

              <ul className="space-y-5 mb-12 flex-1">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex gap-4 text-sm text-foreground-secondary font-medium items-start">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check size={12} className="text-primary font-black" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                asChild 
                variant={pkg.highlight ? 'primary' : 'outline'} 
                className="w-full h-14 text-lg font-black shadow-xl"
              >
                <Link href={`https://wa.me/5521988714006?text=Olá! Me interessei pelo pacote ${pkg.name}.`} target="_blank">
                  <MessageCircle size={20} className="mr-3" />
                  {pkg.cta}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
