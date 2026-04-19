'use client';

import Container from './Container';
import ScrollReveal from './ui/ScrollReveal';
import Marquee from './ui/Marquee';
import { useTranslations } from 'next-intl';

type TechGroup = {
  label: string;
  companies: string[];
};

const techGroups: TechGroup[] = [
  {
    label: 'Next.js · React',
    companies: ['Netflix', 'TikTok', 'Twitch', 'Nike', 'Uber', 'Notion', 'Hulu', 'Walmart', 'Target', 'Hashnode'],
  },
  {
    label: 'TypeScript',
    companies: ['Microsoft', 'Slack', 'Airbnb', 'Airtable', 'Asana', 'Figma'],
  },
  {
    label: 'Node.js',
    companies: ['LinkedIn', 'NASA', 'PayPal', 'eBay', 'Medium', 'Trello'],
  },
  {
    label: 'Go (Golang)',
    companies: ['Google', 'Uber', 'Dropbox', 'Cloudflare', 'Monzo', 'Twitch'],
  },
  {
    label: 'MongoDB',
    companies: ['Adobe', 'eBay', 'Forbes', 'Coinbase', 'Toyota', 'Verizon'],
  },
  {
    label: 'Supabase',
    companies: ['Mozilla', '1Password', 'PwC', 'GitHub', 'Humata', 'Chatbase'],
  },
  {
    label: 'OpenAI · Anthropic · Groq',
    companies: ['Morgan Stanley', 'Klarna', 'Duolingo', 'Stripe', 'Zapier', 'Shopify'],
  },
];

// Achata todos os nomes num array só para o marquee principal
const allCompanies = Array.from(
  new Set(techGroups.flatMap((g) => g.companies))
);

export default function TechCredibility() {
  const t = useTranslations('tech');

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <Container>
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-6">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-6">
            {t('title_1')}{' '}
            <span className="gradient-text">{t('title_accent')}</span>{' '}
            {t('title_2')}
          </h2>
          <p className="text-foreground-secondary text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </ScrollReveal>
      </Container>

      {/* Marquee principal — todas as empresas juntas, rolando */}
      <ScrollReveal delay={0.2} className="relative z-10 py-12">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <Marquee speed={200} pauseOnHover>
          {allCompanies.map((company, i) => (
            <span
              key={i}
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground-muted/50 hover:text-foreground transition-colors duration-300 whitespace-nowrap"
            >
              {company}
            </span>
          ))}
        </Marquee>
      </ScrollReveal>

      {/* Agrupamento editorial por tecnologia */}
      <Container>
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techGroups.map((group, index) => (
            <ScrollReveal key={group.label} delay={index * 0.08}>
              <div className="h-full p-6 rounded-2xl border border-border bg-background-secondary/40 backdrop-blur-sm hover:border-primary/30 transition-colors duration-500">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary mb-4">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {group.companies.map((company) => (
                    <span
                      key={company}
                      className="text-sm font-medium text-foreground-secondary"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} className="mt-16 text-center">
          <p className="text-sm text-foreground-muted max-w-2xl mx-auto leading-relaxed italic">
            {t('disclaimer')}
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
