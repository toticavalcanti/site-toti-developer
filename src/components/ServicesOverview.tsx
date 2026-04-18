'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import Button from './Button';
import { Sparkles, Code2, Music, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const portals = [
  {
    id: 'ia-automacao',
    title: 'IA & Automação',
    description: 'WhatsApp IA, chatbots, automações e integrações que trabalham 24h por você.',
    icon: Sparkles,
    href: '/cases?p=ia-automacao',
    cta: 'Ver soluções de IA',
    gradient: 'from-primary to-secondary',
  },
  {
    id: 'sites-sistemas',
    title: 'Sites & Sistemas',
    description: 'Sites que convertem, landing pages, e-commerce e sistemas sob medida.',
    icon: Code2,
    href: '/cases?p=sites-sistemas',
    cta: 'Ver projetos web',
    gradient: 'from-secondary to-accent',
  },
  {
    id: 'audiovisual-musica',
    title: 'Audiovisual & Música',
    description: 'Videoclipes com IA, produção musical, arranjos e avatares virtuais.',
    icon: Music,
    href: '/cases?p=audiovisual-musica',
    cta: 'Ver trabalhos',
    gradient: 'from-accent to-primary',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-12 sm:py-16 relative">
      <Container>
        <SectionTitle
          title="Escolha seu Objetivo"
          subtitle="Três caminhos para transformar seu negócio ou projeto"
          centered
          className="mx-auto"
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {portals.map((portal, index) => (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-background-secondary border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 flex flex-col">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${portal.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <portal.icon size={28} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{portal.title}</h3>
                <p className="text-foreground-secondary mb-6 leading-relaxed flex-grow">
                  {portal.description}
                </p>

                {/* CTA - always at bottom */}
                <Button asChild variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all mt-auto">
                  <Link href={portal.href}>
                    {portal.cta} <ArrowRight size={16} className="ml-2" />
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
