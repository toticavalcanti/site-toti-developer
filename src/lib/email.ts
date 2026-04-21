import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface LeadNotificationData {
  name: string;
  email: string;
  whatsapp?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message?: string;
  source: string;
  locale: string;
}

const projectLabels: Record<string, string> = {
  landing: 'Landing Page',
  ecommerce: 'E-commerce',
  automation: 'Automação com IA',
  custom: 'Sistema sob medida',
  not_sure: 'Ainda não sabe',
};

const budgetLabels: Record<string, string> = {
  under_3k: 'Até R$ 3.000',
  '3k_10k': 'R$ 3.000 a R$ 10.000',
  '10k_30k': 'R$ 10.000 a R$ 30.000',
  '30k_plus': 'Acima de R$ 30.000',
  under_1k: 'Under $1,000',
  '1k_3k': '$1,000 – $3,000',
  '3k_10k_usd': '$3,000 – $10,000',
  '10k_plus': 'Over $10,000',
  undefined: 'Ainda estudando',
};

const timelineLabels: Record<string, string> = {
  asap: 'O quanto antes',
  '1_month': '1 mês',
  '2_3_months': '2 a 3 meses',
  no_rush: 'Sem pressa',
};

export async function sendLeadNotification(data: LeadNotificationData) {
  const project = projectLabels[data.projectType] ?? data.projectType;
  const budget = budgetLabels[data.budget] ?? data.budget;
  const timeline = timelineLabels[data.timeline] ?? data.timeline;

  await resend.emails.send({
    // TEMPORÁRIO: usando onboarding@resend.dev enquanto o domínio toticavalcanti.com.br
    // ainda está em verificação no Resend. Trocar para:
    // 'Site Toti <noreply@toticavalcanti.com.br>'
    // assim que o status do domínio no Resend → Domains mostrar "Verified".
    from: 'Site Toti <onboarding@resend.dev>',
    to: ['toticavalcanti@gmail.com', 'toticavalcanti@hotmail.com'],
    subject: `Novo lead: ${data.name} — ${project}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #ededed; border-radius: 12px;">
        <h2 style="margin: 0 0 24px; font-size: 20px; color: #ededed;">Novo lead pelo site</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #a3a3a3; width: 140px; vertical-align: top;">Nome</td>
            <td style="padding: 10px 0; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a3a3a3; vertical-align: top;">E-mail</td>
            <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a></td>
          </tr>
          ${data.whatsapp ? `
          <tr>
            <td style="padding: 10px 0; color: #a3a3a3; vertical-align: top;">WhatsApp</td>
            <td style="padding: 10px 0;"><a href="https://wa.me/${data.whatsapp}" style="color: #0d9488;">${data.whatsapp}</a></td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #a3a3a3; vertical-align: top;">Projeto</td>
            <td style="padding: 10px 0;">${project}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a3a3a3; vertical-align: top;">Orçamento</td>
            <td style="padding: 10px 0;">${budget}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a3a3a3; vertical-align: top;">Prazo</td>
            <td style="padding: 10px 0;">${timeline}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a3a3a3; vertical-align: top;">Origem</td>
            <td style="padding: 10px 0;">${data.source}</td>
          </tr>
          ${data.message ? `
          <tr>
            <td style="padding: 10px 0; color: #a3a3a3; vertical-align: top;">Mensagem</td>
            <td style="padding: 10px 0; white-space: pre-wrap;">${data.message}</td>
          </tr>` : ''}
        </table>

        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #262626; font-size: 12px; color: #737373;">
          toticavalcanti.com.br
        </div>
      </div>
    `,
  });
}
