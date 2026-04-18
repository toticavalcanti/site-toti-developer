import Container from './Container';
import SectionTitle from './SectionTitle';
import ProjectCard from './ProjectCard';
import { projects } from '@/mockData';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProjects() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section className="py-12 sm:py-16 relative">
      <Container>
        <div className="flex items-end justify-between mb-8 sm:mb-10 md:mb-12">
          <SectionTitle
            title="Projetos Audiovisuais"
            subtitle="Conheça alguns dos trabalhos audiovisuais mais recentes"
          />
          <Link
            href="/portfolio"
            className="hidden md:flex items-center gap-2 text-primary hover:gap-4 transition-all font-medium"
          >
            Ver todos <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-6 sm:mt-8 text-center md:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all font-medium text-sm sm:text-base"
          >
            Ver todos os projetos <ArrowRight size={20} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
