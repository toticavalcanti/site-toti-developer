'use client';

import { Case } from '@/types';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TiltCard from './ui/TiltCard';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils';

interface ProjectCardProps {
  project: Case;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const t = useTranslations('work');
  const [isHovered, setIsHovered] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = [
    project.imagePath,
    project.imagePath.replace('cover.jpg', 'preview-1.jpg'),
    project.imagePath.replace('cover.jpg', 'preview-2.jpg')
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImgIndex((prev) => (prev + 1) % images.length);
      }, 1500);
    } else {
      setCurrentImgIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

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
      <div 
        className="group relative flex flex-col h-full bg-[#0d0d0d] rounded-2xl overflow-hidden border border-white/[0.03] hover:border-primary/30 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
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

        {/* Hero Image - 16:9 Aspect for full horizontal visibility */}
        <div className="relative aspect-video overflow-hidden bg-[#050505]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImgIndex]}
                alt={project.name}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-105"
                priority={index < 3}
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="absolute top-4 right-4 z-20">
            <div className={`px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-[0.25em] border border-current backdrop-blur-3xl shadow-2xl ${statusColors[project.status]}`}>
              {statusLabels[project.status]}
            </div>
          </div>

          {/* Image indicator dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-1 h-1 rounded-full transition-all duration-300",
                  i === currentImgIndex ? "w-3 bg-primary" : "bg-white/20"
                )}
              />
            ))}
          </div>
        </div>

        {/* Content Body - Editorial & Compact */}
        <div className="p-8 pb-10 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/60">
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
            {project.liveUrl ? (
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
            ) : (
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                  PRIVATE REPO
                </div>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
