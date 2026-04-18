import type { LLMResponse } from '../../types/whatsapp';
import type { CallLLMOptions } from './providers/groq';
import * as groqProvider from './providers/groq';
import * as openaiProvider from './providers/openai';

/**
 * Determine if we should use premium (OpenAI) provider
 * Based on conversation history length and complexity
 */
function shouldUsePremium(messages: Array<{ role: string; content: string }>): boolean {
    // Count conversation messages (exclude system prompt)
    const conversationMessages = messages.filter(m => m.role !== 'system');

    // Use premium if conversation is getting long (15+ messages)
    if (conversationMessages.length >= 15) {
        console.log('[LLM Router] Using premium provider: conversation too long');
        return true;
    }

    // Check if last user message indicates complexity
    const lastUserMessage = conversationMessages
        .filter(m => m.role === 'user')
        .pop();

    if (lastUserMessage) {
        const complexityIndicators = [
            'complicado',
            'complexo',
            'não entendi',
            'confuso',
            'explica melhor',
            'não ficou claro'
        ];

        const isComplex = complexityIndicators.some(indicator =>
            lastUserMessage.content.toLowerCase().includes(indicator)
        );

        if (isComplex) {
            console.log('[LLM Router] Using premium provider: complexity detected');
            return true;
        }
    }

    return false;
}

/**
 * Main LLM router
 * - Default: Groq (cost-effective)
 * - Fallback: OpenAI (premium, when needed)
 */
export async function callLLM(options: CallLLMOptions): Promise<LLMResponse> {
    const provider = process.env.LLM_PROVIDER || 'groq';
    const fallbackProvider = process.env.LLM_FALLBACK_PROVIDER || 'openai';

    // Check if we should use premium based on heuristics
    const usePremium = shouldUsePremium(options.messages);

    // Try primary provider (unless premium is needed)
    if (!usePremium && provider === 'groq') {
        try {
            // Check if Groq is configured
            if (!process.env.GROQ_API_KEY) {
                console.log('[LLM Router] Groq not configured, using fallback');
                return await openaiProvider.callLLM(options);
            }

            console.log('[LLM Router] Using Groq provider');
            return await groqProvider.callLLM(options);
        } catch (error) {
            console.error('[LLM Router] Groq failed, falling back to OpenAI:', error);

            // Fallback to OpenAI
            if (fallbackProvider === 'openai') {
                console.log('[LLM Router] Using OpenAI fallback');
                return await openaiProvider.callLLM(options);
            }

            throw error;
        }
    }

    // Use OpenAI directly if premium is needed or if it's the primary provider
    if (usePremium || provider === 'openai') {
        console.log('[LLM Router] Using OpenAI provider (premium)');
        return await openaiProvider.callLLM(options);
    }

    // Default fallback
    console.log('[LLM Router] Using default OpenAI provider');
    return await openaiProvider.callLLM(options);
}
