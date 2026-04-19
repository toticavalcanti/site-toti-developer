'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import ProjectCard from './ProjectCard';
import { cases } from '@/mockData';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

export default function FeaturedProjects() {
  const t = useTranslations('work');
  const th = useTranslations('hero');

  return (
    <section id="trabalhos" className="py-16 sm:py-20 relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <SectionTitle
            title="Casos de Sucesso"
            subtitle={t('subtitle')}
            className="mb-0 lg:mb-0"
          />
          <ScrollReveal delay={0.2}>
            <Link
              href="/cases"
              className="flex items-center gap-2 text-primary hover:gap-4 transition-all font-semibold text-lg tracking-tight group"
            >
              {th('cta_secondary')} <ArrowRight size={20} />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
