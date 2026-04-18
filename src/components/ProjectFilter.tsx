'use client';

import { useState } from 'react';
import { ProjectCategory } from '@/types';
import { cn } from '@/utils';

interface ProjectFilterProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}

const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'clipe', label: 'Clipes' },
  { value: 'personagem', label: 'Personagens' },
  { value: 'avatar', label: 'Avatares IA' },
  { value: 'app', label: 'Apps' },
  { value: 'educacao', label: 'Educação' },
  { value: 'experimento', label: 'Experimentos' },
];

export default function ProjectFilter({
  activeCategory,
  onCategoryChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={cn(
            'px-6 py-2 rounded-full font-medium transition-all duration-300',
            activeCategory === cat.value
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50'
              : 'bg-background-secondary text-foreground-secondary hover:text-primary hover:border-primary border border-border'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
