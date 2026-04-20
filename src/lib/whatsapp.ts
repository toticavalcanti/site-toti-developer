type Locale = 'pt' | 'en';

type QualificationPayload = {
  projectType: string;
  budget: string;
  timeline: string;
  name?: string;
  message?: string;
};

export function buildWhatsappUrl(
  phone: string,
  locale: Locale,
  payload: QualificationPayload
): string {
  const digits = phone.replace(/\D/g, '');
  const text = locale === 'en'
    ? buildEn(payload)
    : buildPt(payload);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

function buildPt(p: QualificationPayload): string {
  const projectMap: Record<string, string> = {
    landing: 'Landing Page',
    ecommerce: 'E-commerce',
    automation: 'Automação com IA',
    custom: 'Sistema sob medida',
    not_sure: 'Ainda não sei direito',
  };
  const budgetMap: Record<string, string> = {
    under_3k: 'Até R$ 3.000',
    '3k_10k': 'R$ 3.000 a R$ 10.000',
    '10k_30k': 'R$ 10.000 a R$ 30.000',
    '30k_plus': 'Acima de R$ 30.000',
    undefined: 'Ainda estudando',
  };
  const timelineMap: Record<string, string> = {
    asap: 'O quanto antes',
    '1_month': 'Em cerca de 1 mês',
    '2_3_months': '2 a 3 meses',
    no_rush: 'Sem pressa',
  };

  const lines = [
    locale === 'pt' ? `Olá Toti, vim pelo site.` : `Hi Toti, I came from your website.`,
    p.name ? (locale === 'pt' ? `Meu nome é ${p.name}.` : `My name is ${p.name}.`) : null,
  ];

  if (p.projectType && p.projectType !== 'not_sure') {
    lines.push(locale === 'pt' ? `Tipo de projeto: ${projectMap[p.projectType] ?? p.projectType}` : `Project type: ${projectMap[p.projectType] ?? p.projectType}`);
  }
  if (p.budget && p.budget !== 'undefined') {
    lines.push(locale === 'pt' ? `Orçamento: ${budgetMap[p.budget] ?? p.budget}` : `Budget: ${budgetMap[p.budget] ?? p.budget}`);
  }
  if (p.timeline && p.timeline !== 'no_rush') {
    lines.push(locale === 'pt' ? `Prazo: ${timelineMap[p.timeline] ?? p.timeline}` : `Timeline: ${timelineMap[p.timeline] ?? p.timeline}`);
  }
  if (p.message) {
    lines.push(locale === 'pt' ? `\nResumo: ${p.message}` : `\nSummary: ${p.message}`);
  }

  return lines.filter(Boolean).join('\n');
}

function buildEn(p: QualificationPayload): string {
  const projectMap: Record<string, string> = {
    landing: 'Landing Page',
    ecommerce: 'E-commerce',
    automation: 'AI Automation',
    custom: 'Custom System',
    not_sure: 'Not sure yet',
  };
  const budgetMap: Record<string, string> = {
    under_1k: 'Under $1,000',
    '1k_3k': '$1,000 – $3,000',
    '3k_10k': '$3,000 – $10,000',
    '10k_plus': 'Over $10,000',
    undefined: 'Still deciding',
  };
  const timelineMap: Record<string, string> = {
    asap: 'ASAP',
    '1_month': 'About 1 month',
    '2_3_months': '2 to 3 months',
    no_rush: 'No rush',
  };

  // Consolidated into buildPt logic with locale check for simplicity or keep separate
  // Actually I just updated it above for both in a merged way for the PT part but wait, 
  // let me fix the buildEn specifically to match.
  const lines = [
    `Hi Toti, I came from your website.`,
    p.name ? `My name is ${p.name}.` : null,
  ];

  if (p.projectType && p.projectType !== 'not_sure') {
    lines.push(`Project type: ${projectMap[p.projectType] ?? p.projectType}`);
  }
  if (p.budget && p.budget !== 'undefined') {
    lines.push(`Budget: ${budgetMap[p.budget] ?? p.budget}`);
  }
  if (p.timeline && p.timeline !== 'no_rush') {
    lines.push(`Timeline: ${timelineMap[p.timeline] ?? p.timeline}`);
  }
  if (p.message) {
    lines.push(`\nSummary: ${p.message}`);
  }

  return lines.filter(Boolean).join('\n');
}
