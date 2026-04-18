'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import ProjectCard from './ProjectCard';
import { cases } from '@/mockData';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProjects() {
  const t = useTranslations('work');
  const th = useTranslations('hero');
  const featuredCases = cases.filter(c => c.featured).slice(0, 3);

  return (
    <section id="trabalhos" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--secondary-dark)_0%,transparent_70%)] opacity-[0.02] -z-10" />
      
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <SectionTitle
            title={t('title')}
            subtitle={t('subtitle')}
            className="mb-0 lg:mb-0"
          />
          <Link
            href="/cases"
            className="flex items-center gap-3 text-primary hover:text-primary-light transition-all font-black text-xl group uppercase tracking-tight"
          >
            {th('cta_secondary')} <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredCases.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
