'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import Button from './Button';
import { Check, ArrowRight, Clock, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { aboutInfo } from '@/mockData';

const packages = [
  {
    name: 'Site Express',
    description: 'Presença digital profissional em tempo recorde',
    price: 'a partir de R$ 3.000',
    includes: [
      'Landing page responsiva',
      'WhatsApp integrado',
      'SEO básico',
      'Formulário de contato',
    ],
    highlight: false,
    isWaitingList: false,
  },
  {
    name: 'WhatsApp IA Vendedor',
    description: 'Atendimento automatizado que qualifica leads 24h',
    price: 'a partir de R$ 5.000',
    includes: [
      'Bot humanizado',
      'Captação automática de leads',
      'Handoff para humano',
      'Tags e segmentação',
    ],
    highlight: true,
    isWaitingList: false,
  },
  {
    name: 'Funil Completo',
    description: 'Do anúncio ao fechamento, tudo integrado',
    price: 'a partir de R$ 15.000',
    includes: [
      'Landing page otimizada',
      'WhatsApp IA integrado',
      'Automação de follow-up',
      'Dashboard de métricas',
    ],
    highlight: false,
    isWaitingList: false,
  },
  {
    name: 'Pocket Show',
    description: 'Em montagem — entre na lista de espera',
    price: 'valores sob consulta',
    includes: [
      'Performance ao vivo (flauta e sax)',
      'Repertório personalizado',
      'Formatos variados em definição',
      'Prioridade para quem reservar',
    ],
    highlight: false,
    isWaitingList: true,
  },
];

export default function PackagesSection() {
  const whatsappBase = `https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}`;
  const pocketShowWaitlistUrl = `${whatsappBase}?text=${encodeURIComponent('Oi Toti! Quero entrar na lista de espera do Pocket Show. Meu nome é __. Evento em: __ (cidade/data).')}`;

  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <Container>
        <SectionTitle
          title="Pacotes"
          subtitle="Soluções prontas para acelerar seus resultados"
          centered
          className="mx-auto"
        />

        <p className="text-center text-sm text-foreground-secondary mb-10 -mt-4">
          * Valores variam conforme escopo e necessidades específicas
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => {
            const whatsappUrl = pkg.isWaitingList 
              ? pocketShowWaitlistUrl 
              : `${whatsappBase}?text=Olá! Tenho interesse no pacote ${pkg.name}.`;

            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative p-6 rounded-xl border transition-all flex flex-col ${
                  pkg.highlight
                    ? 'bg-gradient-to-b from-primary/10 to-background border-primary shadow-lg shadow-primary/20'
                    : pkg.isWaitingList
                    ? 'bg-gradient-to-b from-warning/5 to-background border-warning/30 hover:border-warning/50'
                    : 'bg-background border-border hover:border-primary/50'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                    Popular
                  </div>
                )}
                {pkg.isWaitingList && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-warning text-black text-xs font-bold rounded-full flex items-center gap-1">
                    <Clock size={12} />
                    Em montagem
                  </div>
                )}

                <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
                <p className="text-sm text-foreground-secondary mb-4">{pkg.description}</p>
                
                <div className={`text-xl font-bold mb-4 ${pkg.isWaitingList ? 'text-warning' : 'text-primary'}`}>
                  {pkg.price}
                </div>

                <ul className="space-y-2 mb-4 flex-grow">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check size={16} className={`mt-0.5 flex-shrink-0 ${pkg.isWaitingList ? 'text-warning' : 'text-success'}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* YouTube Preview for Pocket Show */}
                {pkg.isWaitingList && (
                  <div className="mb-4 text-center">
                    <p className="text-xs text-foreground-secondary mb-1">
                      Quer ter uma ideia do clima?
                    </p>
                    <Link
                      href="https://www.youtube.com/@toticavalcantimusic"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-foreground-secondary hover:text-primary transition-colors underline underline-offset-2"
                    >
                      <Play size={12} />
                      Ver vídeos (YouTube)
                    </Link>
                  </div>
                )}

                <Button
                  asChild
                  variant={pkg.highlight ? 'primary' : 'outline'}
                  size="sm"
                  className={`w-full mt-auto ${pkg.isWaitingList ? 'border-warning text-warning hover:bg-warning hover:text-black' : ''}`}
                >
                  <Link href={whatsappUrl} target="_blank">
                    {pkg.isWaitingList ? (
                      <>Entrar na lista <Clock size={14} className="ml-1" /></>
                    ) : (
                      <>Quero esse <ArrowRight size={16} className="ml-1" /></>
                    )}
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-foreground-secondary mb-4">
            Precisa de algo diferente? Montamos um pacote sob medida.
          </p>
          <Button asChild variant="outline">
            <Link href="/contato">
              Solicitar Orçamento Personalizado
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
