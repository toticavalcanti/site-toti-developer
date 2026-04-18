'use client';

import { useState } from 'react';
import Container from './Container';
import Button from './Button';
import { motion } from 'framer-motion';
import { MessageCircle, Play } from 'lucide-react';
import Link from 'next/link';
import { aboutInfo } from '@/mockData';

export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);

  const whatsappUrl = `https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}?text=Olá! Vim pelo site e gostaria de um orçamento.`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/50 to-background -z-10" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <span className="text-xs sm:text-sm font-medium text-primary">
                Software Engineering
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight"
            >
              Desenvolvimento de software{' '}
              <span className="gradient-text">e sistemas</span>
              {' '}com inteligência artificial aplicada.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-foreground-secondary mb-6 sm:mb-7 md:mb-8 max-w-2xl leading-relaxed"
            >
              Ciência da Computação como base para a criação de sistemas, automações e projetos digitais, visuais e audiovisuais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Button size="md" asChild>
                <Link href={whatsappUrl} target="_blank">
                  <MessageCircle size={20} className="mr-2" /> Falar no WhatsApp
                </Link>
              </Button>
              <Button size="md" variant="outline" asChild>
                <Link href="/portfolio">
                  Ver Portfólio
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden bg-background-secondary border border-border glow-border group">
              {!showVideo ? (
                <button
                  onClick={() => setShowVideo(true)}
                  className="block w-full h-full relative focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <img 
                    src="https://i.ytimg.com/vi/rhDKFzZJKZw/maxresdefault.jpg"
                    alt="Vídeo de apresentação"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors" />
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:from-primary/50 group-hover:to-secondary/50 transition-all cursor-pointer shadow-2xl backdrop-blur-sm">
                        <Play size={32} className="text-white ml-1 drop-shadow-lg" />
                      </div>
                      <p className="text-white font-semibold mb-1 drop-shadow-lg">
                        Vídeo criado com avatar digital com IA
                      </p>
                      <p className="text-white/90 text-sm drop-shadow-lg">
                        Método, Experiência e Resultados
                      </p>
                    </div>
                  </div>
                </button>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/rhDKFzZJKZw?autoplay=1&rel=0"
                  title="Vídeo de apresentação"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-20 blur-2xl animate-pulse-glow" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-secondary to-primary rounded-2xl opacity-20 blur-2xl animate-pulse-glow" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
