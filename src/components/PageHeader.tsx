import Container from './Container';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="bg-background-secondary border-b border-border py-16">
      <Container>
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-foreground-secondary mb-4">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-primary transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight size={16} />
                )}
              </div>
            ))}
          </nav>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{title}</span>
        </h1>

        {/* Description */}
        {description && (
          <p className="text-lg text-foreground-secondary max-w-3xl">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
}
