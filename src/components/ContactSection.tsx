'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import ContactForm from './ContactForm';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { aboutInfo } from '@/mockData';
import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';
import { useQualification } from '@/lib/qualification-context';

export default function ContactSection() {
  const t = useTranslations('contact');
  const { open } = useQualification();

  return (
    <section id="contato" className="py-16 sm:py-20 relative border-t border-border/50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          <ScrollReveal y={30}>
            <SectionTitle
              title={t('title')}
              subtitle={t('subtitle')}
              className="mb-10"
            />

            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-110 shadow-lg shadow-primary/5">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-1">Email</p>
                  <a href={`mailto:${aboutInfo.email}`} className="text-lg font-semibold hover:text-primary transition-colors tracking-tight">
                    {aboutInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 group cursor-pointer" onClick={() => open(undefined, 'contact_info')}>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 transition-transform group-hover:scale-110 shadow-lg shadow-emerald-500/5">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-1">WhatsApp</p>
                  <span className="text-lg font-semibold hover:text-emerald-500 transition-colors tracking-tight">
                    {aboutInfo.whatsapp}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary transition-transform group-hover:scale-110 shadow-lg shadow-secondary/5">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-1">
                    Localization
                  </p>
                  <p className="text-lg font-semibold tracking-tight">Rio de Janeiro, Brasil</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} y={50} className="bg-background-secondary border border-border rounded-3xl p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
