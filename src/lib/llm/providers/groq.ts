import Groq from 'groq-sdk';
import type { LLMResponse } from '../../../types/whatsapp';

let groqClient: Groq | null = null;

function getGroqClient(): Groq {
    if (!groqClient) {
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            throw new Error('GROQ_API_KEY environment variable is not set');
        }

        groqClient = new Groq({
            apiKey,
        });
    }

    return groqClient;
}

export interface CallLLMOptions {
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
    temperature?: number;
    maxTokens?: number;
}

/**
 * Call Groq LLM with cost controls
 * - Model set via GROQ_MODEL env var (default: llama-3.1-70b-versatile)
 * - Max tokens capped at 300 for cost efficiency
 * - JSON response format enforced
 */
export async function callLLM(options: CallLLMOptions): Promise<LLMResponse> {
    const client = getGroqClient();

    // Model from env or default
    const model = process.env.GROQ_MODEL || 'llama-3.1-70b-versatile';

    const {
        messages,
        temperature = 0.5,
        maxTokens = 300,
    } = options;

    console.log(`[LLM] provider=groq model=${model} max_tokens=${maxTokens} temp=${temperature}`);

    try {
        const completion = await client.chat.completions.create({
            model,
            messages,
            temperature,
            max_tokens: maxTokens,
            response_format: { type: 'json_object' }, // Force JSON response
        });

        const content = completion.choices[0]?.message?.content;

        if (!content) {
            throw new Error('Empty response from Groq');
        }

        // Parse JSON response
        const response = JSON.parse(content) as LLMResponse;

        // Validate response structure
        if (!response.reply || !Array.isArray(response.actions)) {
            throw new Error('Invalid LLM response structure');
        }

        console.log('[LLM] Success:', {
            actions: response.actions.map(a => a.type),
            confidence: response.confidence,
        });

        return response;
    } catch (error) {
        console.error('[LLM] Groq Error:', error);

        // Retry once on failure
        if (error instanceof Error && error.message.includes('timeout')) {
            console.log('[LLM] Retrying after timeout...');
            return callLLM(options);
        }

        throw error;
    }
}
