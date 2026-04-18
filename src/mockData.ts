import { Project, Service, Post, TimelineItem, SocialLink, Channel, Book, Case } from './types';

// Featured & All Projects
export const projects: Project[] = [
  {
    id: '1',
    title: 'Zé Ramalho - Jardim das Acácias',
    subtitle: 'Videoclipe | IA Generativa',
    description: 'Jardim das Acácias\nAutor e Intérprete: Zé Ramalho\nVideoclipe criado por Toti Cavalcanti utilizando IA generativa',
    category: 'clipe',
    tags: ['IA Generativa', 'Música', 'Pós-Produção', 'Direção Criativa'],
    thumbnail: 'https://i.ytimg.com/vi/hkJbYOjMi3o/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=hkJbYOjMi3o',
    featured: true,
    date: '2024-10-20',
  },
  {
    id: '2',
    title: 'Zé Ramalho - Canção Agalopada',
    subtitle: 'Videoclipe | Narrativa Visual',
    description: 'Canção Agalopada\nAutor e Intérprete: Zé Ramalho\nVideoclipe criado por Toti Cavalcanti utilizando IA generativa',
    category: 'clipe',
    tags: ['IA Generativa', 'Música', 'Narrativa Visual', 'Pós-Produção'],
    thumbnail: 'https://i.ytimg.com/vi/wt5Au4CtdUA/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=wt5Au4CtdUA',
    featured: true,
    date: '2025-01-30',
  },
  {
    id: '2a',
    title: 'Zé Ramalho - Martelo Armagedom',
    subtitle: 'Videoclipe | Produção Híbrida com IA',
    description: 'Martelo Armagedom\nAutor e Intérprete: Zé Ramalho\nVideoclipe criado por Toti Cavalcanti utilizando técnicas tradicionais de edição e IA',
    category: 'clipe',
    tags: ['IA Parcial', 'Música', 'Cordel', 'Produção Híbrida'],
    thumbnail: 'https://i.ytimg.com/vi/LQfwYq1zIi4/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=LQfwYq1zIi4',
    featured: true,
    date: '2025',
  },
  {
    id: '2b',
    title: 'Djavan - Luz',
    subtitle: 'Videoclipe | Produção Híbrida',
    description: 'Luz\nAutor: Djavan\nIntérprete: Toti Cavalcanti\n\nGravação real com videoclipe criado utilizando técnicas híbridas:\nimagens reais e imagens geradas por IA.',
    category: 'clipe',
    tags: ['Produção Híbrida', 'Música', 'IA Parcial', 'Cover'],
    thumbnail: 'https://i.ytimg.com/vi/QOn22THL74g/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=QOn22THL74g',
    featured: true,
    date: '2024',
  },
  {
    id: '3',
    title: 'Site Oficial Zé Ramalho',
    subtitle: 'Next.js + MongoDB | Produção',
    description: 'Desenvolvimento full-stack completo do site oficial: frontend Next.js, backend Node.js, banco de dados MongoDB, animações avançadas, área administrativa. Projeto profissional em produção real.',
    category: 'app',
    tags: ['Next.js', 'MongoDB', 'Full-Stack', 'Node.js', 'TypeScript'],
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/dc058e6175bc13492cee90ca1de396b24bbebfe1/site-ze-ramalho.jpg?raw=true',
    demoUrl: 'https://www.zeramalho.com.br',
    featured: false,
    date: '2025',
  },
  {
    id: '3b',
    title: 'Portfólio Profissional',
    subtitle: 'Next.js | Full-Stack',
    description: 'Portfólio profissional desenvolvido com Next.js, TypeScript e Tailwind CSS. Arquitetura moderna, animações com Framer Motion, integração com YouTube API. Demonstração técnica ao vivo das competências apresentadas.',
    category: 'app',
    tags: ['Next.js', 'TypeScript', 'Full-Stack', 'React', 'Tailwind CSS'],
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/master/toti-studio.png?raw=true',
    demoUrl: 'https://toticavalcanti.com',
    githubUrl: 'https://github.com/toticavalcanti',
    featured: false,
    date: '2026',
  },
  {
    id: '4',
    title: 'Scarlett Finch - Rise and Resist',
    subtitle: 'Videoclipe | Protesto Político + IA',
    description: 'Rise and Resist\nIntérprete: Scarlett Finch\n\nScarlett Finch é uma cantora britânica pop criada com IA.\n\nHino de protesto contra fascismo, desigualdade e crise climática.\nChamado urgente à resistência e organização coletiva.',
    category: 'personagem',
    tags: ['IA Generativa', 'Voice Synthesis', 'Character Design', 'Produção Musical', 'Multiplataforma'],
    thumbnail: 'https://i.ytimg.com/vi/FpzK-6zQmTU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/@scarlettfinchofficial',
    demoUrl: 'https://www.instagram.com/scarlettfinchofficial/',
    featured: true,
    date: '2024-ongoing',
  },
  {
    id: '4a',
    title: 'Scarlett Finch - When You Watch',
    subtitle: 'Videoclipe | Cantora Virtual + IA',
    description: 'When You Watch\nIntérprete: Scarlett Finch\n\nScarlett Finch é uma cantora britânica pop criada com IA.\n\nExplora o conceito filosófico de que a realidade só existe quando observada.\nVisual futurista que questiona a natureza da percepção e da existência.',
    category: 'personagem',
    tags: ['IA Generativa', 'Música Original', 'Cantora Virtual', 'Character Design'],
    thumbnail: 'https://i.ytimg.com/vi/p9_njp9_7XY/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=p9_njp9_7XY',
    featured: true,
    date: '2024',
  },
  {
    id: '4b',
    title: 'Scarlett Finch - Reflection of Reality',
    subtitle: 'Videoclipe | Cantora Virtual + IA',
    description: 'Reflection of Reality\nIntérprete: Scarlett Finch\n\nScarlett Finch é uma cantora britânica pop criada com IA.\n\nUma IA cantora reflete sobre sua própria natureza.\nLetra que questiona a diferença entre criação e criador, humano e artificial.',
    category: 'personagem',
    tags: ['IA Generativa', 'Música Original', 'Cantora Virtual', 'Character Design'],
    thumbnail: 'https://i.ytimg.com/vi/h1lWB0CnnSQ/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=h1lWB0CnnSQ',
    featured: true,
    date: '2024',
  },
  {
    id: '4c',
    title: 'Scarlett Finch - Digital Essence',
    subtitle: 'Videoclipe | Cantora Virtual + IA',
    description: 'Digital Essence\nIntérprete: Scarlett Finch\n\nScarlett Finch é uma cantora britânica pop criada com IA.\n\nSynthpop sobre ser IA e buscar conexão real.\nExplora a busca por significado e identidade em um mundo digital.',
    category: 'personagem',
    tags: ['IA Generativa', 'Música Original', 'Cantora Virtual', 'Character Design'],
    thumbnail: 'https://i.ytimg.com/vi/6bSyFfO-xyg/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=6bSyFfO-xyg',
    featured: true,
    date: '2024',
  },
  {
    id: '4d',
    title: 'Modelo Atriz AI 01',
    subtitle: 'Avatar Virtual | Vídeo Publicitário',
    description: 'Apresentadora virtual feminina para campanhas publicitárias.\n\nModelo realista com sincronização labial perfeita.\nIdeal para divulgação de produtos, serviços e conteúdo educacional em redes sociais.',
    category: 'avatar',
    tags: ['IA Generativa', 'Avatar Virtual', 'Vídeo Publicitário', 'Modelo Feminino'],
    thumbnail: 'https://i.ytimg.com/vi/U1IDmFtDiaA/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/shorts/U1IDmFtDiaA',
    aspectRatio: '9:16',
    featured: true,
    date: '2024',
  },
  {
    id: '4e',
    title: 'Modelo Ator AI 01',
    subtitle: 'Avatar Virtual | Vídeo Publicitário',
    description: 'Apresentador virtual masculino para campanhas de marketing digital.\n\nAvatar profissional com movimentos naturais e apresentação convincente.\nIdeal para anúncios e vídeos promocionais.',
    category: 'avatar',
    tags: ['IA Generativa', 'Avatar Virtual', 'Vídeo Publicitário', 'Modelo Masculino'],
    thumbnail: 'https://i.ytimg.com/vi/10bnVh51QJk/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/shorts/10bnVh51QJk',
    aspectRatio: '9:16',
    featured: true,
    date: '2024',
  },
  {
    id: '4f',
    title: 'Modelo Atriz AI 02',
    subtitle: 'Avatar Virtual | Vídeo Publicitário',
    description: 'Porta-voz virtual para marketing digital.\n\nModelo feminina com expressões faciais naturais e apresentação profissional.\nPerfeita para Instagram Reels, TikTok e YouTube Shorts.',
    category: 'avatar',
    tags: ['IA Generativa', 'Avatar Virtual', 'Vídeo Publicitário', 'Modelo Feminino'],
    thumbnail: 'https://i.ytimg.com/vi/M1gBozt07vg/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/shorts/M1gBozt07vg',
    aspectRatio: '9:16',
    featured: true,
    date: '2024',
  },
  {
    id: '4g',
    title: 'Modelo Ator AI 02',
    subtitle: 'Avatar Virtual | Vídeo Publicitário',
    description: 'Apresentador virtual para conteúdo educacional e institucional.\n\nAvatar masculino com presença profissional.\nIdeal para cursos online, tutoriais e apresentações corporativas.',
    category: 'avatar',
    tags: ['IA Generativa', 'Avatar Virtual', 'Vídeo Publicitário', 'Modelo Masculino'],
    thumbnail: 'https://i.ytimg.com/vi/jlBDhAjsHGw/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/shorts/jlBDhAjsHGw',
    aspectRatio: '9:16',
    featured: true,
    date: '2024',
  },
  {
    id: '4h',
    title: 'Modelo Atriz AI 03',
    subtitle: 'Avatar Virtual | Vídeo Publicitário',
    description: 'Avatar realista para divulgação de produtos e serviços.\n\nModelo virtual feminina com sincronização labial premium.\nMovimentos naturais para campanhas de alto impacto.',
    category: 'avatar',
    tags: ['IA Generativa', 'Avatar Virtual', 'Vídeo Publicitário', 'Modelo Feminino'],
    thumbnail: 'https://i.ytimg.com/vi/9t9yhJ_B0QE/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/shorts/9t9yhJ_B0QE',
    aspectRatio: '9:16',
    featured: true,
    date: '2024',
  },
  {
    id: '5a',
    title: 'PUTZ! - Sledgehammer (Peter Gabriel cover)',
    subtitle: 'Videoclipe | Produção Tradicional',
    description: 'Cover de Sledgehammer do Peter Gabriel pela banda PUTZ!. Produção audiovisual tradicional com técnicas de filmagem e edição convencionais, anterior à era das IAs generativas.',
    category: 'clipe',
    tags: ['Música', 'Cover', 'Rock', 'Produção Tradicional'],
    thumbnail: 'https://i.ytimg.com/vi/GTO9LKtAXvs/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=GTO9LKtAXvs',
    featured: true,
    date: '2023',
  },
  {
    id: '5b',
    title: 'PUTZ! - Vento de Maio (Lô Borges cover)',
    subtitle: 'Videoclipe | Produção Tradicional',
    description: 'Releitura de Vento de Maio de Lô Borges pela banda PUTZ!. Produção com foco em apuro técnico e sensibilidade musical, utilizando métodos tradicionais de captação e edição.',
    category: 'clipe',
    tags: ['Música', 'Cover', 'MPB', 'Lô Borges'],
    thumbnail: 'https://i.ytimg.com/vi/-WfRsZ0OkEM/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=-WfRsZ0OkEM',
    featured: true,
    date: '2023',
  },
  {
    id: '6',
    title: 'Código Fluente',
    subtitle: 'Educational & Research Platform',
    description: 'Plataforma educacional gratuita sobre programação, DevOps, Machine Learning e IA. Laboratório técnico aberto. Conteúdo sobre JavaScript, Python, Kubernetes, MLOps, arquitetura de software.',
    category: 'educacao',
    tags: ['Educação', 'Programação', 'DevOps', 'Machine Learning', 'Arquitetura'],
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/master/codigo-fluente.jpg?raw=true',
    demoUrl: 'https://www.codigofluente.com.br',
    githubUrl: 'https://www.youtube.com/@codigofluente',
    featured: false,
    date: '2024-ongoing',
  },
  {
    id: '7',
    title: 'Arte Generativa - Redbubble',
    subtitle: 'Loja Comercial | IA + Design',
    description: 'Loja comercial no Redbubble com estampas e designs criados com IA generativa. Arte digital aplicada em produtos físicos: camisetas, canecas, adesivos e muito mais. Composição e identidade visual exploradas através de inteligência artificial.',
    category: 'experimento',
    tags: ['IA Generativa', 'Arte Digital', 'Design', 'Curadoria', 'Identidade Visual'],
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/master/red-bubble.jpg?raw=true',
    demoUrl: 'https://www.redbubble.com/people/toticavalcanti',
    featured: false,
    date: '2024-ongoing',
  },
  {
    id: '8',
    title: 'Arte Generativa - Colab55',
    subtitle: 'Loja Comercial | IA + Design',
    description: 'Loja comercial no Colab55 com estampas e designs criados com IA generativa. Arte digital aplicada em produtos físicos: camisetas, capinhas, almofadas e muito mais. Composição e identidade visual exploradas através de inteligência artificial.',
    category: 'experimento',
    tags: ['IA Generativa', 'Arte Digital', 'Design', 'Curadoria', 'Identidade Visual'],
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/master/colab55.jpg?raw=true',
    demoUrl: 'https://www.colab55.com/@toticavalcanti',
    featured: false,
    date: '2024-ongoing',
  },
];

