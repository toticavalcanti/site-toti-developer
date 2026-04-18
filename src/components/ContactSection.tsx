'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import ContactForm from './ContactForm';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { aboutInfo } from '@/mockData';
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contato" className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionTitle
              title={t('title')}
              subtitle={t('subtitle')}
              className="mb-10"
            />

            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-lg shadow-primary/5">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-1">Email</p>
                  <a href={`mailto:${aboutInfo.email}`} className="text-lg font-bold hover:text-primary transition-colors">
                    {aboutInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/5">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-1">WhatsApp</p>
                  <a href={`https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" className="text-lg font-bold hover:text-emerald-500 transition-colors">
                    {aboutInfo.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform shadow-lg shadow-secondary/5">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-1">
                    Localization
                  </p>
                  <p className="text-lg font-bold">Rio de Janeiro, Brasil</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background-secondary border border-border rounded-[2.5rem] p-10 shadow-2xl shadow-primary/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
