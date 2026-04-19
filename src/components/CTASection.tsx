'use client';

import Container from './Container';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { aboutInfo } from '@/mockData';
import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';
import MagneticButton from './ui/MagneticButton';
import AnimatedButton from './ui/AnimatedButton';

import { useQualification } from '@/lib/qualification-context';

export default function CTASection() {
  const t = useTranslations('cta');
  const tq = useTranslations('qualification');
  const tc = useTranslations('ctas');
  const tn = useTranslations('nav');
  const { open } = useQualification();
  const whatsappUrl = `https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}?text=Olá! Vim pelo site e gostaria de saber mais sobre seu desenvolvimento de software.`;

  return (
    <section className="py-16 sm:py-20 relative">
      <Container>
        <ScrollReveal
          y={40}
          className="bg-background-secondary/30 backdrop-blur-sm border border-border p-16 sm:p-24 rounded-[3.5rem] text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-colors duration-700"
        >
          {/* Subtle decoration blobs */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />

          <h2 className="text-4xl sm:text-6xl font-semibold mb-10 leading-none tracking-tight">
            {t('title')}
          </h2>
          <p className="text-xl sm:text-2xl text-foreground-secondary mb-16 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <MagneticButton>
                <div onClick={() => open(undefined, 'cta_section')} className="cursor-pointer">
                  <AnimatedButton variant="primary" size="lg" className="w-full sm:w-auto shadow-xl shadow-primary/20">
                    <MessageCircle size={20} />
                    {tc('request_quote')}
                  </AnimatedButton>
                </div>
              </MagneticButton>
              <MagneticButton>
                <Link href="/cases">
                  <AnimatedButton variant="outline" size="lg" className="w-full sm:w-auto">
                    {tn('work')} <ArrowUpRight size={20} />
                  </AnimatedButton>
                </Link>
              </MagneticButton>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Link
                href={whatsappUrl as any}
                target="_blank"
                className="text-sm text-foreground-muted hover:text-primary transition-colors flex items-center gap-2"
              >
                <MessageCircle size={16} />
                {tc('prefer_whatsapp')}
              </Link>
              <p className="text-[10px] uppercase tracking-widest text-foreground-muted font-bold">
                {tq('availability')}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
