'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import Button from '@/components/Button';
import PageHeader from '@/components/PageHeader';
import { ExternalLink, ArrowDown, Target, Wrench, Layers, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { aboutInfo, cases } from '@/mockData';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CasePillar } from '@/types';

const pillarLabels: Record<CasePillar, string> = {
  'ia-automacao': 'IA & Automação',
  'sites-sistemas': 'Sites & Sistemas',
  'audiovisual-musica': 'Audiovisual & Música',
};

// Loading fallback for Suspense
function CasesLoading() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="grid md:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background-secondary rounded-2xl h-80" />
          ))}
        </div>
      </Container>
    </div>
  );
}

// Wrapper component that uses useSearchParams
function CasesContent() {
  const searchParams = useSearchParams();
  const pillarFilter = searchParams.get('p') as CasePillar | null;
  
  const whatsappBase = `https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}`;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (slug: string) => {
    setImageErrors(prev => ({ ...prev, [slug]: true }));
  };

  // Filter cases by pillar if querystring is present
  const filteredCases = useMemo(() => {
    if (!pillarFilter || !pillarLabels[pillarFilter]) {
      return cases;
    }
    return cases.filter(c => c.pillar === pillarFilter);
  }, [pillarFilter]);

  const pageTitle = pillarFilter && pillarLabels[pillarFilter] 
    ? `Cases: ${pillarLabels[pillarFilter]}` 
    : 'Cases';
  
  const pageDescription = pillarFilter && pillarLabels[pillarFilter]
    ? `Projetos de ${pillarLabels[pillarFilter]} — resultados reais que você pode conferir ao vivo`
    : 'Projetos reais entregues para clientes — resultados que você pode conferir ao vivo';

  return (
    <>
      <PageHeader
        title={pageTitle}
        description={pageDescription}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cases', href: '/cases' },
          ...(pillarFilter && pillarLabels[pillarFilter] ? [{ label: pillarLabels[pillarFilter] }] : []),
        ]}
      />

      {/* Filter Pills */}
      {pillarFilter && (
        <section className="pt-4">
          <Container>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-foreground-secondary">Filtro:</span>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                {pillarLabels[pillarFilter]}
              </span>
              <Link 
                href="/cases" 
                className="text-sm text-foreground-secondary hover:text-primary underline"
              >
                Ver todos
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Cases Grid */}
      <section className="py-16 sm:py-20">
        <Container>
          {filteredCases.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group bg-background-secondary border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 flex flex-col"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-video overflow-hidden bg-background-tertiary">
                    {!imageErrors[caseItem.slug] ? (
                      <Image
                        src={caseItem.imagePath}
                        alt={caseItem.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => handleImageError(caseItem.slug)}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-foreground-secondary">
                        <span className="text-sm">Imagem não disponível</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{caseItem.name}</h3>
                    <p className="text-foreground-secondary text-sm mb-4 flex-grow">{caseItem.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {caseItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Buttons - always at bottom */}
                    <div className="flex flex-col gap-2 mt-auto">
                      <Button asChild size="sm">
                        <Link href={caseItem.liveUrl} target="_blank">
                          <ExternalLink size={16} className="mr-2" />
                          Ver ao vivo
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href={`#${caseItem.slug}`}>
                          <ArrowDown size={16} className="mr-2" />
                          Ver detalhes
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Target size={40} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Ainda não tenho cases públicos de {pillarFilter && pillarLabels[pillarFilter]}
              </h3>
              <p className="text-foreground-secondary mb-8">
                Estou trabalhando em projetos dessa área. Quer ver algo específico ou conversar sobre sua ideia? 
                Me chama no WhatsApp!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link 
                    href={`${whatsappBase}?text=${encodeURIComponent(`Oi Toti! Quero falar sobre ${pillarFilter && pillarLabels[pillarFilter]}.`)}`}
                    target="_blank"
                  >
                    <MessageCircle size={18} className="mr-2" />
                    Quero falar sobre {pillarFilter && pillarLabels[pillarFilter]}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/servicos#${pillarFilter}`}>
                    Ver serviços deste pilar
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Case Details Sections */}
      {cases.map((caseItem, index) => {
        const whatsappMessage = `Oi Toti! Vi o case ${caseItem.name} e quero um site/projeto parecido. Meu objetivo é __.`;
        const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(whatsappMessage)}`;

        return (
          <section
            key={caseItem.slug}
            id={caseItem.slug}
            className={`py-16 sm:py-20 scroll-mt-24 ${index % 2 === 0 ? 'bg-background-secondary' : ''}`}
          >
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">{caseItem.name}</h2>
                    <p className="text-foreground-secondary">{caseItem.description}</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Preview Images - conditional rendering */}
                  <div className="grid grid-cols-2 gap-4">
                    <PreviewImage 
                      src={`/assets/cases/${caseItem.slug}/preview-1.jpg`}
                      alt={`${caseItem.name} - Preview 1`}
                    />
                    <PreviewImage 
                      src={`/assets/cases/${caseItem.slug}/preview-2.jpg`}
                      alt={`${caseItem.name} - Preview 2`}
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Target size={20} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Objetivo</h4>
                          <p className="text-sm text-foreground-secondary">{caseItem.objective}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Wrench size={20} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">O que foi feito</h4>
                          <p className="text-sm text-foreground-secondary">{caseItem.whatWasDone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Layers size={20} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Tecnologias</h4>
                          <p className="text-sm text-foreground-secondary">{caseItem.stack}</p>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button asChild>
                        <Link href={caseItem.liveUrl} target="_blank">
                          <ExternalLink size={18} className="mr-2" />
                          Ver ao vivo
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href={whatsappUrl} target="_blank">
                          <MessageCircle size={18} className="mr-2" />
                          Quero um igual
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Container>
          </section>
        );
      })}

      {/* Final CTA */}
      <section className="py-16 sm:py-20 border-t border-border">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Quer um projeto como esses?
            </h2>
            <p className="text-foreground-secondary mb-8">
              Conte sua ideia e receba uma proposta personalizada em até 24h.
            </p>
            <Button asChild size="lg">
              <Link href={`${whatsappBase}?text=${encodeURIComponent('Olá! Vi os cases do site e quero um projeto assim.')}`} target="_blank">
                <MessageCircle size={20} className="mr-2" />
                Falar no WhatsApp
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

// Default export wraps the content with Suspense
export default function CasesPage() {
  return (
    <Suspense fallback={<CasesLoading />}>
      <CasesContent />
    </Suspense>
  );
}
// Helper component for preview images with error handling
function PreviewImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-background-tertiary flex items-center justify-center">
        <span className="text-xs text-foreground-secondary">Preview não disponível</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