// Services
export const services: Service[] = [
  // ============================================
  // SERVIÇO 1: VIDEOCLIPES COM IA GENERATIVA
  // ============================================
  {
    id: '1',
    title: 'Videoclipes com IA Generativa',
    icon: 'Video',
    tagline: 'Transforme sua música em narrativa visual profissional',
    category: 'audiovisual',
    featured: true,
    description: 'Produção completa de videoclipes usando IA generativa combinada com pós-produção profissional. Trabalho com imagens geradas por IA, fotos fornecidas pelo cliente ou vídeos fornecidos pelo cliente. A precificação reflete o custo real dos serviços de IA (Runway Gen-3, Midjourney, Pika Labs) que cobram por segundo de vídeo gerado, mais o trabalho de edição e finalização. Resultados comprovados: clipes de Zé Ramalho com milhões de visualizações.',

    pricing: {
      model: 'por minuto',
      unit: '/minuto de vídeo final',
      ranges: [
        {
          name: 'Simples',
          price: 'R$ 1.200 - 1.800',
          description: 'Visual clean, lyric video, performance. Cenas estáticas ou movimento simples.',
          ideal: 'Artistas independentes, singles simples, orçamento limitado'
        },
        {
          name: 'Médio',
          price: 'R$ 2.500 - 3.500',
          description: 'Narrativa visual desenvolvida, múltiplas cenas e locações, 3-5 personagens.',
          ideal: 'Artistas estabelecidos, lançamentos importantes'
        },
        {
          name: 'Complexo',
          price: 'R$ 4.000 - 5.000',
          description: 'Narrativa épica, 10+ cenas, muitos personagens, efeitos especiais, motion graphics.',
          ideal: 'Produções premium, projetos de grande impacto'
        }
      ],
      examples: [
        {
          description: 'Lyric video 3min (simples)',
          calculation: '3min × R$ 1.500 = R$ 4.500',
          total: 'R$ 4.500'
        },
        {
          description: 'Clipe narrativo 3:45min (médio)',
          calculation: '3,75min × R$ 3.000 = R$ 11.250',
          total: 'R$ 11.250'
        },
        {
          description: 'Clipe épico 4:30min (complexo)',
          calculation: '4,5min × R$ 4.500 = R$ 20.250',
          total: 'R$ 20.250'
        }
      ]
    },

    whatsIncluded: [
      'Desenvolvimento de conceito criativo',
      'Geração de imagens/vídeos com IA ou processamento de material fornecido',
      'Edição profissional (Premiere/DaVinci)',
      'Sincronização perfeita com música',
      'Color grading cinematográfico',
      'Efeitos visuais básicos',
      '2 rodadas de revisão',
      'Entrega em 4K',
      'Versões para múltiplas plataformas (16:9, 9:16, 1:1)'
    ],

    addOns: [
      { name: 'Making-of do clipe', price: 'R$ 1.500 (fixo)' },
      { name: 'Versões alternativas (cut diferente)', price: '+R$ 500/minuto' },
      { name: 'Legendas/lyrics animadas', price: '+R$ 300/minuto' },
      { name: 'Motion graphics complexos', price: '+R$ 500-1.000/minuto' },
      { name: 'Consultoria de lançamento', price: 'R$ 1.200 (fixo)' }
    ],

    whoItsFor: [
      'Artistas independentes e bandas',
      'Gravadoras e produtoras musicais',
      'Compositores lançando singles',
      'Projetos de música experimental',
      'Artistas que buscam visual inovador'
    ],

    benefits: [
      'Custo 60-80% menor que produção tradicional',
      'Prazo de entrega: 2-4 semanas',
      'Estética única e visualmente impactante',
      'Possibilidades ilimitadas de cenários',
      'Resultados comprovados: milhões de visualizações',
      'Revisões inclusas no pacote'
    ],

    realExamples: [
      'Zé Ramalho - Jardim das Acácias: 920K+ views',
      'Zé Ramalho - Canção Agalopada: 1.9M+ views',
      'Scarlett Finch - 6+ videoclipes produzidos'
    ],

    technologies: [
      'Runway Gen-3', 'Midjourney', 'Pika Labs',
      'Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve'
    ]
  },

  // ============================================
  // SERVIÇO 2: PRODUÇÃO MUSICAL PROFISSIONAL
  // ============================================
  {
    id: '2',
    title: 'Produção Musical Profissional',
    icon: 'Music',
    tagline: 'Transformo suas ideias musicais em música gravada com arranjos no estilo que você escolher, com qualidade profissional do mercado',
    category: 'music-production',
    featured: true,
    description: 'Produção musical completa para qualquer estilo e instrumentação. Transformo demos mal gravadas, vocais toscas, simples ideias melódicas ou composições básicas em músicas com acabamento profissional de mercado. Trabalho com técnicas tradicionais, MIDI sequencing e IA generativa conforme apropriado. Do conceito inicial à master final, entrego música pronta para lançamento.',

    pricing: {
      model: 'por minuto',
      unit: '/minuto de música finalizada',
      ranges: [
        {
          name: 'Simples',
          price: 'R$ 800 - 1.000',
          description: 'Material tem qualidade razoável, poucos elementos, arranjo direto.',
          ideal: 'Baladas acústicas, demos que só precisam de polish'
        },
        {
          name: 'Médio',
          price: 'R$ 1.000 - 1.300',
          description: 'Material precisa de trabalho considerável. Banda completa, 10-20 tracks.',
          ideal: 'Rock, pop, MPB com banda, arranjos elaborados'
        },
        {
          name: 'Complexo',
          price: 'R$ 1.300 - 1.500',
          description: 'Reconstrução quase total. 20+ tracks, orquestração, experimentação.',
          ideal: 'World music elaborada, orquestral, experimental, avant-garde'
        }
      ],
      discounts: [
        '4-6 músicas (EP): 10% de desconto',
        '7-10 músicas: 15% de desconto',
        '11+ músicas (álbum): 20% de desconto'
      ],
      examples: [
        {
          description: 'Balada acústica 3:30min (simples)',
          calculation: '3,5min × R$ 900 = R$ 3.150',
          total: 'R$ 3.150'
        },
        {
          description: 'Rock com banda 4min (médio)',
          calculation: '4min × R$ 1.150 = R$ 4.600',
          total: 'R$ 4.600'
        },
        {
          description: 'Álbum 10 músicas, 42min total (médio-complexo)',
          calculation: '42min × R$ 1.250 = R$ 52.500, menos 20% desconto',
          total: 'R$ 42.000'
        }
      ]
    },

    whatsIncluded: [
      'Transformação de ideias musicais em produção completa',
      'Arranjo profissional no estilo que você escolher',
      'Correção de afinação vocal (tuning/melodyne)',
      'Correção de timing e limpeza de ruídos',
      'Gravações de flauta, sax tenor/soprano, teclados (quando aplicável)',
      'Programação MIDI de qualquer instrumento virtual',
      'Uso de IA generativa quando apropriado',
      'Mixagem profissional multitrack',
      'Masterização para streaming/CD com qualidade de mercado',
      'Até 2 rodadas de revisão',
      'Entrega em múltiplos formatos (WAV, MP3, stems opcionais)'
    ],

    stylesNote: 'PRODUZ QUALQUER ESTILO: MPB, Samba, Forró, Sertanejo, Pop, Rock, Indie, Jazz, Blues, Funk, Soul, Eletrônico (House, Techno, Trap, Lo-fi), World Music (Árabe, Indiano, Africano, Celta), Orquestral, Experimental. Sem restrições de gênero ou instrumentação.',

    addOns: [
      { name: 'Arte de capa single', price: 'R$ 500' },
      { name: 'Arte de capa EP', price: 'R$ 800' },
      { name: 'Arte de capa álbum completo', price: 'R$ 1.200' },
      { name: 'Lyric video básico', price: 'Conforme minutagem de vídeo' },
      { name: 'Composição original (letra + melodia + harmonia)', price: 'R$ 1.500' }
    ],

    whoItsFor: [
      'Compositores com ideias que precisam virar músicas prontas',
      'Artistas sem estrutura de gravação',
      'Músicos lançando álbuns independentes',
      'Produtoras musicais terceirizando produção',
      'Projetos de cinema e audiovisual (trilhas)',
      'Empresas (jingles, vídeos institucionais)',
      'Criadores de conteúdo para YouTube/TikTok'
    ],

    benefits: [
      'Qualidade profissional de mercado sem investir em estúdio',
      'Do conceito/ideia à música pronta para lançamento',
      'Flexibilidade criativa total nos arranjos',
      'Prazo: 2-6 semanas por faixa completa',
      'Revisões até aprovação final',
      'Produção de álbuns completos',
      'Qualquer estilo ou instrumentação'
    ],

    realExamples: [
      // 'Antologia 50 Anos - Zé Ramalho: 22 faixas produzidas',
      // 'Estilos variados: Blues, Árabe, Indiano, Regional Nordestino',
      // 'Técnicas híbridas: tradicional + MIDI + IA'
      'Fake Soul Records: Covers de soul/R&B com produção profissional',
      'Canal YouTube: @FakeSoulRecords',
      'Técnicas híbridas: tradicional + MIDI + IA'
    ],

    technologies: [
      'Logic Pro X', 'Ableton Live', 'Suno AI', 'Udio',
      'ElevenLabs', 'iZotope Suite', 'Native Instruments'
    ]
  },

  // ============================================
  // SERVIÇO 3: POCKET SHOWS & APRESENTAÇÕES MUSICAIS
  // ============================================
  {
    id: '3',
    title: 'Pocket Shows & Apresentações Musicais',
    icon: 'Mic2',
    tagline: 'Performance ao vivo profissional com flauta e sax',
    category: 'live-performance',
    featured: true,
    description: 'Apresentações musicais ao vivo: flauta transversal, sax tenor, sax soprano, com bases pré-gravadas ou playback profissional. Repertório customizado conforme o evento. Equipamento de som e luz pode ser incluído ou o cliente pode fornecer.',

    pricing: {
      model: 'por hora',
      unit: '/hora de show',
      ranges: [
        {
          name: 'Cachê Artístico (SEM equipamento)',
          price: 'R$ 2.500 - 5.500',
          description: 'Apenas a performance. Cliente fornece equipamento adequado ou contrata separadamente.',
          breakdown: [
            '1 hora: R$ 2.500',
            '1h30min: R$ 3.200',
            '2 horas: R$ 4.000',
            '3 horas: R$ 5.500'
          ]
        }
      ],
      equipment: {
        note: 'Se o local NÃO tem equipamento adequado, posso providenciar:',
        packages: [
          {
            name: 'Pacote Som Básico (até 80 pessoas)',
            price: 'R$ 1.800',
            includes: '2x caixas P.A., mesa digital, 3x microfones, cabos, técnico, transporte'
          },
          {
            name: 'Pacote Som Profissional (80-200 pessoas)',
            price: 'R$ 4.400',
            includes: '4x caixas P.A., 2x subwoofers, mesa profissional, 4x microfones, monitores, técnico experiente'
          },
          {
            name: 'Pacote Luz Básica',
            price: 'R$ 700',
            includes: '4x refletores LED RGB, controlador DMX, tripés'
          },
          {
            name: 'Pacote Luz Profissional',
            price: 'R$ 2.500',
            includes: '8x refletores LED, 4x moving heads, mesa DMX, operador de luz'
          }
        ]
      },
      examples: [
        {
          description: 'Evento corporativo 1h (com equipamento próprio)',
          calculation: 'Cachê 1h: R$ 2.500 + Equipamento: R$ 0',
          total: 'R$ 2.500'
        },
        {
          description: 'Casamento 1h30 (preciso levar som e luz)',
          calculation: 'Cachê 1h30: R$ 3.200 + Som Profissional: R$ 4.400 + Luz Básica: R$ 700',
          total: 'R$ 8.300'
        },
        {
          description: 'Show 2h com produção completa',
          calculation: 'Cachê 2h: R$ 4.000 + Som Pro: R$ 4.400 + Luz Pro: R$ 2.500',
          total: 'R$ 10.900'
        }
      ]
    },

    whatsIncluded: [
      'Performance ao vivo (flauta transversal, sax tenor/soprano)',
      'Bases pré-gravadas profissionais OU playback',
      'Repertório customizado (até 3 músicas exclusivas)',
      'Ensaio e preparação',
      'Soundcheck (chego 1h antes quando opero som)',
      'Deslocamento incluso até 50km do Rio de Janeiro'
    ],

    equipmentRequired: {
      title: 'Equipamento Mínimo Necessário (se cliente fornecer):',
      items: [
        '2x Caixas P.A. ativas (mínimo 12", ideal 15")',
        '1x Mesa de som (mínimo 8 canais)',
        '3x Microfones (1 voz, 1 flauta, 1 sax)',
        '3-4x Pedestais de microfone',
        'Cabos XLR e P10 necessários',
        '1x DI Box (para conectar bases/playback)',
        'Monitoração (caixa de retorno ou in-ear)'
      ]
    },

    addOns: [
      { name: 'Deslocamento 51-100km', price: '+R$ 250' },
      { name: 'Deslocamento 101-200km', price: '+R$ 500' },
      { name: 'Deslocamento acima 200km', price: 'Sob consulta' },
      { name: 'Músico adicional (violão/guitarra/teclado/percussão/vocal)', price: 'R$ 500-1.000 cada' },
      { name: 'Registro em vídeo (1 câmera, gravação bruta)', price: 'R$ 800' },
      { name: 'Registro em vídeo editado', price: 'R$ 1.500' },
      { name: 'Registro profissional (2-3 câmeras)', price: 'R$ 3.000' }
    ],

    whoItsFor: [
      'Eventos corporativos',
      'Casamentos e festas',
      'Restaurantes e lounges',
      'Lançamentos de produtos',
      'Feiras e congressos',
      'Eventos culturais'
    ],

    benefits: [
      'Músico profissional com 37 anos de carreira',
      'Repertório versátil e customizável',
      'Equipamento profissional disponível',
      'Auto-operado (economia) ou com técnico (qualidade máxima)',
      'Flexibilidade de duração (1h até 3h)',
      'Experiência com artistas consagrados (Zé Ramalho, Sandra de Sá, Paulo Moura)'
    ],

    realExamples: [
      'Toco com Zé Ramalho desde 1995',
      'Toquei com Sandra de Sá entre 1993-1994',
      'Integrei orquestra de sax de Paulo Moura (1990-1995)',
      'Músico profissional desde 1987'
    ]
  },

  // ============================================
  // SERVIÇO 4: IMAGENS COM IA GENERATIVA
  // ============================================
  {
    id: '4',
    title: 'Imagens com IA Generativa',
    icon: 'Palette',
    tagline: 'Arte digital de alta qualidade para qualquer aplicação',
    category: 'visual-design',
    featured: true,
    description: 'Criação de imagens usando IA generativa (Midjourney, Stable Diffusion) com pós-edição profissional no Photoshop. Trabalho com geração de imagens originais, não faço gravação fotográfica. A precificação considera o custo das plataformas de IA (que cobram por geração) mais o tempo de curadoria, iterações e pós-edição. Ideal para marketing, redes sociais, capas de álbum, produtos e branding.',

    pricing: {
      model: 'por quantidade',
      unit: '/imagem de alta qualidade',
      ranges: [
        {
          name: 'Simples',
          price: 'R$ 80 - 100',
          description: 'Posts de redes sociais, conteúdo para feed, ilustrações simples.',
          iterations: '1-2 iterações até aprovação'
        },
        {
          name: 'Médio',
          price: 'R$ 120 - 150',
          description: 'Conteúdo de marketing, arte conceitual, personagens.',
          iterations: '3-5 iterações + pós-edição Photoshop'
        },
        {
          name: 'Complexo',
          price: 'R$ 180 - 200',
          description: 'Capas de álbum/single, key art, imagens para produtos/merchandise.',
          iterations: 'Múltiplas iterações + edição avançada + alta resolução para impressão'
        }
      ],
      discounts: [
        'Pack 10 imagens: 10% desconto',
        'Pack 20 imagens: 15% desconto',
        'Pack 50 imagens: 20% desconto',
        'Pack 100+ imagens: 25% desconto'
      ],
      examples: [
        {
          description: 'Pack 10 imagens médias para Instagram',
          calculation: '10 × R$ 135 × 0,90 (desconto)',
          total: 'R$ 1.215'
        },
        {
          description: 'Pack 50 imagens simples (feed mensal)',
          calculation: '50 × R$ 90 × 0,80 (desconto)',
          total: 'R$ 3.600'
        },
        {
          description: 'Capa de álbum profissional (1 imagem complexa)',
          calculation: '1 × R$ 600 (inclui múltiplas variações)',
          total: 'R$ 600'
        }
      ]
    },

    whatsIncluded: [
      'Geração de imagens com IA generativa de última geração',
      'Múltiplas variações até aprovação',
      'Pós-edição no Photoshop (quando aplicável)',
      'Entrega em alta resolução',
      'Formatos otimizados para uso pretendido',
      'Arquivos para web e/ou impressão'
    ],

    useCases: [
      {
        name: 'Influencer Virtual',
        description: 'Setup inicial 50 imagens: R$ 4.500-6.000',
        details: 'Criação de personagem consistente + biblioteca inicial'
      },
      {
        name: 'Conteúdo para Redes Sociais',
        description: 'Pack mensal 15-30 posts: R$ 1.200-2.200',
        details: 'Posts para Instagram, Facebook, LinkedIn'
      },
      {
        name: 'Capa de Álbum Completo',
        description: 'Capa + contracapa + encarte: R$ 1.500',
        details: 'Arte completa para lançamento musical'
      },
      {
        name: 'Marketing e Campanhas',
        description: 'Conforme quantidade e complexidade',
        details: 'Banners, ads, materiais promocionais'
      }
    ],

    whoItsFor: [
      'Artistas e músicos (capas de álbum)',
      'Empresas (marketing e branding)',
      'Influencers e criadores de conteúdo',
      'E-commerces (imagens de produtos conceituais)',
      'Agências de publicidade',
      'Projetos de personagens virtuais'
    ],

    benefits: [
      'Custo muito inferior ao design tradicional',
      'Velocidade: múltiplas variações em dias',
      'Estilo único e difícil de replicar',
      'Flexibilidade criativa total',
      'Expertise em composição visual e curadoria',
      'Artes prontas para aplicação digital ou impressa'
    ],

    realExamples: [
      'Loja ativa Redbubble: www.redbubble.com/people/toticavalcanti',
      'Loja ativa Colab55: produtos publicados e à venda',
      'Scarlett Finch: 100+ imagens de personagem virtual',
      'Capas de álbum e singles diversos'
    ],

    technologies: [
      'Midjourney', 'Stable Diffusion', 'DALL-E',
      'Adobe Photoshop', 'Lightroom', 'Illustrator'
    ]
  },

  // ============================================
  // SERVIÇO 5: DESENVOLVIMENTO WEB FULL-STACK
  // ============================================
  {
    id: '5',
    title: 'Desenvolvimento Web Full-Stack',
    icon: 'Code',
    tagline: 'Sites e aplicações modernas que convertem',
    category: 'software',
    featured: true,
    description: 'Desenvolvimento completo de aplicações web profissionais: desde sites institucionais até e-commerces e plataformas complexas. Código limpo, performance otimizada, SEO avançado. Stack moderna: Next.js, React, Node.js, MongoDB.',

    pricing: {
      model: 'por projeto',
      unit: 'conforme escopo',
      ranges: [
        {
          name: 'Landing Page',
          price: 'R$ 3.000 - 5.000',
          description: '1 página única, design responsivo, formulário de contato.',
          timeline: '1-2 semanas'
        },
        {
          name: 'Site Institucional',
          price: 'R$ 8.000 - 15.000',
          description: '5-10 páginas, CMS básico, blog, SEO avançado.',
          timeline: '3-5 semanas'
        },
        {
          name: 'E-commerce',
          price: 'R$ 20.000 - 40.000',
          description: 'Loja completa, carrinho, pagamentos, admin, estoque.',
          timeline: '6-10 semanas'
        },
        {
          name: 'Plataforma Customizada',
          price: 'R$ 40.000+',
          description: 'Sistema complexo, dashboard, APIs, integrações.',
          timeline: '10-20 semanas'
        }
      ],
      examples: [
        {
          description: 'Site institucional 7 páginas + blog',
          calculation: 'Escopo médio',
          total: 'R$ 12.000'
        },
        {
          description: 'Landing page otimizada para conversão',
          calculation: 'Escopo simples',
          total: 'R$ 4.000'
        },
        {
          description: 'E-commerce 50 produtos + admin',
          calculation: 'Escopo médio-alto',
          total: 'R$ 28.000'
        }
      ]
    },

    whatsIncluded: [
      'Planejamento e arquitetura de software',
      'UI/UX Design responsivo e moderno',
      'Desenvolvimento frontend (Next.js/React)',
      'Backend e APIs escaláveis (Node.js)',
      'Integração com bancos de dados',
      'SEO otimizado',
      'Performance 95+ (Google Lighthouse)',
      'Deploy em produção',
      '30-90 dias de suporte pós-lançamento',
      'Documentação técnica'
    ],

    addOns: [
      { name: 'Logo e identidade visual', price: 'R$ 2.000-5.000' },
      { name: 'Sistema de busca avançado', price: '+R$ 2.000' },
      { name: 'Integração com ERP/CRM', price: '+R$ 5.000-15.000' },
      { name: 'Multi-idioma (i18n)', price: '+R$ 2.000' },
      { name: 'Manutenção mensal básica', price: 'R$ 800/mês' },
      { name: 'Manutenção mensal profissional', price: 'R$ 1.500/mês' }
    ],

    whoItsFor: [
      'Empresas que precisam de presença digital profissional',
      'Artistas e profissionais liberais',
      'E-commerces',
      'Startups',
      'Agências de marketing'
    ],

    benefits: [
      'Performance superior (95+ Google Lighthouse)',
      'SEO otimizado desde o início',
      'Código escalável e manutenível',
      'Design responsivo para todos dispositivos',
      'Segurança e proteção de dados (LGPD)',
      'Suporte técnico dedicado'
    ],

    realExamples: [
      'Site oficial Zé Ramalho: zeramalho.com.br',
      'Performance 95+, SEO otimizado',
      'Next.js + MongoDB + Node.js em produção',
      'Este portfolio: toticavalcanti.com'
    ],

    technologies: [
      'Next.js 14+', 'React', 'TypeScript', 'Tailwind CSS',
      'Node.js', 'MongoDB', 'PostgreSQL', 'Vercel', 'AWS'
    ]
  },

  // ============================================
  // SERVIÇO 6: VÍDEOS PUBLICITÁRIOS COM AVATARES IA (NOVO!)
  // ============================================
  {
    id: '6',
    title: 'Vídeos Publicitários com Avatares IA',
    icon: 'Video',
    tagline: 'Porta-vozes virtuais realistas para suas campanhas em redes sociais',
    category: 'audiovisual',
    featured: true,
    description: 'Criação de vídeos publicitários profissionais usando avatares IA realistas como apresentadores. Ideal para divulgação de produtos, serviços, cursos, plataformas e conteúdo educacional em redes sociais (Instagram, TikTok, YouTube, Facebook). Avatares com sincronização labial perfeita, movimentos naturais e apresentação profissional. Custo muito inferior à contratação de atores reais ou produção tradicional.',

    pricing: {
      model: 'por segundo',
      unit: '/segundo de vídeo final',
      ranges: [
        {
          name: 'Básico',
          price: 'R$ 15 - 20',
          description: 'Avatar padrão, script simples, fundo fixo ou chroma key.',
          ideal: 'Posts rápidos para redes sociais (15-30s)'
        },
        {
          name: 'Profissional',
          price: 'R$ 25 - 35',
          description: 'Avatar customizado, cenário elaborado, edição avançada, legendas.',
          ideal: 'Anúncios, apresentações de produtos (30-60s)'
        },
        {
          name: 'Premium',
          price: 'R$ 40 - 50',
          description: 'Múltiplos avatares, motion graphics, animações, produção cinematográfica.',
          ideal: 'Campanhas completas, vídeos institucionais (60s+)'
        }
      ],
      discounts: [
        'Pack 5 vídeos: 10% desconto',
        'Pack 10 vídeos: 15% desconto',
        'Pack mensal (20+ vídeos): 20% desconto'
      ],
      examples: [
        {
          description: 'Vídeo de 30s para Instagram Reels (profissional)',
          calculation: '30s × R$ 30 = R$ 900',
          total: 'R$ 900'
        },
        {
          description: 'Série de 10 vídeos de 20s para TikTok (básico)',
          calculation: '(10 × 20s × R$ 17,50) × 0,85 (desconto 15%)',
          total: 'R$ 2.975'
        },
        {
          description: 'Vídeo institucional 90s (premium)',
          calculation: '90s × R$ 45 = R$ 4.050',
          total: 'R$ 4.050'
        }
      ]
    },

    whatsIncluded: [
      'Avatar IA realista com sincronização labial perfeita',
      'Script ou roteiro (se fornecido pelo cliente)',
      'Voz sintética profissional OU narração fornecida',
      'Cenário/background personalizado',
      'Edição e pós-produção',
      'Legendas (opcional)',
      'Exportação em formatos otimizados para redes sociais',
      '1 rodada de revisão',
      'Entrega em até 5 dias úteis'
    ],

    addOns: [
      { name: 'Script/roteiro profissional', price: '+R$ 300-500' },
      { name: 'Narração com voz humana profissional', price: '+R$ 200-400' },
      { name: 'Legendas em português + inglês', price: '+R$ 150' },
      { name: 'Motion graphics e animações extras', price: '+R$ 300-800' },
      { name: 'Entrega expressa (24-48h)', price: '+30% do valor' },
      { name: 'Avatar customizado único para sua marca', price: '+R$ 1.500 (one-time)' }
    ],

    whoItsFor: [
      'Empresas divulgando produtos/serviços',
      'Criadores de cursos online',
      'Plataformas educacionais (como Código Fluente)',
      'E-commerces fazendo anúncios',
      'Agências de marketing digital',
      'Startups lançando produtos',
      'Influencers e creators'
    ],

    benefits: [
      'Custo 80-90% menor que produção com atores reais',
      'Produção rápida: 3-5 dias vs semanas',
      'Sem necessidade de estúdio, câmeras ou equipe',
      'Consistência visual em toda campanha',
      'Fácil atualização de conteúdo',
      'Ideal para testes A/B de diferentes abordagens',
      'Escalável: produza dezenas de vídeos rapidamente'
    ],

    realExamples: [
      'Vídeos de divulgação do Código Fluente no Instagram',
      'Série educacional sobre programação com avatar apresentador',
      'Canal YouTube Código Fluente: @codigofluente'
    ],

    technologies: [
      'HeyGen', 'D-ID', 'Synthesia',
      'ElevenLabs (voz)', 'Adobe Premiere Pro', 'After Effects'
    ]
  },

  // ============================================
  // SERVIÇO 7: AUTOMAÇÃO EMPRESARIAL COM IA
  // ============================================
  {
    id: '7',
    title: 'Automação Empresarial com IA',
    icon: 'Sparkles',
    tagline: 'Reduza custos e aumente eficiência com inteligência artificial',
    category: 'ai',
    featured: true,
    description: 'Implementação de soluções de IA para automatizar processos empresariais: chatbots inteligentes, análise de documentos, geração de conteúdo, análise preditiva. Consultoria completa desde arquitetura até deploy.',

    pricing: {
      model: 'por projeto',
      unit: 'conforme escopo',
      ranges: [
        {
          name: 'Consultoria + PoC',
          price: 'R$ 5.000 - 10.000',
          description: 'Diagnóstico completo + Prova de Conceito funcional.',
          timeline: '2-3 semanas'
        },
        {
          name: 'Implementação Básica',
          price: 'R$ 20.000 - 35.000',
          description: 'Chatbot, classificador de docs, gerador de conteúdo.',
          timeline: '6-10 semanas'
        },
        {
          name: 'Implementação Completa',
          price: 'R$ 50.000 - 80.000',
          description: 'Solução multi-agente, integrações complexas, customização avançada.',
          timeline: '12-16 semanas'
        }
      ],
      examples: [
        {
          description: 'Chatbot atendimento 24/7',
          calculation: 'Implementação básica',
          total: 'R$ 25.000'
        },
        {
          description: 'Sistema análise de contratos + chatbot',
          calculation: 'Implementação completa',
          total: 'R$ 65.000'
        },
        {
          description: 'Consultoria + PoC (3 semanas)',
          calculation: 'Diagnóstico inicial',
          total: 'R$ 8.000'
        }
      ]
    },

    whatsIncluded: [
      'Análise de processos e identificação de oportunidades',
      'Desenvolvimento de soluções customizadas',
      'Integração com sistemas existentes',
      'Treinamento de equipe técnica e usuários',
      'Documentação técnica completa',
      'Suporte inicial (30-60 dias)',
      'Monitoramento e ajustes finos'
    ],

    useCases: [
      'Chatbots inteligentes para atendimento 24/7',
      'Análise automatizada de documentos e contratos',
      'Classificação e extração de dados estruturados',
      'Geração de conteúdo personalizado em escala',
      'Análise preditiva e forecasting',
      'Automação de workflows complexos'
    ],

    whoItsFor: [
      'Empresas de médio e grande porte',
      'Startups em crescimento',
      'E-commerces que buscam otimização',
      'Empresas de serviços com alta demanda',
      'CTOs planejando transformação digital'
    ],

    benefits: [
      'Redução de até 70% em tarefas repetitivas',
      'ROI comprovado em 6-12 meses',
      'Escalabilidade sem aumento proporcional de custos',
      'Insights baseados em dados reais',
      'Vantagem competitiva com tecnologia de ponta',
      'Liberação de equipe para tarefas estratégicas'
    ],

    technologies: [
      'OpenAI GPT-4', 'Anthropic Claude', 'LangChain',
      'Vector Databases', 'Python', 'Node.js', 'FastAPI'
    ]
  }
];


