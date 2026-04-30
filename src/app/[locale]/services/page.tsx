'use client';

import PageHeader from '@/components/PageHeader';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { aboutInfo } from '@/mockData';
import { Link } from '@/i18n/routing';
import { Check, ArrowRight, MessageCircle, Zap, Code2, Shield, Globe } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useQualification } from '@/lib/qualification-context';
import { ProjectType } from '@/lib/qualification-schema';

export default function ServicosPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { open } = useQualification();

  const pillars = [
    {
      id: 'landing-pages',
      title: t('services.lp_title'),
      description: t('services.lp_desc'),
      icon: Zap,
      gradient: 'from-primary to-primary-light',
      services: locale === 'pt' ? [
        'Design UI/UX Exclusivo',
        'Foco em Conversão (CRO)',
        'Copywriting Comercial',
        'Otimização de Velocidade',
        'Integração com Leads/WhatsApp'
      ] : [
        'Exclusive UI/UX Design',
        'Conversion Focus (CRO)',
        'Commercial Copywriting',
        'Speed Optimization',
        'Leads/WhatsApp Integration'
      ]
    },
    {
      id: 'ecommerce',
      title: t('services.store_title'),
      description: t('services.store_desc'),
      icon: Globe,
      gradient: 'from-secondary to-secondary-light',
      services: locale === 'pt' ? [
        'Catálogo Digital Rápido',
        'Checkout Simplificado',
        'Gestão de Produtos',
        'Suporte Bilíngue Nativo',
        'Hospedagem de Performance'
      ] : [
        'Fast Digital Catalog',
        'Simplified Checkout',
        'Product Management',
        'Native Bilingual Support',
        'Performance Hosting'
      ]
    },
    {
      id: 'automation',
      title: t('services.automation_title'),
      description: t('services.automation_desc'),
      icon: MessageCircle,
      gradient: 'from-emerald-500 to-teal-400',
      services: locale === 'pt' ? [
        'Assistente de Vendas IA',
        'Qualificação Automática',
        'Agendamento Inteligente',
        'Fluxos de Transbordamento',
        'Relatórios de Performance'
      ] : [
        'AI Sales Assistant',
        'Automatic Qualification',
        'Smart Scheduling',
        'Overflow Flows',
        'Performance Reports'
      ]
    },
    {
      id: 'custom',
      title: t('services.custom_title'),
      description: t('services.custom_desc'),
      icon: Code2,
      gradient: 'from-blue-600 to-indigo-500',
      services: locale === 'pt' ? [
        'Desenvolvimento Next.js',
        'Arquitetura de microsserviços',
        'Dashboards Administrativos',
        'Segurança e Escalabilidade',
        'Migração de Legado'
      ] : [
        'Next.js Development',
        'Microservices Architecture',
        'Administrative Dashboards',
        'Security & Scalability',
        'Legacy Migration'
      ]
    }
  ];

  return (
    <>
      <PageHeader
        title={t('nav.services')}
        description={t('services.subtitle')}
        breadcrumbs={[
          { label: t('nav.home'), href: '/' },
          { label: t('nav.services') },
        ]}
      />

      <div className="py-20 space-y-24">
        {/* Diagnostic Callout */}
        <section id="auditoria" className="scroll-mt-32">
          <Container>
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-background-secondary/30 backdrop-blur-sm p-10 sm:p-16 text-center group transition-all duration-700 hover:border-primary/40 shadow-2xl">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
               
               <div className="relative max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
                    <Shield size={16} className="fill-primary" />
                    {locale === 'pt' ? 'Diagnóstico Inicial' : 'Initial Diagnosis'}
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl font-black mb-8 tracking-tight">
                    {t('services.audit_callout_title')}
                  </h2>
                  
                  <p className="text-foreground-secondary text-lg sm:text-xl leading-relaxed mb-12">
                    {t('services.audit_callout_desc')}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button 
                      size="lg" 
                      className="px-10 h-16 text-base"
                      onClick={() => open('audit', 'services_diagnostic_banner')}
                    >
                      <Zap size={20} className="mr-3 fill-white" />
                      {t('services.audit_cta')}
                    </Button>
                    
                    <div className="flex flex-col items-start text-left">
                       <span className="text-primary font-bold text-lg">A partir de R$ 197</span>
                       <span className="text-foreground-muted text-sm tracking-wide font-medium uppercase">{locale === 'pt' ? 'Entrega em 2-3 dias' : '2-3 days delivery'}</span>
                    </div>
                  </div>
               </div>
            </div>
          </Container>
        </section>

        {pillars.map((pillar, index) => (
          <section key={pillar.id} id={pillar.id} className="scroll-mt-32">
            <Container>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6 shadow-xl shadow-primary/10`}>
                    <pillar.icon size={32} className="text-white" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">{pillar.title}</h2>
                  <p className="text-foreground-secondary text-lg mb-8 leading-relaxed">
                    {pillar.description}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {pillar.services.map((service, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Check size={18} className="text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground-secondary">{service}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={() => open(pillar.id === 'landing-pages' ? 'landing' : pillar.id as ProjectType, `services_${pillar.id}`)}>
                      <MessageCircle size={20} className="mr-2" />
                      {locale === 'pt' ? 'Solicitar Proposta' : 'Request Proposal'}
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/work?p=${pillar.id}` as any}>
                        {locale === 'pt' ? 'Ver Cases' : 'See Cases'} <ArrowRight size={18} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className={cn(
                  "aspect-video rounded-3xl bg-background-secondary border border-border overflow-hidden relative group shadow-2xl",
                  index % 2 !== 0 ? 'lg:order-1' : ''
                )}>
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                      <pillar.icon size={120} className="text-primary" />
                   </div>
                   <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-background/80 to-transparent">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Solution Overview</p>
                      <p className="text-lg font-bold">{pillar.title}</p>
                   </div>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      {/* FAQ Section */}
      <section className="py-24 bg-background-secondary/30 border-t border-border">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
             <h2 className="text-3xl font-bold mb-4">
              {locale === 'pt' ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-foreground-secondary">
              {locale === 'pt' ? 'Tudo o que você precisa saber sobre o processo.' : 'Everything you need to know about the process.'}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              {
                q: locale === 'pt' ? 'Como funciona o orçamento?' : 'How does the quote work?',
                a: locale === 'pt' ? 'Analisamos seu escopo e retornamos com uma proposta técnica e comercial em até 24h.' : 'We analyze your scope and return with a technical and commercial proposal within 24h.'
              },
              {
                q: locale === 'pt' ? 'Qual o prazo médio de entrega?' : 'What is the average delivery time?',
                a: locale === 'pt' ? 'Landing Pages em 7-10 dias. Sistemas e E-commerces variam entre 3-4 semanas.' : 'Landing Pages in 7-10 days. Systems and E-commerces vary between 3-4 weeks.'
              },
              {
                q: locale === 'pt' ? 'O suporte pós-entrega está incluso?' : 'Is post-delivery support included?',
                a: locale === 'pt' ? 'Sim, oferecemos 30 dias de garantia total e planos de manutenção contínua.' : 'Yes, we offer 30 days of full warranty and ongoing maintenance plans.'
              }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all">
                <h3 className="font-bold mb-3 text-lg">{faq.q}</h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
