'use client';

import PageHeader from '@/components/PageHeader';
import Container from '@/components/Container';
import ContactForm from '@/components/ContactForm';
import { aboutInfo } from '@/mockData';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { useQualification } from '@/lib/qualification-context';

export default function ContatoPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { open } = useQualification();

  return (
    <>
      <PageHeader
        title={t('nav.contact')}
        description={t('contact.subtitle')}
        breadcrumbs={[
          { label: t('nav.home'), href: '/' },
          { label: t('nav.contact') },
        ]}
      />

      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute top-0 left-0 w-[30%] h-full bg-primary/5 blur-[100px] -z-10" />

        <Container>
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2">
              <div className="mb-10">
                <h2 className="text-4xl font-bold mb-6">
                  {locale === 'pt' ? 'Vamos criar algo ' : 'Let\'s create something '}
                  <span className="gradient-text">{locale === 'pt' ? 'Inovador' : 'Innovative'}</span>
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </div>
              
              <p className="text-foreground-secondary mb-10 text-lg leading-relaxed">
                {locale === 'pt'
                  ? 'Estou sempre aberto a novos projetos e parcerias técnicas. Se você precisa de um site de alta performance ou uma automação inteligente, vamos conversar.'
                  : 'I am always open to new projects and technical partnerships. If you need a high-performance website or smart automation, let\'s talk.'}
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-background-tertiary border border-border flex items-center justify-center flex-shrink-0 text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest text-foreground-muted mb-1">Email</h3>
                    <a
                      href={`mailto:${aboutInfo.email}`}
                      className="text-lg text-foreground hover:text-primary transition-colors font-medium underline underline-offset-4 decoration-primary/30"
                    >
                      {aboutInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 cursor-pointer" onClick={() => open(undefined, 'contact_page_info')}>
                  <div className="w-12 h-12 rounded-xl bg-background-tertiary border border-border flex items-center justify-center flex-shrink-0 text-success">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest text-foreground-muted mb-1">WhatsApp</h3>
                    <span className="text-lg text-foreground hover:text-primary transition-colors font-medium underline underline-offset-4 decoration-success/30">
                      {aboutInfo.whatsapp}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-background-tertiary border border-border flex items-center justify-center flex-shrink-0 text-secondary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest text-foreground-muted mb-1">
                      {locale === 'pt' ? 'Localização' : 'Location'}
                    </h3>
                    <p className="text-lg text-foreground font-medium">
                      Rio de Janeiro, Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-background-secondary border border-border rounded-3xl p-8 sm:p-12 shadow-2xl shadow-primary/5">
                <h3 className="text-2xl font-bold mb-8">
                   {locale === 'pt' ? 'Mande uma mensagem' : 'Send a message'}
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