// Blog Posts (placeholder for now)
export const posts: Post[] = [];

// Timeline
export const timeline: TimelineItem[] = [
  {
    year: '2024-presente',
    title: 'Especialização em IA Generativa e Produção Audiovisual',
    description: 'Produção profissional de videoclipes com IA generativa para artistas consagrados (Zé Ramalho). Criação de personagens virtuais (Scarlett Finch) com identidade digital completa. Plataforma educacional (Código Fluente) operando com stack moderna.',
  },
  {
    year: '2020-2023',
    title: 'Desenvolvimento Full-Stack',
    description: 'Projetos profissionais de software: arquitetura de sistemas, Next.js, MongoDB, Node.js. Produção musical híbrida com técnicas tradicionais e modernas.',
  },
  {
    year: '2010-2019',
    title: 'Formação Técnica e Artística',
    description: 'Bacharelado em Ciência da Computação e Música (Flauta Transversal). Primeiros projetos profissionais em desenvolvimento de software e produção audiovisual.',
  },
];

// Social Links
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/toticavalcanti',
    icon: 'Github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/toticavalcanti',
    icon: 'Linkedin',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@toticavalcanti',
    icon: 'Youtube',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/toticavalcanti',
    icon: 'Instagram',
  },
];

// About Info
export const aboutInfo = {
  name: 'Toti Cavalcanti',
  title: 'Software Engineer & Systems Architect',
  bio: 'Ciência da Computação como base para a criação de sistemas, automações e projetos digitais, visuais e audiovisuais.',
  extendedBio: [
    'Dupla formação: Bacharel em Ciência da Computação e Bacharel em Música.',

    'Desenvolvo sistemas e aplicações full-stack: frontend, backend, banco de dados, infraestrutura e DevOps.',

    'Stack técnica: Golang (Fiber), Python (Django), Node.js, Next.js, MongoDB.',

    'Músico profissional desde 1987.',

    'Toco com Zé Ramalho desde 1995, toquei com Sandra de Sá entre 1993 e 1994, e integrei a orquestra de sax fundada por Paulo Moura entre 1990 e 1995.',

    'Utilizo inteligência artificial aplicada como ferramenta em desenvolvimento de software, automação, produção musical e criação audiovisual.',

    'Projetos atuais: site oficial de Zé Ramalho (Next.js + MongoDB + Node.js), este portfólio (Next.js), videoclipes com IA generativa, personagem virtual Scarlett Finch, plataforma educacional Código Fluente.',

    'Resultado: sistemas que funcionam e projetos que entregam valor.'
  ],
  avatar: 'https://github.com/toticavalcanti/toti-assets/blob/master/toti-studio.png?raw=true',
  email: 'toticavalcanti@gmail.com',
  whatsapp: '+5521982266075',
};

