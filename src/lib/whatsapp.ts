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

  return [
    `Olá Toti, vim pelo site.`,
    p.name ? `Meu nome é ${p.name}.` : null,
    `Tipo de projeto: ${projectMap[p.projectType] ?? p.projectType}`,
    `Orçamento: ${budgetMap[p.budget] ?? p.budget}`,
    `Prazo: ${timelineMap[p.timeline] ?? p.timeline}`,
    p.message ? `\nResumo: ${p.message}` : null,
  ].filter(Boolean).join('\n');
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

  return [
    `Hi Toti, I came from your website.`,
    p.name ? `My name is ${p.name}.` : null,
    `Project type: ${projectMap[p.projectType] ?? p.projectType}`,
    `Budget: ${budgetMap[p.budget] ?? p.budget}`,
    `Timeline: ${timelineMap[p.timeline] ?? p.timeline}`,
    p.message ? `\nSummary: ${p.message}` : null,
  ].filter(Boolean).join('\n');
}
