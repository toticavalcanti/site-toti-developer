'use client';

import Container from './Container';
import Button from './Button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { aboutInfo } from '@/mockData';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('cta');
  const tn = useTranslations('nav');
  const whatsappUrl = `https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}?text=Olá! Vim pelo site e gostaria de saber mais sobre seu desenvolvimento de software.`;

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
          className="bg-background-secondary border border-primary/20 p-16 sm:p-24 rounded-[3.5rem] text-center max-w-5xl mx-auto shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-primary/40 transition-colors duration-700"
        >
          {/* Subtle pattern background for depth */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] group-hover:opacity-[0.05] transition-opacity duration-700"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />

          <h2 className="text-4xl sm:text-6xl font-black mb-10 leading-none tracking-tighter">
            {t('title')}
          </h2>
          <p className="text-xl sm:text-2xl text-foreground-secondary mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" asChild className="w-full sm:w-auto h-16 px-12 rounded-2xl shadow-2xl shadow-primary/20 text-xl font-black group">
              <Link href={whatsappUrl as any} target="_blank">
                <MessageCircle size={24} className="mr-3 group-hover:scale-125 transition-transform" />
                {t('button')}
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto h-16 px-12 rounded-2xl border-border bg-background/50 backdrop-blur-md text-xl font-black group">
              <Link href="/cases">
                {tn('work')} <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
