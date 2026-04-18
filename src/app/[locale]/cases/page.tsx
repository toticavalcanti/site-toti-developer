'use client';

import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/Button';
import { cases } from '@/mockData';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

export default function CasesPage() {
  const t = useTranslations('work'); // Still using 'work' namespace from JSON for now
  const tn = useTranslations('nav');
  const tc = useTranslations('cta');

  const productionCases = useMemo(() => cases.filter(c => c.status === 'production'), []);
  const previewCases = useMemo(() => cases.filter(c => c.status === 'preview'), []);
  const otherCases = useMemo(() => cases.filter(c => c.status === 'functional' || c.status === 'demo'), []);

  return (
    <>
      <PageHeader
        title={tn('work')}
        description={t('subtitle')}
        breadcrumbs={[
          { label: tn('home'), href: '/' },
          { label: tn('work') },
        ]}
      />

      <div className="py-32 space-y-40">
        {/* Production Cases */}
        <section>
          <Container>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
               <h2 className="text-4xl font-black mb-6 flex items-center gap-6 uppercase tracking-tight">
                <div className="w-2 h-10 bg-primary rounded-full shadow-lg shadow-primary/20" />
                {t('production')}
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-primary to-transparent rounded-full mb-8" />
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {productionCases.map((c, index) => (
                <ProjectCard key={c.id} project={c} index={index} />
              ))}
            </div>
          </Container>
        </section>

        {/* Preview Cases */}
        {previewCases.length > 0 && (
          <section className="relative">
            <div className="absolute inset-0 bg-primary/5 -skew-y-3 -z-10" />
            <Container className="py-24">
               <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-4xl font-black mb-6 flex items-center gap-6 uppercase tracking-tight">
                  <div className="w-2 h-10 bg-secondary rounded-full shadow-lg shadow-secondary/20" />
                  {t('preview')}
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-secondary to-transparent rounded-full mb-8" />
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {previewCases.map((c, index) => (
                  <ProjectCard key={c.id} project={c} index={index} />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Demos/Other Cases */}
        <section>
          <Container>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
               <h2 className="text-4xl font-black mb-6 flex items-center gap-6 uppercase tracking-tight">
                <div className="w-2 h-10 bg-foreground-muted rounded-full shadow-md" />
                Demos & Concepts
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {otherCases.map((c, index) => (
                <ProjectCard key={c.id} project={c} index={index} />
              ))}
            </div>
          </Container>
        </section>

        {/* Closing CTA */}
        <section className="bg-background-secondary border-y border-border py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
          
          <Container>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl sm:text-6xl font-black mb-8 tracking-tighter leading-none uppercase">
                Ready to build the next <span className="gradient-text">Success Story</span>?
              </h2>
              <p className="text-xl text-foreground-secondary mb-12 font-medium leading-relaxed">
                Most of my high-impact work is protected by NDA or running on private infrastructure. 
                Let's hop on a call to see how I can solve your specific problem.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" asChild className="w-full sm:w-auto h-16 px-10 rounded-2xl shadow-xl shadow-primary/20 text-lg font-black group">
                  <Link href={`https://wa.me/5521988714006?text=Olá! Vi seus cases e gostaria de falar sobre um projeto.` as any} target="_blank">
                    <MessageCircle size={24} className="mr-3 group-hover:scale-125 transition-transform" />
                    {tc('button')}
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto h-16 px-10 rounded-2xl border-border bg-background/50 backdrop-blur-md text-lg font-black group">
                  <Link href="/contact">
                    Get in touch <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </Container>
        </section>
      </div>
    </>
  );
}
