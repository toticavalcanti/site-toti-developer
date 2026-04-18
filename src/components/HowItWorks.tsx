'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import { MessageCircle, FileText, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'Conversa Rápida',
    description: 'Envie sua demanda via WhatsApp ou formulário. Retorno ágil.',
    icon: MessageCircle,
  },
  {
    step: '02',
    title: 'Proposta Clara',
    description: 'Escopo, prazo estimado e investimento detalhados.',
    icon: FileText,
  },
  {
    step: '03',
    title: 'Execução',
    description: 'Entregas iterativas com acompanhamento e suporte.',
    icon: Rocket,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 relative">
      <Container>
        <SectionTitle
          title="Como Funciona"
          subtitle="Processo simples e transparente do início ao fim"
          centered
          className="mx-auto"
        />

        <div className="grid sm:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative text-center p-6 rounded-xl bg-background-secondary border border-border hover:border-primary/50 transition-colors"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                {step.step}
              </div>
              
              <div className="mt-4 mb-4 flex justify-center">
                <step.icon size={32} className="text-primary" />
              </div>
              
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-foreground-secondary">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
