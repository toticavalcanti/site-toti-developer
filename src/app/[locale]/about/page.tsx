'use client';

import PageHeader from '@/components/PageHeader';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { aboutInfo, socialLinks } from '@/mockData';
import { Code2, Zap, Layout, Terminal, Github, Linkedin, Youtube, Instagram, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Youtube,
  Instagram,
};

export default function SobrePage() {
  const t = useTranslations();
  const locale = useLocale();

  const techStacks = [
    { 
      icon: Terminal, 
      label: locale === 'pt' ? 'Backend & Infra' : 'Backend & Infra', 
      items: ['Next.js (App Router)', 'Node.js', 'Typescript', 'Supabase', 'MongoDB', 'Docker'] 
    },
    { 
      icon: Layout, 
      label: locale === 'pt' ? 'Frontend & UI' : 'Frontend & UI', 
      items: ['React', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'CSS Modules'] 
    },
    { 
      icon: Zap, 
      label: locale === 'pt' ? 'Automação & IA' : 'Automation & AI', 
      items: ['OpenAI API', 'Groq / Llama', 'Z-API (WhatsApp)', 'Make.com', 'n8n'] 
    },
    { 
      icon: Code2, 
      label: locale === 'pt' ? 'Metodologia' : 'Methodology', 
      items: ['Agile / Scrum', 'TDD', 'Clean Code', 'Performance First', 'MVP Mindset'] 
    },
  ];

  return (
    <>
      <PageHeader
        title={locale === 'pt' ? 'Sobre' : 'About'}
        description={locale === 'pt' ? 'Minha jornada na engenharia de software e foco em resultados comerciais.' : 'My journey in software engineering and focus on business results.'}
        breadcrumbs={[
          { label: t('nav.home'), href: '/' },
          { label: locale === 'pt' ? 'Sobre' : 'About' },
        ]}
      />

      <section className="py-24 bg-background">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-border bg-background-secondary shadow-2xl">
                <Image
                  src={aboutInfo.avatar}
                  alt={aboutInfo.name}
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-8">
                {locale === 'pt' ? 'Construindo o futuro das ' : 'Building the future of '}
                <span className="gradient-text">
                  {locale === 'pt' ? 'Vendas Digitais' : 'Digital Sales'}
                </span>
              </h2>
              <div className="space-y-6">
                {aboutInfo.extendedBio.map((paragraph, index) => (
                  <p key={index} className="text-lg text-foreground-secondary leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                 {socialLinks.map((link) => {
                  const IconComponent = iconMap[link.icon] || ExternalLink;
                  return (
                    <Link
                      key={link.name}
                      href={link.url as any}
                      target="_blank"
                      className="flex items-center gap-3 px-5 py-3 rounded-xl bg-background-secondary hover:bg-primary/10 hover:border-primary/50 border border-border transition-all group"
                    >
                      <IconComponent size={20} className="text-foreground-secondary group-hover:text-primary transition-colors" />
                      <span className="font-bold text-sm tracking-tight">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-background-secondary/30 border-y border-border">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'pt' ? 'Stack Tecnológica' : 'Tech Stack'}
            </h2>
            <p className="text-foreground-secondary italic">
              {locale === 'pt' 
                ? 'Ferramentas selecionadas para máxima performance e agilidade de entrega.' 
                : 'Tools selected for maximum performance and delivery agility.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStacks.map((skill, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-background border border-border group hover:border-primary transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <skill.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold">{skill.label}</h3>
                </div>
                <ul className="space-y-3">
                  {skill.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-foreground-secondary flex items-center gap-3 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="p-12 sm:p-16 rounded-[3rem] bg-gradient-to-br from-background-secondary to-background border border-border text-center overflow-hidden relative shadow-2xl shadow-primary/5">
             <div className="absolute top-0 right-0 w-[40%] h-full bg-primary/5 blur-[120px] -z-10" />
             <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                {locale === 'pt' ? 'Pronto para começar seu projeto?' : 'Ready to start your project?'}
             </h2>
             <Button size="lg" asChild>
                <Link href="/contact">
                   {locale === 'pt' ? 'Entrar em Contato' : 'Get in Touch'} <ExternalLink size={20} className="ml-2" />
                </Link>
             </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
