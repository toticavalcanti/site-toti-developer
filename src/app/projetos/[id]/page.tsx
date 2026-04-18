import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import { projects } from '@/mockData';
import { ArrowLeft, Calendar, ExternalLink, Github, Youtube, Store } from 'lucide-react';
import Link from 'next/link';

// Função para extrair videoId da URL do YouTube (incluindo Shorts)
function getYouTubeVideoId(url: string): string | null {
  // Suporte para Shorts: https://www.youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/\/shorts\/([^\/\?&]+)/);
  if (shortsMatch) return shortsMatch[1];
  
  // Outros formatos do YouTube
  const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/\&\?]{10,12})/);
  return match ? match[1] : null;
}

export default async function ProjetoDetalhes({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projeto = projects.find((p) => p.id === id);

  if (!projeto) {
    notFound();
  }

  const videoId = projeto.videoUrl ? getYouTubeVideoId(projeto.videoUrl) : null;

  return (
    <>
      {/* Breadcrumbs e Header */}
      <section className="pt-24 pb-8 bg-background">
        <Container>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Voltar para home
          </Link>
          
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-bold mb-2">{projeto.title}</h1>
              <p className="text-xl text-foreground-secondary">{projeto.subtitle}</p>
            </div>
            
            {projeto.date && (
              <div className="flex items-center gap-2 text-foreground-secondary">
                <Calendar size={18} />
                <span>{projeto.date}</span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Vídeo e Informações */}
      <section className="py-12 bg-background-secondary">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Vídeo Embed - 2 colunas */}
            <div className="lg:col-span-2">
              {videoId ? (
                (() => {
                  const isVertical = projeto.aspectRatio === '9:16';
                  return (
                    <div className={`rounded-2xl overflow-hidden bg-background border border-border ${
                      isVertical ? 'max-w-md mx-auto' : ''
                    }`}>
                      <div className={isVertical ? 'aspect-[9/16]' : 'aspect-video'}>
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                          title={projeto.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="aspect-video rounded-2xl overflow-hidden bg-background border border-border">
                  <img 
                    src={projeto.thumbnail} 
                    alt={projeto.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Descrição */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Sobre o Projeto</h2>
                <p className="text-foreground-secondary text-lg leading-relaxed whitespace-pre-line">
                  {projeto.description}
                </p>
              </div>
            </div>

            {/* Sidebar - 1 coluna */}
            <div className="space-y-6">
              {/* Tags */}
              <div>
                <h3 className="text-lg font-bold mb-3">Tecnologias</h3>
                <div className="flex flex-wrap gap-2">
                  {projeto.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full bg-background-tertiary border border-border text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-lg font-bold mb-3">Links</h3>
                <div className="space-y-3">
                  {projeto.videoUrl && (
                    <a
                      href={projeto.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground-secondary hover:text-primary transition-colors"
                    >
                      <Youtube size={20} />
                      <span>Ver no YouTube</span>
                      <ExternalLink size={16} className="ml-auto" />
                    </a>
                  )}
                  
                  {projeto.demoUrl && (
                    <a
                      href={projeto.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground-secondary hover:text-primary transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Ver Demo</span>
                      <ExternalLink size={16} className="ml-auto" />
                    </a>
                  )}
                  
                  {projeto.githubUrl && (
                    <a
                      href={projeto.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground-secondary hover:text-primary transition-colors"
                    >
                      <Github size={20} />
                      <span>Ver no GitHub</span>
                      <ExternalLink size={16} className="ml-auto" />
                    </a>
                  )}
                  
                  {projeto.storeUrl && (
                    <a
                      href={projeto.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground-secondary hover:text-primary transition-colors"
                    >
                      <Store size={20} />
                      <span>Loja Alternativa</span>
                      <ExternalLink size={16} className="ml-auto" />
                    </a>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6 border-t border-border">
                <Link
                  href="/#projetos"
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Ver mais projetos
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
