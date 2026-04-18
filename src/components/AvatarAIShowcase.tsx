'use client';

import { useState, useEffect, useRef } from 'react';
import Container from './Container';
import SectionTitle from './SectionTitle';
import Button from './Button';
import Link from 'next/link';
import { DollarSign, Clock, TrendingUp, Zap, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Declare YouTube types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Video {
  id: string;
  type: 'youtube' | 'instagram';
  youtubeId?: string;
  instagramUrl?: string;
  instagramEmbed?: string;
  title: string;
  description: string;
  aspectRatio: '9:16' | '16:9';
}

export default function AvatarAIShowcase() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [showingVideo, setShowingVideo] = useState(false);
  const playerRef = useRef<any>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube IFrame API Ready');
    };
  }, []);

  const videos: Video[] = [
    {
      id: '1',
      type: 'youtube',
      youtubeId: 'U1IDmFtDiaA',
      title: 'Apresentadora Virtual AI',
      description: 'Modelo feminina apresentando conteúdo profissional',
      aspectRatio: '9:16'
    },
    {
      id: '2',
      type: 'youtube',
      youtubeId: '10bnVh51QJk',
      title: 'Apresentador Virtual AI',
      description: 'Modelo masculino para campanhas publicitárias',
      aspectRatio: '9:16'
    },
    {
      id: '3',
      type: 'youtube',
      youtubeId: 'M1gBozt07vg',
      title: 'Avatar Feminino AI',
      description: 'Porta-voz virtual para marketing digital',
      aspectRatio: '9:16'
    },
    {
      id: '4',
      type: 'youtube',
      youtubeId: 'jlBDhAjsHGw',
      title: 'Avatar Masculino AI',
      description: 'Apresentador para conteúdo educacional',
      aspectRatio: '9:16'
    },
    {
      id: '5',
      type: 'youtube',
      youtubeId: '9t9yhJ_B0QE',
      title: 'Modelo Virtual Feminina',
      description: 'Avatar realista para divulgação de produtos',
      aspectRatio: '9:16'
    }
  ];

  const currentVideo = videos[activeVideoIndex];

  const handlePrevious = () => {
    setActiveVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    setShowingVideo(false);
  };

  const handleNext = () => {
    setActiveVideoIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    setShowingVideo(false);
  };

  const handlePlayClick = () => {
    setShowingVideo(true);
  };

  const handleVideoEnded = () => {
    setShowingVideo(false);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28">
      <Container>
        <SectionTitle
          title="Vídeos Publicitários com Avatares IA"
          subtitle="Porta-vozes virtuais realistas para suas campanhas em redes sociais"
          centered
        />

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mt-8 sm:mt-10 md:mt-12">
          {/* Lado Esquerdo - Texto e Benefícios */}
          <div>
            <p className="text-base sm:text-lg text-foreground-secondary mb-8">
              Criação de vídeos publicitários profissionais usando avatares IA realistas 
              como apresentadores. Ideal para divulgação de produtos, serviços, cursos e 
              conteúdo educacional. <strong className="text-foreground">Custo 80-90% menor 
              que contratação de atores reais.</strong>
            </p>

            {/* Benefícios em Grid */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <div className="p-4 sm:p-6 rounded-xl border border-border bg-background hover:border-primary transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign size={20} className="sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="text-sm sm:text-base font-bold mb-1">80-90% Mais Barato</div>
                <div className="text-xs sm:text-sm text-foreground-secondary">
                  Que produção com atores reais
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-xl border border-border bg-background hover:border-primary transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Clock size={20} className="sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="text-sm sm:text-base font-bold mb-1">Entrega Rápida</div>
                <div className="text-xs sm:text-sm text-foreground-secondary">
                  3-5 dias vs semanas
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-xl border border-border bg-background hover:border-primary transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp size={20} className="sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="text-sm sm:text-base font-bold mb-1">Escalável</div>
                <div className="text-xs sm:text-sm text-foreground-secondary">
                  Dezenas de vídeos rapidamente
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-xl border border-border bg-background hover:border-primary transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Zap size={20} className="sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="text-sm sm:text-base font-bold mb-1">Fotorrealista</div>
                <div className="text-xs sm:text-sm text-foreground-secondary">
                  Qualidade indistinguível
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="p-6 rounded-xl border border-border bg-background-secondary mb-8">
              <div className="text-sm text-foreground-secondary mb-2">Precificação por segundo:</div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-2xl sm:text-3xl font-bold text-foreground">R$ 15-50</span>
                <span className="text-foreground-secondary">/segundo de vídeo</span>
              </div>
              <div className="text-sm text-foreground-secondary">
                Vídeo típico de 30s para Instagram: <strong className="text-foreground">R$ 900</strong>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/servicos#6">
                  Ver Detalhes e Preços
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contato">
                  Solicitar Orçamento
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Lado Direito - Carrossel SIMPLES */}
          <div className="flex flex-col items-center gap-6">
            {/* Container do Vídeo - FIXO 328px */}
            <div className="relative group" style={{ width: '328px' }}>
              {/* Iframe - YouTube ou Instagram */}
              <div className="relative rounded-xl overflow-hidden border border-border bg-background-secondary shadow-lg" style={{ width: '328px', height: '583px' }}>
                {currentVideo.type === 'youtube' ? (
                  <>
                    {/* YouTube Iframe - renderizado apenas quando tocando */}
                    {showingVideo && (
                      <iframe
                        key={`video-${activeVideoIndex}`}
                        src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&vq=hd1080&enablejsapi=1`}
                        style={{ 
                          width: '328px',
                          height: '583px',
                          border: 'none',
                          display: 'block'
                        }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={(e) => {
                          if (window.YT) {
                            // Wait for player to be ready, then listen for end event
                            setTimeout(() => {
                              try {
                                const iframe = e.target as HTMLIFrameElement;
                                const player = new window.YT.Player(iframe, {
                                  events: {
                                    onStateChange: (event: any) => {
                                      if (event.data === window.YT.PlayerState.ENDED) {
                                        handleVideoEnded();
                                      }
                                    }
                                  }
                                });
                                playerRef.current = player;
                              } catch (err) {
                                console.log('YT Player init error:', err);
                              }
                            }, 1000);
                          }
                        }}
                      />
                    )}

                    {/* Thumbnail - aparece quando NÃO está tocando vídeo */}
                    {!showingVideo && (
                      <div 
                        className="absolute inset-0 cursor-pointer group/thumb z-20 bg-background-secondary"
                        onClick={handlePlayClick}
                      >
                        <img 
                          src={`https://i.ytimg.com/vi/${currentVideo.youtubeId}/hqdefault.jpg`}
                          alt={currentVideo.title}
                          className="w-full h-full object-cover"
                          loading="eager"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/thumb:bg-black/30 transition-colors">
                          <div className="w-20 h-20 rounded-full bg-primary/90 group-hover/thumb:bg-primary group-hover/thumb:scale-110 transition-all flex items-center justify-center shadow-xl">
                            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <iframe
                    key={`video-${activeVideoIndex}`}
                    src={currentVideo.instagramEmbed}
                    style={{ 
                      width: '328px',
                      minHeight: '500px',
                      maxHeight: '700px',
                      border: 'none',
                      display: 'block'
                    }}
                    frameBorder="0"
                    scrolling="no"
                    allow="encrypted-media"
                  />
                )}

                {/* Setas - aparecem no hover */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100"
                  aria-label="Próximo"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Indicador */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-foreground text-xs font-medium border border-border">
                  {activeVideoIndex + 1} / {videos.length}
                </div>
              </div>

              {/* Título e descrição FORA do iframe */}
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-base mb-1">{currentVideo.title}</h3>
                <p className="text-sm text-foreground-secondary">{currentVideo.description}</p>
              </div>
            </div>

            {/* Link YouTube */}
            <a
              href="https://www.youtube.com/@codigofluente"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-primary transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Ver mais exemplos no @codigofluente
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
