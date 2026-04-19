'use client';

import Container from './Container';
import Marquee from './ui/Marquee';
import { useTranslations } from 'next-intl';

const clients = [
  { name: 'Zé Ramalho', url: 'https://www.zeramalho.com.br' },
  { name: 'Viva Leve', url: 'https://vivaleveportal.com.br' },
  { name: 'Código Fluente', url: 'https://www.codigofluente.com.br' },
  { name: 'Pink Pig', url: '#' },
  { name: 'NeuroZen', url: '#' },
  { name: 'Magic Prompts', url: '#' },
];

export default function ClientsMarquee() {
  return (
    <section className="py-20 relative">
      <Marquee speed={40} pauseOnHover>
        {clients.map((client, i) => (
          <a
            key={i}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground-muted hover:text-foreground transition-colors duration-300 whitespace-nowrap"
          >
            {client.name}
          </a>
        ))}
      </Marquee>
    </section>
  );
}
