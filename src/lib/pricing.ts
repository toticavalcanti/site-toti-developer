export type Locale = 'pt' | 'en';

export type PackageId = 'landing' | 'ecommerce' | 'automation' | 'custom';

export type PackagePricing = {
  id: PackageId;
  priceFrom: Record<Locale, string>;
  timeline: Record<Locale, string>;
  /** For custom: a secondary line hinting at quote-only */
  priceNote?: Record<Locale, string>;
};

export const packagePricing: Record<PackageId, PackagePricing> = {
  landing: {
    id: 'landing',
    priceFrom: {
      pt: 'A partir de R$ 3.500',
      en: 'Starting at $890',
    },
    timeline: {
      pt: 'Entrega em 7 a 10 dias',
      en: 'Delivered in 7–10 days',
    },
  },
  ecommerce: {
    id: 'ecommerce',
    priceFrom: {
      pt: 'A partir de R$ 8.500',
      en: 'Starting at $2,190',
    },
    timeline: {
      pt: 'Entrega em 3 a 4 semanas',
      en: 'Delivered in 3–4 weeks',
    },
  },
  automation: {
    id: 'automation',
    priceFrom: {
      pt: 'A partir de R$ 4.500',
      en: 'Starting at $1,190',
    },
    timeline: {
      pt: 'Entrega em 10 a 14 dias',
      en: 'Delivered in 10–14 days',
    },
  },
  custom: {
    id: 'custom',
    priceFrom: {
      pt: 'Projetos a partir de R$ 18.000',
      en: 'Projects from $4,500',
    },
    priceNote: {
      pt: 'Orçamento sob consulta',
      en: 'Custom quote',
    },
    timeline: {
      pt: 'Prazo conforme escopo',
      en: 'Timeline based on scope',
    },
  },
};

export function getPackagePricing(id: PackageId, locale: Locale) {
  return packagePricing[id];
}
