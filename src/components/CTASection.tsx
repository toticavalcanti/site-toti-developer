'use client';

import Container from './Container';
import Button from './Button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { aboutInfo } from '@/mockData';

export default function CTASection() {
  const whatsappUrl = `https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}?text=Olá! Vim pelo site e gostaria de saber mais sobre seus serviços.`;

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">
            Pronto para tirar seu projeto{' '}
            <span className="gradient-text">do papel?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground-secondary mb-6 sm:mb-7 md:mb-8">
            Sites, automações com IA, videoclipes ou produção musical? Vamos conversar sobre como posso ajudar você a alcançar seus objetivos.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
            <Button size="md" asChild>
              <Link href={whatsappUrl} target="_blank">
                <MessageCircle size={20} className="mr-2" />
                Falar no WhatsApp
              </Link>
            </Button>
            <Button size="md" variant="outline" asChild>
              <Link href="/portfolio">
                Ver Portfólio <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10" />
    </section>
  );
}
