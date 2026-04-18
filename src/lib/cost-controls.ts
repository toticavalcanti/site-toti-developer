import type { LeadData, ConversationMessage } from '../types/whatsapp';
import { incrementMetric } from './metrics';

// ============================================
// GUARDRAILS - Pre-LLM Scope Check
// ============================================

const PROHIBITED_KEYWORDS = [
    // Saude (sem acento)
    'medico', 'remedio', 'consulta', 'sintoma', 'doenca', 'hospital',
    'tratamento', 'medicamento', 'exame', 'diagnostico',
    // Politica
    'eleicao', 'voto', 'partido', 'politico', 'governo', 'presidente',
    'ministro', 'deputado', 'senador', 'prefeito',
    // Apostas/Jogos
    'aposta', 'bet', 'cassino', 'loteria', 'jogo de azar',
    // Outros
    'advogado', 'juridico', 'processo', 'advocacia',
];

const SERVICE_WHITELIST = [
    // Serviços técnicos
    'site', 'sistema', 'app', 'aplicativo', 'bot', 'whatsapp', 'ia',
    'inteligência artificial', 'automação', 'api', 'integração',
    // Negócio
    'orçamento', 'prazo', 'reunião', 'call', 'proposta', 'projeto',
    'quanto custa', 'preço', 'valor', 'investimento',
    // Audiovisual
    'vídeo', 'imagem', 'design', 'avatar', 'clipe', 'produção',
    // Musical
    'música', 'produção musical', 'trilha', 'pocket show', 'sax', 'flauta',
];

interface GuardrailResult {
    blocked: boolean;
    reason?: string;
    fallbackResponse?: string;
}

const FALLBACK_RESPONSES = [
    'Consigo te ajudar só com {service} por aqui 🙂 Quer voltar nesse ponto?',
    'Meu foco aqui é {service}. Podemos continuar nisso?',
    'Aqui eu foco em {service}. Quer que a gente siga nessa conversa?',
    'Por aqui eu trabalho com {service}. Voltamos pra isso?',
    'Minha especialidade por aqui é {service}. Quer falar sobre isso?',
];

/**
 * Check if message is out of scope and should be blocked
 * Only blocks if:
 * 1. Lead already has service_interest defined
 * 2. Message is clearly out of domain (prohibited keywords)
 */
export function checkGuardrails(
    message: string,
    lead: LeadData | null
): GuardrailResult {
    // Don't block if lead doesn't have service_interest yet
    if (!lead || !lead.service_interest) {
        return { blocked: false };
    }

    const normalizedMessage = normalizeText(message);

    // Check for prohibited keywords
    const hasProhibited = PROHIBITED_KEYWORDS.some(keyword =>
        normalizedMessage.includes(keyword)
    );

    if (!hasProhibited) {
        return { blocked: false };
    }

    // Check if message has any service-related keywords (legitimate reformulation)
    const hasServiceKeywords = SERVICE_WHITELIST.some(keyword =>
        normalizedMessage.includes(keyword)
    );

    if (hasServiceKeywords) {
        // Legitimate message even with prohibited words - don't block
        return { blocked: false };
    }

    // Block: has prohibited keywords AND no service keywords AND lead has service_interest
    const randomResponse = FALLBACK_RESPONSES[
        Math.floor(Math.random() * FALLBACK_RESPONSES.length)
    ].replace('{service}', lead.service_interest);

    // Persist metrics (async, non-blocking)
    incrementMetric('guardrails_blocked').catch(() => { });
    incrementMetric('llm_calls_avoided').catch(() => { });

    return {
        blocked: true,
        reason: 'out_of_scope',
        fallbackResponse: randomResponse,
    };
}

// ============================================
// FAQ CACHE - Template Responses
// ============================================

interface FAQTemplate {
    triggers: string[];
    response: string;
    question: string; // Qualificação
}

const FAQ_TEMPLATES: FAQTemplate[] = [
    {
        triggers: ['quanto custa', 'preço', 'valor', 'investimento', 'orçamento'],
        response: 'O investimento depende do escopo do projeto.',
        question: 'Qual serviço você precisa? (site, bot, vídeo, música, outro)',
    },
    {
        triggers: ['prazo', 'quanto tempo', 'duração', 'quando fica pronto'],
        response: 'O prazo varia conforme o projeto.',
        question: 'Qual o prazo ideal pra você? E qual serviço te interessa?',
    },
    {
        triggers: ['como funciona', 'como é o processo', 'workflow'],
        response: 'Atendimento começa por mensagem, proposta em 48h, e call curta só pra fechar.',
        question: 'Qual serviço você quer saber mais? (site, automação, vídeo, música)',
    },
    {
        triggers: ['marcar reunião', 'agendar call', 'conversar'],
        response: 'Posso te passar horários disponíveis assim que entender melhor o projeto.',
        question: 'Primeiro me conta: qual serviço você precisa?',
    },
    {
        triggers: ['quem é', 'quem você', 'quem atende'],
        response: 'Sou o agente do Toti Cavalcanti · Código Fluente Consultoria. Atendo leads de tecnologia e criação.',
        question: 'Qual serviço te trouxe aqui? (site, bot, vídeo, música)',
    },
];

interface FAQResult {
    isFAQ: boolean;
    response?: string;
    budgetValue?: string; // For budget parser
}

/**
 * Detect if message contains budget/price value
 */