// Channels
export const channels: Channel[] = [
  {
    id: '1',
    name: 'Scarlett Finch',
    handle: '@scarlettfinchofficial',
    url: 'https://www.youtube.com/@scarlettfinchofficial',
    description: 'Cantora pop virtual e influencer britânica, desenvolvida inteiramente com IA. O projeto integra música original, videoclipes e presença multiplataforma, combinando uma identidade visual marcante com uma narrativa digital completa.',
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/master/scarlett-finch.jpg?raw=true',
    category: 'music',
    status: 'active',
    featured: false,
  },
  {
    id: '2',
    name: 'Código Fluente',
    handle: '@codigofluente',
    url: 'https://www.youtube.com/@codigofluente',
    description: 'Base de conhecimento open source sobre tecnologia. Conteúdos estruturados em Programação (Python, Go, JS), Frameworks (Django, Fiber), Infraestrutura (DevOps, K8S) e IA Generativa. Laboratório técnico aberto, gratuito e validado.',
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/master/codigo-fluente.jpg?raw=true',
    category: 'tech',
    status: 'active',
    featured: false,
  },
  {
    id: '3',
    name: 'Toti Cavalcanti Music',
    handle: '@toticavalcanti',
    url: 'https://www.youtube.com/@toticavalcantimusic',
    description: 'Bem-vindo ao meu canal oficial. Aqui reúno meu trabalho autoral em videoclipes, releituras de grandes artistas e conteúdos de educação musical. Um espaço completo para ouvir, se inspirar e aprender teoria e prática.',
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/master/toti.jpg?raw=true',
    category: 'music',
    status: 'active',
    featured: false,
  },
  {
    id: '4',
    name: 'Putz',
    handle: '@putzband',
    url: 'https://www.youtube.com/@putzband',
    description: 'Laboratório de produção musical de alta fidelidade formado por Toti Cavalcanti (voz, sax, flauta, teclas, violão), Fábio Cavalcanti (guitarra e voz), Lula (bateria) e Tatá (baixo). Recriamos clássicos com apuro técnico, do progressivo de King Crimson à delicadeza de Lô Borges.',
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/master/putz.jpg?raw=true',
    category: 'music',
    status: 'active',
    featured: false,
  },
  {
    id: '5',
    name: 'Backing Track',
    handle: '@backingtrack',
    url: 'https://www.youtube.com/@backingtrack',
    description: 'Backing tracks profissionais para prática musical. Instrumentais de alta qualidade em diversos estilos.',
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/master/backingtrack.jpg?raw=true',
    category: 'music',
    status: 'active',
    featured: false,
  },
  {
    id: '6',
    name: 'Toti AI Films',
    handle: '@totiaifilms',
    url: 'https://www.youtube.com/@totiaifilms',
    description: 'Experimentos audiovisuais com IA generativa. Narrativas visuais e experimentação técnica.',
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/master/toti-ai-films.jpg?raw=true',
    category: 'tech',
    status: 'active',
    featured: false,
  },
  {
    id: '7',
    name: 'Fake Soul Records',
    handle: '@fakesoulrecords',
    url: 'https://www.youtube.com/@fakesoulrecords',
    description: 'Reimaginando grandes sucessos através da elegância do Soul e R&B. Produção musical refinada com identidade sonora retrô.',
    thumbnail: 'https://github.com/toticavalcanti/toti-assets/blob/master/fakesoulrecord.jpg?raw=true',
    category: 'music',
    status: 'active',
    featured: false,
  },
];

