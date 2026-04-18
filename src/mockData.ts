import { Case, Service } from './types';

export const aboutInfo = {
  name: 'Toti Cavalcanti',
  title: 'Software Engineer & Systems Architect',
  bio: 'Desenvolvimento de software de alta performance para pequenos negócios e marcas digitais.',
  extendedBio: [
    'Bacharel em Ciência da Computação com foco em arquitetura de sistemas escaláveis.',
    'Especialista em Next.js, Node.js e automações inteligentes com IA.',
    'Foco em entrega prática: sites leves, lojas eficientes e automações que geram resultados reais.',
    'Experiência em transformar processos complexos em fluxos digitais simples e lucrativos.'
  ],
  avatar: 'https://github.com/toticavalcanti/toti-assets/blob/master/toti-studio.png?raw=true',
  email: 'toticavalcanti@gmail.com',
  whatsapp: '5521988714006',
};

export const cases: Case[] = [
  {
    id: '1',
    slug: 'vivaleveportal',
    featured: true,
    name: 'Viva Leve Portal',
    description: 'E-commerce especializado com automação de vendas via WhatsApp.',
    tags: ['E-commerce', 'WhatsApp Automation', 'Next.js'],
    liveUrl: 'https://vivaleveportal.com.br/',
    imagePath: '/assets/cases/vivaleveportal/cover.jpg',
    objective: 'Criar uma operação de vendas robusta e automatizada para o portal Viva Leve.',
    whatWasDone: 'Frontend performante em Next.js, assistente de vendas na página de produto e fluxo de checkout integrado ao WhatsApp.',
    stack: 'Next.js + Tailwind + WhatsApp Automation Engine',
    ctaText: 'Ver operação',
    pillar: 'sites-sistemas',
    status: 'production'
  },
  {
    id: '2',
    slug: 'ze-ramalho',
    featured: true,
    name: 'Site Oficial Zé Ramalho',
    description: 'Site robusto de alta performance com gestão de discografia e área administrativa.',
    tags: ['Production', 'Full-Stack', 'Next.js'],
    liveUrl: 'https://www.zeramalho.com.br',
    imagePath: '/assets/cases/ze-ramalho/cover.jpg',
    objective: 'Interface moderna e rápida para um dos maiores ícones da música brasileira.',
    whatWasDone: 'Sistema completo com Next.js, MongoDB e CMS customizado para gestão de agenda e discografia.',
    stack: 'Next.js + Node.js + MongoDB + TypeScript',
    ctaText: 'Ver site oficial',
    pillar: 'sites-sistemas',
    status: 'production'
  },
  {
    id: '3',
    slug: 'pink-pig-store',
    featured: true,
    name: 'Pink Pig Store',
    description: 'Storefront bilíngue para produtos digitais (Preview).',
    tags: ['Pre-launch', 'Bilingual', 'Next.js'],
    liveUrl: 'https://pink-pig-music-store-space.vercel.app/',
    imagePath: '/assets/cases/pink-pig-store/cover.jpg',
    objective: 'Desenvolver uma loja de produtos digitais com suporte nativo a múltiplos idiomas.',
    whatWasDone: 'Arquitetura bilíngue, vitrine dinâmica e integração com gateways de pagamento.',
    stack: 'Next.js + i18n + Tailwind CSS',
    ctaText: 'Ver preview ao vivo',
    pillar: 'sites-sistemas',
    status: 'preview'
  },
  {
    id: '4',
    slug: 'codigo-fluente',
    featured: false,
    name: 'Código Fluente',
    description: 'Plataforma educacional com conteúdo técnico e laboratório de IA.',
    tags: ['Education', 'Technical Content', 'WordPress'],
    liveUrl: 'https://www.codigofluente.com.br',
    imagePath: '/assets/cases/codigo-fluente/cover.jpg',
    objective: 'Centralizar conhecimento técnico sobre programação e DevOps.',
    whatWasDone: 'Portal educacional completo com base de conhecimento e área de membros.',
    stack: 'WordPress + Custom Themes + PHP',
    ctaText: 'Ver plataforma',
    pillar: 'sites-sistemas',
    status: 'production'
  },
  {
    id: '5',
    slug: 'emagrecer-depois-dos-40',
    featured: false,
    name: 'Emagrecer Depois dos 40',
    description: 'Landing page focada em conversão para infoprodutos.',
    tags: ['Landing Page', 'Sales Flow', 'Lightweight'],
    liveUrl: 'https://emagrecerdepoisdos40.netlify.app/',
    imagePath: '/assets/cases/emagrecer-depois-dos-40/cover.jpg',
    objective: 'Página de vendas de alta conversão para o nicho de saúde.',
    whatWasDone: 'Estrutura persuasiva, carregamento ultra-rápido e focado em mobile.',
    stack: 'HTML5 + CSS3 + Smooth Scroll',
    ctaText: 'Ver landing page',
    pillar: 'sites-sistemas',
    status: 'functional'
  },
  {
    id: '6',
    slug: 'magic-prompts',
    featured: false,
    name: 'Magic Prompts',
    description: 'Galeria dinâmica e vitrine de produtos focados em IA.',
    tags: ['Showcase', 'AI Products', 'Modern UI'],
    liveUrl: 'https://magic-prompts.netlify.app/',
    imagePath: '/assets/cases/magic-prompts/cover.jpg',
    objective: 'Exibir e vender pacotes de prompts inteligentes para geradores de imagem.',
    whatWasDone: 'Interface visual impactante, galeria responsiva e fluxos de checkout simplificados.',
    stack: 'Modern JavaScript + CSS Grid + Flexbox',
    ctaText: 'Ver vitrine',
    pillar: 'sites-sistemas',
    status: 'functional'
  },
  {
    id: '7',
    slug: 'neurozen',
    featured: true,
    name: 'NeuroZen',
    description: 'Landing page com assistente cognitivo via Chat IA.',
    tags: ['AI Assistant', 'Landing Page', 'Smart Chat'],
    liveUrl: 'https://neurozen-book.netlify.app/',
    imagePath: '/assets/cases/neurozen/cover.jpg',
    objective: 'Aumentar a conversão de um livro digital através de um chat inteligente.',
    whatWasDone: 'Integração de LLM para responder dúvidas de leitores em tempo real dentro da página.',
    stack: 'React + Groq + OpenAI API',
    ctaText: 'Ver chat IA',
    pillar: 'ia-automacao',
    status: 'functional'
  },
  {
    id: '8',
    slug: 'powerfit-gym',
    featured: false,
    name: 'PowerFit Gym',
    description: 'Conceito de landing page moderna para academias.',
    tags: ['Concept', 'Design', 'Landing Page'],
    liveUrl: 'https://powerfit-demo.netlify.app/',
    imagePath: '/assets/cases/powerfit-gym/cover.jpg',
    objective: 'Validar visual e fluxos para o segmento fitness.',
    whatWasDone: 'Design moderno, seções de planos e chamadas para ação integradas.',
    stack: 'HTML + Pure CSS + Deployment Automation',
    ctaText: 'Ver conceito',
    pillar: 'sites-sistemas',
    status: 'demo'
  },
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Product Landing Pages',
    icon: 'Target',
    category: 'software',
    featured: true,
    description: 'Páginas criadas para converter. Foco total em um único produto ou serviço, removendo distrações e guiando o cliente para a compra.',
    technologies: ['Next.js', 'Tailwind', 'Framer Motion']
  },
  {
    id: '2',
    title: 'E-commerce Lite / Storefronts',
    icon: 'ShoppingBag',
    category: 'software',
    featured: true,
    description: 'Lojas rápidas e diretas integradas ao WhatsApp. Ideal para quem já vende no Instagram e precisa de um catálogo profissional.',
    technologies: ['Next.js', 'Bilingual Support', 'WhatsApp Sales Engine']
  },
  {
    id: '3',
    title: 'Automação & WhatsApp Sales',
    icon: 'MessageSquare',
    category: 'software',
    featured: true,
    description: 'Criação de fluxos de atendimento e venda assistida. Seu WhatsApp trabalhando 24h para qualificar e fechar vendas.',
    technologies: ['OpenAI', 'Z-API', 'Node.js']
  },
  {
    id: '4',
    title: 'Sistemas Customizados Next.js',
    icon: 'Code2',
    category: 'software',
    featured: true,
    description: 'Soluções sob medida que não cabem em templates prontos. Performance extrema e arquitetura limpa sem bloatware.',
    technologies: ['Next.js', 'Typescript', 'Supabase/MongoDB']
  }
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/toticavalcanti', icon: 'Github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/toticavalcanti', icon: 'Linkedin' },
  { name: 'YouTube', url: 'https://youtube.com/@codigofluente', icon: 'Youtube' },
  { name: 'Instagram', url: 'https://instagram.com/toticavalcanti', icon: 'Instagram' },
];
