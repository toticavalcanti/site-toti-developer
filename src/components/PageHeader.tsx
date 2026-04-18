'use client';

import Container from './Container';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative pt-40 pb-20 overflow-hidden border-b border-border/50">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <Container>
        <div className="max-w-4xl">
          {breadcrumbs && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-8"
            >
              {breadcrumbs.map((crumb, i) => (
                <div key={i} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href as any} className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground-muted hover:text-primary transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      {crumb.label}
                    </span>
                  )}
                  {i < breadcrumbs.length - 1 && <ChevronRight size={12} className="text-foreground-muted" />}
                </div>
              ))}
            </motion.div>
          )}

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl font-black mb-8 leading-none tracking-tighter uppercase"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl sm:text-2xl text-foreground-secondary max-w-2xl font-medium leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
      </Container>
    </div>
  );
}
