'use client';

import { cn } from '@/utils';
import ScrollReveal from './ui/ScrollReveal';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  centered = false,
  className,
}: SectionTitleProps) {
  return (
    <ScrollReveal
      className={cn(
        'mb-16 lg:mb-20',
        centered ? 'text-center flex flex-col items-center' : '',
        className
      )}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-foreground-secondary max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-8 h-1 w-24 bg-primary rounded-full" />
    </ScrollReveal>
  );
}
