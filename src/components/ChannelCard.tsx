'use client';

import { Channel } from '@/types';
import Card from './Card';
import Button from './Button';
import { ExternalLink, Beaker } from 'lucide-react';

interface ChannelCardProps {
  channel: Channel;
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name)}&size=400&background=6366f1&color=fff&bold=true&font-size=0.4`;

  return (
    <Card glow className="flex flex-col h-full overflow-hidden group">
      {/* Thumbnail do canal - sem padding para ficar centralizada */}
      <div className="relative w-full aspect-video bg-background-tertiary overflow-hidden">
        <img
          src={channel.thumbnail || fallbackUrl}
          alt={channel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = fallbackUrl;
          }}
        />
        
        {channel.status === 'lab' && (
          <div className="absolute top-3 right-3 bg-accent text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 z-10">
            <Beaker size={12} />
            Lab
          </div>
        )}
      </div>

      {/* Content com padding reduzido */}
      <div className="flex flex-col flex-1 p-3">
        <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">{channel.name}</h3>
        <p className="text-sm text-foreground-secondary mb-3 flex-1 leading-relaxed">
          {channel.description}
        </p>

        <Button variant="outline" size="sm" asChild className="w-full">
          <a href={channel.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} className="mr-2" />
            Ver canal
          </a>
        </Button>
      </div>
    </Card>
  );
}
