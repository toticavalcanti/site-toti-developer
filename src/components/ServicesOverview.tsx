'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import Button from './Button';
import { Layout, ShoppingCart, MessageSquare, Code2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

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
    <section className="py-32 bg-background-secondary/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-dark)_0%,transparent_70%)] opacity-[0.03] -z-10" />
      
      <Container>
        <SectionTitle
          title={t('title')}
          subtitle={t('subtitle')}
          centered
          className="mx-auto"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full p-10 rounded-[2.5rem] bg-background border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xl shadow-black/20`}>
                  <service.icon size={30} className="text-white" />
                </div>

                <h3 className="text-2xl font-black mb-4 tracking-tight">{service.title}</h3>
                <p className="text-foreground-secondary text-base mb-8 leading-relaxed flex-grow font-medium">
                  {service.description}
                </p>

                <Button asChild variant="secondary" size="sm" className="w-full h-12 font-black group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all mt-auto border-border bg-background-tertiary shadow-lg">
                  <Link href={service.href as any}>
                    {service.cta} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
