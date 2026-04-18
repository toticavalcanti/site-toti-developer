import { Service } from '@/types';
import Card from './Card';
import { LucideIcon, Music, User, Code, Sparkles, Code2, Video, Mic2, Palette } from 'lucide-react';
import { Check } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, LucideIcon> = {
  Music,
  User,
  Code,
  Sparkles,
  Code2,
  Video,
  Mic2,
  Palette,
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Code;

  return (
    <Card glow className="h-full">
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 flex-shrink-0">
          <Icon size={28} className="text-white" />
        </div>

        {/* Title - SEM truncamento */}
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>

        {/* Description */}
        <p className="text-sm text-foreground-secondary mb-4 leading-relaxed">{service.description}</p>

        {/* What's Included */}
        <div className="mt-auto">
          {service.whatsIncluded && service.whatsIncluded.length > 0 && (
            <>
              <h4 className="text-xs font-semibold text-primary mb-3">O que está incluído:</h4>
              <ul className="space-y-2">
                {service.whatsIncluded.slice(0, 3).map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-foreground-secondary">
                    <Check size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Real Examples */}
          {service.realExamples && service.realExamples.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="text-xs font-semibold text-primary mb-2">Cases Reais:</h4>
              <ul className="space-y-1">
                {service.realExamples.map((example, index) => (
                  <li key={index} className="text-xs text-foreground-secondary italic">
                    • {example}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
