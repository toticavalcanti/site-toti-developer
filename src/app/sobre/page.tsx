'use client';

import PageHeader from '@/components/PageHeader';
import Container from '@/components/Container';
import Timeline from '@/components/Timeline';
import ChannelsSection from '@/components/ChannelsSection';
import { aboutInfo, timeline, socialLinks } from '@/mockData';
import { Code2, Music, Sparkles, ExternalLink, Github, Linkedin, Youtube, Instagram, Store, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const techStacks = [
  { icon: Code2, label: 'Full-Stack Development', items: ['Golang', 'Python', 'Next.js', 'Node.js', 'TypeScript'] },
  { icon: Sparkles, label: 'IA Generativa', items: ['Adobe Firefly', 'ChatGPT', 'Klingai', 'Flow', 'Nano Banana'] },
  { icon: Music, label: 'Produção Musical', items: ['Edição de Audio e Midi', 'Composição', 'Trilha', 'Mixagem', 'Masterização'] },
  { icon: Code2, label: 'Outras Skills', items: ['Git', 'Docker', 'AWS', 'K8S'] },
];

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
    description: 'Estampas e designs com IA generativa',
    icon: ShoppingBag,
  },
  {
    name: 'Colab55',
    url: 'https://www.colab55.com/@toticavalcanti',
    description: 'Arte digital para produtos físicos',
    icon: Store,
  },
];

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Youtube,
  Instagram,
};

export default function SobrePage() {
  return (
    <>
      <PageHeader
        title="Sobre Mim"
        description="Conheça minha jornada, habilidades e paixão por criar experiências digitais únicas"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sobre' },
        ]}
      />

      {/* Bio Section */}
      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Avatar */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 border border-border">
                <Image
                  src={aboutInfo.avatar}
                  alt={aboutInfo.name}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Bio Text */}
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Olá, sou <span className="gradient-text">{aboutInfo.name}</span>
              </h2>
              <div className="space-y-4">
                {aboutInfo.extendedBio.map((paragraph, index) => (
                  <p key={index} className="text-lg text-foreground-secondary leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <Container size="md">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Habilidades & Ferramentas</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {techStacks.map((skill, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-background border border-border"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <skill.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{skill.label}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-foreground-secondary flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Links & Stores Section */}
      <section className="py-16">
        <Container size="md">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Links & Lojas</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Social Links */}
            <div className="p-6 rounded-xl bg-background-secondary border border-border">
              <h3 className="text-xl font-bold mb-6">Redes Sociais</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link) => {
                  const IconComponent = iconMap[link.icon] || ExternalLink;
                  return (
                    <Link
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-primary/10 hover:border-primary/50 border border-border transition-all group"
                    >
                      <IconComponent size={20} className="text-primary" />
                      <span className="font-medium group-hover:text-primary transition-colors">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Store Links */}
            <div className="p-6 rounded-xl bg-background-secondary border border-border">
              <h3 className="text-xl font-bold mb-6">Lojas Online</h3>
              <div className="space-y-4">
                {storeLinks.map((store) => (
                  <Link
                    key={store.name}
                    href={store.url}
                    target="_blank"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-primary/10 hover:border-primary/50 border border-border transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                      <store.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <span className="font-bold group-hover:text-primary transition-colors">{store.name}</span>
                      <p className="text-sm text-foreground-secondary">{store.description}</p>
                    </div>
                    <ExternalLink size={16} className="ml-auto text-foreground-secondary group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <Container size="md">
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="gradient-text">Minha Jornada</span>
          </h2>
          <Timeline items={timeline} />
        </Container>
      </section>

      {/* YouTube Channels Section */}
      <ChannelsSection />
    </>
  );
}
