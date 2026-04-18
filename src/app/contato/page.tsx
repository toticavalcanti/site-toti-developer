import PageHeader from '@/components/PageHeader';
import Container from '@/components/Container';
import ContactForm from '@/components/ContactForm';
import { aboutInfo } from '@/mockData';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        title="Contato"
        description="Vamos conversar sobre seu próximo projeto e transformar suas ideias em realidade"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contato' },
        ]}
      />

      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Vamos criar algo <span className="gradient-text">incrível</span> juntos
              </h2>
              <p className="text-foreground-secondary mb-8 leading-relaxed">
                Estou sempre aberto a novos projetos e colaborações. Se você tem uma
                ideia ou precisa de ajuda com desenvolvimento, IA ou produção musical,
                ficarei feliz em conversar!
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href={`mailto:${aboutInfo.email}`}
                      className="text-foreground-secondary hover:text-primary transition-colors"
                    >
                      {aboutInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <Link
                      href={`https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      className="text-foreground-secondary hover:text-primary transition-colors"
                    >
                      {aboutInfo.whatsapp}
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-warning flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Localização</h3>
                    <p className="text-foreground-secondary">
                      Rio de Janeiro, Brasil
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Button */}
              <div className="mt-8 p-6 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <h3 className="font-semibold mb-2">Prefere conversar agora?</h3>
                <p className="text-sm text-foreground-secondary mb-4">
                  Clique no botão abaixo para iniciar uma conversa no WhatsApp
                </p>
                <Link
                  href={`https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all"
                >
                  <MessageCircle size={20} />
                  Abrir WhatsApp
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background-secondary border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Envie uma mensagem</h3>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