function detectsBudgetValue(text: string): boolean {
    const normalized = text.toLowerCase();
    return (
        normalized.includes('r$') ||
        normalized.includes('reais') ||
        /\d{3,}/.test(normalized) || // 3+ digits
        normalized.includes(' mil') ||
        normalized.includes(' milhao') ||
        normalized.includes(' milhão')
    );
}

/**
 * Simple budget parser
 */
function parseBudget(text: string): string | null {
    // Try to extract budget value
    const match = text.match(/r\$?\s*(\d[\d.,]*)/i) ||
        text.match(/(\d+)\s*(?:mil|reais)/i) ||
        text.match(/(\d[\d.,]+)/);

    if (match) {
        return match[1].replace(/\./g, '').replace(',', '.');
    }
    return null;
}

/**
 * Check if message matches a FAQ pattern
 * Returns template response + qualifying question
 */
export function checkFAQ(message: string): FAQResult {
    const normalizedMessage = normalizeText(message);

    for (const faq of FAQ_TEMPLATES) {
        // Check if any trigger matches
        const matches = faq.triggers.some(trigger =>
            normalizedMessage.includes(normalizeText(trigger))
        );

        if (matches) {
            // Special case: budget/price FAQ
            // Don't use FAQ if user is providing their budget value
            if (faq.triggers.some(t => t.includes('orcamento') || t.includes('preco'))) {
                if (detectsBudgetValue(message)) {
                    // User is informing budget, not asking price
                    const budgetValue = parseBudget(message);

                    // Persist metrics (async, non-blocking)
                    incrementMetric('faq_cache_hits').catch(() => { });
                    incrementMetric('llm_calls_avoided').catch(() => { });

                    return {
                        isFAQ: true,
                        response: budgetValue
                            ? `Perfeito — anotei seu orçamento de R$ ${budgetValue}. Qual o prazo que você tem em mente?`
                            : 'Entendi sobre seu orçamento. Qual o prazo que você tem em mente?',
                        budgetValue: budgetValue || undefined,
                    };
                }
            }

            // Persist metrics (async, non-blocking)
            incrementMetric('faq_cache_hits').catch(() => { });
            incrementMetric('llm_calls_avoided').catch(() => { });

            return {
                isFAQ: true,
                response: `${faq.response}\n\n${faq.question}`,
            };
        }
    }

    return { isFAQ: false };
}

// ============================================
// DUPLICATE DETECTION - Per-Lead Cache
// ============================================

const SIMILARITY_THRESHOLD = 0.85; // 85% similar = duplicate

/**
 * Normalize text for comparison (remove accents, punctuation, lowercase)
 */
export function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '') // Remove accents
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
}

/**
 * Calculate simple similarity between two strings
 * Returns value between 0 and 1
 */
function calculateSimilarity(str1: string, str2: string): number {
    const normalized1 = normalizeText(str1);
    const normalized2 = normalizeText(str2);

    if (normalized1 === normalized2) {
        return 1.0;
    }

    // Simple character-level similarity
    const longer = normalized1.length > normalized2.length ? normalized1 : normalized2;
    const shorter = normalized1.length > normalized2.length ? normalized2 : normalized1;

    if (longer.length === 0) {
        return 1.0;
    }

    // Check containment
    if (longer.includes(shorter)) {
        return shorter.length / longer.length;
    }

    return 0;
}

interface DuplicateResult {
    isDuplicate: boolean;
    cachedResponse?: string;
}

/**
 * Check if message is duplicate of recent messages from THIS lead
 * Compare only with this lead's conversation history
 */
export function checkDuplicate(
    message: string,
    lead: LeadData | null
): DuplicateResult {
    if (!lead || !lead.conversation_history || lead.conversation_history.length === 0) {
        return { isDuplicate: false };
    }

    const history = lead.conversation_history;
    const recentMessages = history.slice(-6); // Last 6 messages (3 exchanges)

    // Check last 3 user messages
    const userMessages = recentMessages.filter(msg => msg.role === 'user');

    for (let i = 0; i < userMessages.length; i++) {
        const pastMessage = userMessages[i];
        const similarity = calculateSimilarity(message, pastMessage.content);

        if (similarity >= SIMILARITY_THRESHOLD) {
            // Found duplicate - find corresponding assistant response
            const pastIndex = recentMessages.indexOf(pastMessage);
            if (pastIndex >= 0 && pastIndex < recentMessages.length - 1) {
                const nextMessage = recentMessages[pastIndex + 1];
                if (nextMessage.role === 'assistant') {
                    console.log('[Cost Control] Duplicate detected:', {
                        similarity,
                        original: pastMessage.content.substring(0, 50),
                        duplicate: message.substring(0, 50),
                    });

                    // Persist metrics (async, non-blocking)
                    incrementMetric('duplicate_cache_hits').catch(() => { });
                    incrementMetric('llm_calls_avoided').catch(() => { });

                    return {
                        isDuplicate: true,
                        cachedResponse: nextMessage.content,
                    };
                }
            }
        }
    }

    return { isDuplicate: false };
}

// ============================================
// COST LOGGING (DEPRECATED - Now using DB metrics)
// ============================================
// Funções mantidas para compatibilidade mas não mais usadas
// Métricas agora são persistidas no Postgres via incrementMetric()
// Ver: src/lib/metrics.ts
