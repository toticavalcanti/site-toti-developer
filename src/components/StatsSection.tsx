'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Globe, User, Code } from 'lucide-react';
import { projects as allProjects } from '@/mockData';

// Mapear ícones para os projetos em produção
const productionProjectsConfig = [
  { id: '3', icon: Globe },      // Site Zé Ramalho
  { id: '3b', icon: Code },      // Portfólio
  { id: '4', icon: User },       // Scarlett Finch
  { id: '6', icon: Code },       // Código Fluente
];

export default function StatsSection() {
  // Filtrar apenas os projetos em produção e adicionar ícones
  const productionProjects = productionProjectsConfig.map(config => {
    const project = allProjects.find(p => p.id === config.id);
    return project ? { ...project, icon: config.icon } : null;
  }).filter(Boolean);

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
      <Container>
        <SectionTitle
          title="Sistemas em Produção"
          subtitle="Sites, aplicações web e projetos audiovisuais operando em produção"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
          {productionProjects.map((project: any, index) => {
            const Icon = project.icon;
            const url = project.demoUrl || project.videoUrl || project.githubUrl;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 rounded-xl border border-border bg-background hover:border-primary transition-all duration-300 group h-full"
                >
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon size={24} className="text-primary" />
                    </div>
                    
                    <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-foreground-secondary mb-2">
                      {project.subtitle}
                    </p>
                    
                    <p className="text-xs text-foreground-muted mb-4 flex-1">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-1 text-xs text-primary mt-auto group-hover:gap-2 transition-all">
                      Ver projeto
                      <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
