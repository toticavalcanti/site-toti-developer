'use client';

import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/Button';
import { cases } from '@/mockData';
import { useTranslations, useLocale } from 'next-intl';
import { useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function CasesPage() {
  const t = useTranslations();
  const locale = useLocale();

  const productionCases = useMemo(() => cases.filter(c => c.status === 'production'), []);
  const previewCases = useMemo(() => cases.filter(c => c.status === 'preview'), []);
  const otherCases = useMemo(() => cases.filter(c => c.status === 'functional' || c.status === 'demo'), []);

  return (
    <>
      <PageHeader
        title={t('nav.work')}
        description={t('work.subtitle')}
        breadcrumbs={[
          { label: t('nav.home'), href: '/' },
          { label: t('nav.work') },
        ]}
      />

      <div className="py-20 space-y-32">
        <section>
          <Container>
            <div className="mb-12">
               <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
                <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                {t('work.production')}
              </h2>
              <p className="text-foreground-secondary max-w-2xl">
                {locale === 'pt' 
                  ? 'Projetos reais em operação total, gerando resultados e tráfego para clientes.'
                  : 'Real projects in full operation, generating results and traffic for clients.'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productionCases.map((c) => (
                <ProjectCard key={c.slug} project={c as any} />
              ))}
            </div>
          </Container>
        </section>

        {previewCases.length > 0 && (
          <section>
            <Container>
               <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
                  <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
                  {t('work.preview')}
                </h2>
                <p className="text-foreground-secondary max-w-2xl">
                  {locale === 'pt'
                    ? 'Projetos em fase de lançamento ou demonstração técnica avançada.'
                    : 'Projects in launching phase or advanced technical demonstration.'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {previewCases.map((c) => (
                  <ProjectCard key={c.slug} project={c as any} />
                ))}
              </div>
            </Container>
          </section>
        )}

        <section>
          <Container>
            <div className="mb-12">
               <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
                <div className="w-1.5 h-8 bg-slate-500 rounded-full" />
                {locale === 'pt' ? 'Projetos Leves & Demos' : 'Lightweight & Demo Projects'}
              </h2>
              <p className="text-foreground-secondary max-w-2xl">
                {locale === 'pt'
                  ? 'Amostras de agilidade e conceitos de interface para necessidades específicas.'
                  : 'Samples of agility and interface concepts for specific needs.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherCases.map((c) => (
                <ProjectCard key={c.slug} project={c as any} />
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-background-secondary border-y border-border py-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                {locale === 'pt' ? 'Interessado em ver mais?' : 'Interested in seeing more?'}
              </h2>
              <p className="text-foreground-secondary mb-10 text-lg">
                {locale === 'pt' 
                  ? 'Tenho diversos outros projetos privados em Next.js e integrações complexas. Me chame no WhatsApp para uma conversa técnica.'
                  : 'I have many other private Next.js projects and complex integrations. Chat with me on WhatsApp for a technical discussion.'}
              </p>
              <Button size="lg" asChild>
                <Link href={`https://wa.me/5521982266075?text=Olá! Vi seus cases e gostaria de falar sobre um projeto.` as any} target="_blank">
                  <MessageCircle size={20} className="mr-2" />
                  {t('cta.button')}
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
