'use client';

import { Project } from '@/types';
import Card from './Card';
import Tag from './Tag';
import { ExternalLink, Github, Play } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projetos/${project.id}`} className="block h-full">
      <Card glow className="group overflow-hidden p-0 h-full hover:border-primary transition-colors">
        <div className="flex flex-col h-full">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden bg-background-tertiary rounded-lg">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23222" width="400" height="300"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImagem indisponível%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Play icon overlay centralizado */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-primary/90 hover:bg-primary text-white p-4 rounded-full transition-colors">
                <Play size={24} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-7 md:p-8 space-y-3 md:space-y-4 flex-1 flex flex-col">
            {project.subtitle && (
              <p className="text-xs sm:text-sm text-primary font-semibold uppercase tracking-wide">
                {project.subtitle}
              </p>
            )}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed flex-1">
              {project.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 mt-auto">
              {project.tags.slice(0, 4).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
