'use client';

import { Case } from '@/types';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TiltCard from './ui/TiltCard';

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
    production: 'text-emerald-400',
    preview: 'text-amber-400',
    functional: 'text-blue-400',
    demo: 'text-white/30',
  };

  return (
    <TiltCard max={3} scale={1.02} className="h-full">
      <div className="group relative flex flex-col h-full bg-[#0d0d0d] rounded-2xl overflow-hidden border border-white/[0.03] hover:border-primary/30 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
        
        {/* Browser Top - Minimalist Dark */}
        <div className="h-7 bg-white/[0.02] border-b border-white/[0.05] flex items-center px-4 gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
           <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          </div>
          <div className="ml-auto text-[7px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
            {project.liveUrl?.replace('https://', '').replace('www.', '').split('/')[0]}
          </div>
        </div>

        {/* Hero Image - Horizontal Aspect with Scroll on Hover */}
        <div className="relative aspect-[16/11] overflow-hidden bg-[#111]">
          <div className="absolute inset-0 transition-transform duration-[4000ms] ease-linear group-hover:-translate-y-1/2">
            <Image
              src={project.imagePath}
              alt={project.name}
              fill
              className="object-cover object-top"
              priority={index < 3}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="absolute top-4 right-4">
            <div className={`px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-[0.25em] border border-current backdrop-blur-3xl shadow-2xl ${statusColors[project.status]}`}>
              {statusLabels[project.status]}
            </div>
          </div>
        </div>

        {/* Content Body - Editorial & Compact */}
        <div className="p-8 pb-10 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/40">
          <div className="flex flex-wrap gap-3 mb-6">
            {project.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20">
                // {tag}
              </span>
            ))}
          </div>

          <h3 className="text-3xl font-light tracking-tighter text-white/90 group-hover:text-white transition-colors duration-500 mb-6">
            {project.name}
          </h3>

          {/* Action Link - Pure High-End interaction */}
          <div className="mt-auto">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group/link inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-white transition-all duration-500"
              >
                <span>VER PROJETO</span>
                <div className="w-8 h-[1px] bg-primary/30 group-hover/link:w-16 group-hover/link:bg-white transition-all duration-500" />
                <ArrowRight size={14} className="-translate-x-2 group-hover/link:translate-x-0 transition-transform duration-500" />
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