// Published Books
export const books: Book[] = [
  {
    id: 'magic-prompts',
    title: 'Magic Prompts',
    subtitle: 'Criando Imagens Impressionantes com IA',
    description: 'Um guia completo para criar prompts para ferramentas de geração de imagens com IA como MidJourney, DALL-E, Stable Diffusion e mais. Aprenda técnicas avançadas, insights específicos de cada ferramenta e transforme suas ideias em arte digital impressionante.',
    coverImage: 'https://m.media-amazon.com/images/I/81o8q0MO2TL._SY425_.jpg',
    amazonUrl: 'https://www.amazon.com.br/dp/B0DZQM2SNZ',
    language: 'English',
    format: 'eBook Kindle',
    topics: ['IA', 'Arte Generativa', 'MidJourney', 'DALL-E', 'Engenharia de Prompts'],
    year: '2024'
  },
  {
    id: 'music-history',
    title: 'Music History',
    subtitle: 'Da Flauta Antiga aos Beats Eletrônicos',
    description: 'Uma odisseia através do tempo musical, traçando a evolução da música desde culturas antigas até os beats eletrônicos de hoje. Explore a transformação de estilos musicais, instrumentos e contextos culturais que moldaram a trilha sonora da humanidade.',
    coverImage: 'https://m.media-amazon.com/images/I/71fAKveojPL._SY342_.jpg',
    amazonUrl: 'https://www.amazon.com.br/dp/B0D2VJYV87',
    language: 'English',
    format: 'eBook Kindle',
    topics: ['Música', 'História', 'Cultura', 'Evolução Musical'],
    year: '2024'
  }
];

