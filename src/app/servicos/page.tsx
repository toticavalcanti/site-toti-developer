import PageHeader from '@/components/PageHeader';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { aboutInfo } from '@/mockData';
import Link from 'next/link';
import { Check, ArrowRight, MessageCircle, Sparkles, Code2, Music, Clock, Play } from 'lucide-react';

// Define pillars with their services (4-6 items max each)
const pillars = [
  {
    id: 'ia-automacao',
    title: 'IA & Automação',
    description: 'Soluções de inteligência artificial que trabalham 24h por você',
    icon: Sparkles,
    gradient: 'from-primary to-secondary',
    services: [
      {
        name: 'WhatsApp IA Vendedor',
        description: 'Atendimento automatizado que qualifica leads, responde dúvidas e agenda reuniões.',
      },
      {
        name: 'Chatbots Inteligentes',
        description: 'Assistentes virtuais para site, Instagram e outras plataformas.',
      },
      {
        name: 'Automações de Marketing',
        description: 'Sequências automáticas de e-mail, CRM e follow-up de leads.',
      },
      {
        name: 'Integrações entre Sistemas',
        description: 'Conecte suas ferramentas: planilhas, CRM, e-commerce, pagamentos.',
      },
    ],
  },
  {
    id: 'sites-sistemas',
    title: 'Sites & Sistemas',
    description: 'Aplicações web e sistemas sob medida para seu negócio',
    icon: Code2,
    gradient: 'from-secondary to-accent',
    services: [
      {
        name: 'Landing Pages',
        description: 'Páginas otimizadas para conversão com design profissional.',
      },
      {
        name: 'Sites Institucionais',
        description: 'Presença digital completa com blog, SEO e painel administrativo.',
      },
      {
        name: 'E-commerce',
        description: 'Lojas virtuais completas com pagamento, estoque e relatórios.',
      },
      {
        name: 'Sistemas Web',
        description: 'Dashboards, plataformas e aplicações customizadas.',
      },
      {
        name: 'Manutenção e Otimização',
        description: 'Performance, segurança e melhorias contínuas em sites existentes.',
      },
    ],
  },
  {
    id: 'audiovisual-musica',
    title: 'Audiovisual & Música',
    description: 'Produção criativa com IA: videoclipes, avatares, música',
    icon: Music,
    gradient: 'from-accent to-primary',
    services: [
      {
        name: 'Videoclipes com IA Generativa',
        description: 'Clipes profissionais usando IA (Runway, Midjourney) com custo menor que produção tradicional.',
      },
      {
        name: 'Produção Musical Completa',
        description: 'Do arranjo à masterização. Qualquer estilo, qualidade de mercado.',
      },
      {
        name: 'Avatares e Apresentadores IA',
        description: 'Modelos virtuais para publicidade, cursos e conteúdo de redes sociais.',
      },
      {
        name: 'Arte Generativa',
        description: 'Capas de álbum, artes para redes sociais e material promocional.',
      },
    ],
    // Pocket Show handled separately as waiting list
  },
];

export default function ServicosPage() {
  const whatsappBase = `https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}`;
  const pocketShowWaitlistUrl = `${whatsappBase}?text=${encodeURIComponent('Oi Toti! Quero entrar na lista de espera do Pocket Show. Meu nome é __. Evento em: __ (cidade/data).')}`;

  return (
    <>
      <PageHeader
        title="Serviços"
        description="Escolha o pilar que mais atende sua necessidade"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Serviços' },
        ]}
      />

      {/* Quick Navigation */}
      <section className="py-8 border-b border-border sticky top-16 z-40">
        <Container>
          <div className="flex flex-wrap justify-center gap-4">
            {pillars.map((pillar) => (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                className="px-4 py-2 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-colors text-sm font-medium"
              >
                {pillar.title}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Pillar Sections */}
      {pillars.map((pillar, pillarIndex) => {
        const whatsappUrl = `${whatsappBase}?text=Olá! Quero um orçamento de ${pillar.title}.`;
        const isAudiovisual = pillar.id === 'audiovisual-musica';

        return (
          <section
            key={pillar.id}
            id={pillar.id}
            className="py-16 sm:py-20 scroll-mt-32"
          >
            <Container>
              {/* Pillar Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center`}>
                  <pillar.icon size={28} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">{pillar.title}</h2>
                  <p className="text-foreground-secondary">{pillar.description}</p>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {pillar.services.map((service, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Check size={20} className="text-success mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">{service.name}</h3>
                        <p className="text-sm text-foreground-secondary">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pocket Show Waiting List Card - Only for Audiovisual */}
                {isAudiovisual && (
                  <div className="p-6 rounded-xl bg-gradient-to-br from-warning/5 to-background border-2 border-warning/30 hover:border-warning/50 transition-colors relative">
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-warning text-black text-xs font-bold rounded-full flex items-center gap-1">
                      <Clock size={12} />
                      Em montagem
                    </div>
                    <div className="flex items-start gap-3 mt-2">
                      <Clock size={20} className="text-warning mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">Pocket Show — Lista de Espera</h3>
                        <p className="text-sm text-foreground-secondary mb-2">
                          Performance ao vivo com flauta e sax. Formatos e repertório em definição. 
                          Garanta prioridade entrando na lista de espera.
                        </p>
                        <p className="text-xs text-foreground-secondary mb-3">
                          Quer ter uma ideia do clima? Veja alguns trechos no meu canal{' '}
                          <Link
                            href="https://www.youtube.com/@toticavalcantimusic"
                            target="_blank"
                            className="inline-flex items-center gap-1 text-foreground-secondary hover:text-primary transition-colors underline underline-offset-2"
                          >
                            <Play size={12} />
                            Ver vídeos (YouTube)
                          </Link>
                        </p>
                        <Button asChild size="sm" className="border-warning text-warning hover:bg-warning hover:text-black" variant="outline">
                          <Link href={pocketShowWaitlistUrl} target="_blank">
                            <MessageCircle size={16} className="mr-2" />
                            Entrar na lista
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pillar CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link href={whatsappUrl} target="_blank">
                    <MessageCircle size={20} className="mr-2" />
                    Quero orçamento de {pillar.title}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/cases?p=${pillar.id}`}>
                    Ver cases <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/contato">
                    Enviar formulário <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </Container>
          </section>
        );
      })}

      {/* FAQ Section */}
      <section className="py-16 border-t border-border">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Perguntas Frequentes
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-6 rounded-lg bg-background-secondary">
              <h3 className="font-bold mb-2">Como funciona o orçamento?</h3>
              <p className="text-foreground-secondary text-sm">
                Você descreve sua necessidade via WhatsApp ou formulário. Analiso e retorno com proposta clara contendo escopo, prazo estimado e investimento.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-background-secondary">
              <h3 className="font-bold mb-2">Qual o prazo de entrega?</h3>
              <p className="text-foreground-secondary text-sm">
                Depende do escopo. Projetos simples: 1-2 semanas. Projetos médios: 3-6 semanas. Projetos complexos: sob medida. O prazo exato é definido na proposta.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-background-secondary">
              <h3 className="font-bold mb-2">Posso parcelar?</h3>
              <p className="text-foreground-secondary text-sm">
                Sim, para projetos acima de R$ 5.000. Detalhes negociados caso a caso.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-background-secondary">
              <h3 className="font-bold mb-2">Trabalha com contrato?</h3>
              <p className="text-foreground-secondary text-sm">
                Sim. Todos os projetos incluem proposta formal e contrato detalhando escopo, prazos, entregas e condições de pagamento.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
