'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import { socialLinks } from '@/mockData';
import { ExternalLink, Github, Linkedin, Youtube, Instagram, Palette, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

// Essential Links Checklist (DO NOT REMOVE):
// [x] GitHub
// [x] LinkedIn
// [x] YouTube
// [x] Instagram
// [x] Redbubble
// [x] Colab55

const storeLinks = [
  {
    name: 'Redbubble',
    url: 'https://www.redbubble.com/people/toticavalcanti',
    description: 'Estampas e designs com IA',
    icon: Palette,
  },
  {
    name: 'Colab55',
    url: 'https://www.colab55.com/@toticavalcanti',
    description: 'Arte para produtos físicos',
    icon: ShoppingBag,
  },
];

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Youtube,
  Instagram,
};

export default function LinksLojasSection() {
  return (
    <section className="py-12 sm:py-16 relative">
      <Container>
        <SectionTitle
          title="Links & Lojas"
          subtitle="Redes sociais e lojas online"
          centered
        />

        {/* Social Links - Compact pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 mb-8">
          {socialLinks.map((link) => {
            const IconComponent = iconMap[link.icon] || ExternalLink;
            return (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-background-secondary/80 hover:bg-primary/20 border border-border hover:border-primary/50 transition-all group text-sm"
              >
                <IconComponent size={16} className="text-primary" />
                <span className="font-medium group-hover:text-primary transition-colors">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Store Cards - Elegant icon-based layout */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {storeLinks.map((store) => {
            const StoreIcon = store.icon;
            return (
              <Link
                key={store.name}
                href={store.url}
                target="_blank"
                className="group flex items-center gap-4 p-4 rounded-xl bg-background-secondary/80 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <StoreIcon size={24} className="text-primary" />
                </div>
                
                {/* Text */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-sm sm:text-base group-hover:text-primary transition-colors truncate">
                      {store.name}
                    </h3>
                    <ExternalLink size={14} className="text-foreground-secondary group-hover:text-primary flex-shrink-0" />
                  </div>
                  <p className="text-foreground-secondary text-xs sm:text-sm mt-0.5">{store.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
