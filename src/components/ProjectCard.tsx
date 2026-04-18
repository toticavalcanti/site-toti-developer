'use client';

import { Case } from '@/types';
import Image from 'next/image';
import { ExternalLink, Tag as TagIcon, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import Tag from './Tag';
import { useTranslations } from 'next-intl';

interface ProjectCardProps {
  project: Case;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const t = useTranslations('work');

  const statusLabels: Record<string, string> = {
    production: t('production'),
    preview: t('preview'),
    functional: t('functional'),
    demo: t('demo'),
  };

  const statusColors: Record<string, string> = {
    production: 'bg-primary/20 text-primary border-primary/30',
    preview: 'bg-amber-500/20 text-amber-500 border-amber-500/30',
    functional: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30',
    demo: 'bg-secondary/20 text-secondary border-secondary/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-background-secondary rounded-[2.5rem] overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.imagePath}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent opacity-60" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </div>
        </div>

        {/* Pillar Tag */}
        <div className="absolute bottom-4 left-4">
          <Tag variant="primary" size="sm" className="bg-primary/20 border-primary/30 text-primary backdrop-blur-md font-black uppercase">
            {project.pillar.replace('-', ' ')}
          </Tag>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors tracking-tight uppercase">
          {project.name}
        </h3>
        <p className="text-foreground-secondary text-sm mb-6 line-clamp-3 leading-relaxed font-medium">
          {project.description}
        </p>

        {/* Technologies / Stack */}
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-background-tertiary border border-border text-[10px] uppercase tracking-widest font-bold text-foreground-muted">
              <TagIcon size={10} />
              {tag}
            </span>
          ))}
        </div>

        {/* Link Actions */}
        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <Button size="sm" asChild className="flex-1 font-black shadow-xl shadow-primary/10 h-12">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={18} className="mr-2" /> {project.ctaText || 'Live'}
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