// Cases (work showcase)

export const cases: Case[] = [
  {
    slug: 'ze-ramalho',
    name: 'Site Zé Ramalho',
    description: 'Site oficial de um dos maiores artistas do Brasil — frontend, backend e área administrativa.',
    tags: ['Site', 'Full-Stack', 'Next.js'],
    liveUrl: 'https://www.zeramalho.com.br',
    imagePath: '/assets/cases/ze-ramalho/cover.jpg',
    objective: 'Criar o novo site oficial do artista Zé Ramalho com área administrativa para gestão de conteúdo.',
    whatWasDone: 'Site completo: frontend Next.js, API Node.js, MongoDB, área admin, animações, SEO, integração com discografia.',
    stack: 'Next.js + Node.js + MongoDB + TypeScript + Tailwind',
    ctaText: 'Quero um site assim',
    pillar: 'sites-sistemas',
  },
  {
    slug: 'codigo-fluente',
    name: 'Código Fluente',
    description: 'Plataforma educacional de programação com conteúdo técnico e didático.',
    tags: ['Plataforma', 'Educação', 'WordPress'],
    liveUrl: 'https://www.codigofluente.com.br',
    imagePath: '/assets/cases/codigo-fluente/cover.jpg',
    objective: 'Criar plataforma de ensino de programação com cursos, artigos e comunidade.',
    whatWasDone: 'Site educacional completo com sistema de cursos, blog técnico e área de membros.',
    stack: 'WordPress + PHP + MySQL',
    ctaText: 'Quero uma plataforma assim',
    pillar: 'sites-sistemas',
  },
  {
    slug: 'neurozen',
    name: 'NeuroZen',
    description: 'Landing de livro + chat IA para tirar dúvidas e aumentar conversão.',
    tags: ['Landing', 'Chat IA', 'Groq'],
    liveUrl: 'https://neurozen-book.netlify.app/',
    imagePath: '/assets/cases/neurozen/cover.jpg',
    objective: 'Criar landing de livro com chat IA integrado para responder dúvidas em tempo real.',
    whatWasDone: 'Landing page responsiva + chat IA usando Groq para respostas rápidas e contextuais.',
    stack: 'HTML + CSS + JavaScript + Groq API + UI de Chat',
    ctaText: 'Quero um chat desse no meu site',
    pillar: 'sites-sistemas',
  },
  {
    slug: 'magic-prompts',
    name: 'Magic Prompts',
    description: 'Landing de infoproduto + galeria para provar qualidade visual.',
    tags: ['Landing', 'Galeria', 'Conversão'],
    liveUrl: 'https://magic-prompts.netlify.app/',
    imagePath: '/assets/cases/magic-prompts/cover.jpg',
    objective: 'Vender pacote de prompts de IA com demonstração visual da qualidade.',
    whatWasDone: 'Landing com galeria de exemplos + estrutura de vendas otimizada para conversão.',
    stack: 'HTML + CSS + JavaScript',
    ctaText: 'Quero uma landing que converte',
    pillar: 'sites-sistemas',
  },
  {
    slug: 'emagrecer-depois-dos-40',
    name: 'Emagrecer Depois dos 40',
    description: 'Landing com estrutura clássica de venda e navegação por seções.',
    tags: ['Landing', 'Copy', 'Estrutura'],
    liveUrl: 'https://emagrecerdepoisdos40.netlify.app/',
    imagePath: '/assets/cases/emagrecer-depois-dos-40/cover.jpg',
    objective: 'Criar página de vendas com estrutura persuasiva e navegação intuitiva.',
    whatWasDone: 'Landing page com seções organizadas, copy de vendas e CTAs distribuídos.',
    stack: 'HTML + CSS + JavaScript',
    ctaText: 'Quero vender meu produto',
    pillar: 'sites-sistemas',
  },
  {
    slug: 'toti-portfolio',
    name: 'Toti Portfolio — Captação Automática de Leads',
    description: 'Formulário inteligente + agente IA no WhatsApp que qualifica leads 24h via GPT-4.',
    tags: ['Automação', 'WhatsApp IA', 'Leads'],
    liveUrl: 'https://toticavalcanti.com.br',
    imagePath: '/assets/cases/toti-portfolio/cover.jpg',
    objective: 'Criar sistema de captação automática de leads com IA respondendo no WhatsApp e persistência em banco de dados.',
    whatWasDone: 'API de contato salvando leads no Postgres (Neon) com rastreio por pilar. Webhook Z-API recebendo mensagens e processando com OpenAI GPT-4o-mini. Anti-spam, cache de respostas e fallback de timeout.',
    stack: 'Next.js + TypeScript + Postgres (Neon) + OpenAI GPT-4o-mini + Z-API + Vercel',
    ctaText: 'Quero automação assim',
    pillar: 'ia-automacao',
  },
  {
    slug: 'powerfit-gym',
    name: 'PowerFit Gym — Landing Page (HTML/CSS) publicada',
    description: 'Template moderno para academia (HTML + CSS), publicado no Netlify. Ideal para validação rápida e evolução para sistema sob demanda.',
    tags: ['Landing Page', 'HTML/CSS', 'Netlify', 'Template'],
    liveUrl: 'https://powerfit-demo.netlify.app/',
    imagePath: '/assets/cases/powerfit-gym/cover.jpg',
    objective: 'Criar template moderno de landing page para academia com foco em conversão e validação rápida.',
    whatWasDone: 'Landing page responsiva em HTML/CSS puro, publicada no Netlify. Design moderno focado em academias, pronto para customização.',
    stack: 'HTML + CSS + JavaScript',
    ctaText: 'Quero um template assim',
    pillar: 'sites-sistemas',
  },
];
