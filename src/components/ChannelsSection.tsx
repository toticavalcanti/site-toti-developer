'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import ChannelCard from './ChannelCard';
import { channels } from '@/mockData';

export default function ChannelsSection() {
  return (
    <section className="py-12 sm:py-16 relative">
      <Container>
        <SectionTitle
          title="Canais de Conteúdo"
          subtitle="Tutoriais, música autoral, projetos audiovisuais e pesquisa técnica em vídeo"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-10 md:mt-12">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </Container>
    </section>
  );
}
