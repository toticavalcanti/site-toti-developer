'use client';

import { Link } from '@/i18n/routing';
import Container from './Container';
import { Github, Linkedin, Youtube, Instagram, Code2 } from 'lucide-react';
import { socialLinks } from '@/mockData';
import { useTranslations } from 'next-intl';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Github,
  Linkedin,
  Youtube,
  Instagram,
};

import { useQualification } from '@/lib/qualification-context';

export default function Footer() {
  const tn = useTranslations('nav');
  const ts = useTranslations('services');
  const tf = useTranslations('footer');
  const { open } = useQualification();

  const footerLinks = [
    {
      title: tn('home'),
      links: [
        { label: tn('home'), href: '/' },
        { label: tn('services'), href: '/services' },
        { label: tn('work'), href: '/cases' },
        { label: tn('contact'), href: '/contact' },
      ],
    },
    {
      title: tn('services'),
      links: [
        { label: ts('lp_title'), href: '/services#landing-pages' },
        { label: ts('store_title'), href: '/services#ecommerce' },
        { label: ts('automation_title'), href: '/services#automation' },
        { label: ts('custom_title'), href: '/services#custom' },
      ],
    },
    {
      title: tn('contact'),
      links: [
        { label: 'WhatsApp', href: '#', onClick: () => open(undefined, 'footer') },
        { label: 'Linkedin', href: 'https://linkedin.com/in/toticavalcanti' },
        { label: 'Email', href: 'mailto:toticavalcanti@gmail.com' },
      ],
    },
  ];

  return (
    <footer className="bg-background-secondary/50 border-t border-border pt-24 pb-12 relative overflow-hidden text-sm">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                <Code2 size={24} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tight leading-none uppercase">
                Toti <span className="gradient-text">Cavalcanti</span>
              </span>
            </Link>
            <p className="text-foreground-secondary mb-10 max-w-sm leading-relaxed font-medium">
              {tf('bio')}
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return Icon ? (
                  <Link
                    key={social.name}
                    href={social.url as any}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 text-foreground-secondary shadow-lg shadow-black/10 hover:shadow-primary/5"
                    aria-label={social.name}
                  >
                    <Icon size={22} />
                  </Link>
                ) : null;
              })}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] mb-10 text-foreground-muted">{section.title}</h3>
              <ul className="space-y-5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-foreground-secondary hover:text-primary transition-all duration-300 font-bold hover:translate-x-1 inline-block text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href as any}
                        className="text-foreground-secondary hover:text-primary transition-all duration-300 font-bold hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-foreground-muted">
          <p>
            © {new Date().getFullYear()} Toti Cavalcanti. Built with Next.js & Advanced AI.
          </p>
          <div className="flex gap-8">
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
