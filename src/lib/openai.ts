import OpenAI from 'openai';
import type { LLMResponse } from '../types/whatsapp';

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
    if (!openaiClient) {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error('OPENAI_API_KEY environment variable is not set');
        }

        openaiClient = new OpenAI({
            apiKey,
        });
    }

    return openaiClient;
}

export interface CallLLMOptions {
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
    temperature?: number;
    maxTokens?: number;
}

/**
 * Call OpenAI LLM with strict cost controls
 * - Model must be set via OPENAI_MODEL env var (no fallback)
 * - Max tokens capped at 300 for cost efficiency
 * - Validates against expensive models
 */
export async function callLLM(options: CallLLMOptions): Promise<LLMResponse> {
    const client = getOpenAIClient();

    // A) MODELO FIXO POR ENV - SEM FALLBACK
    const model = process.env.OPENAI_MODEL;
    if (!model) {
        throw new Error('OPENAI_MODEL environment variable is required. Set it to "gpt-4o-mini" for cost control.');
    }

    // C) PROTEÇÃO CONTRA MODELOS CAROS
    if (model !== 'gpt-4o-mini') {
        console.warn(`[LLM Warning] Using non-mini model: ${model}. This may incur higher costs.`);
        console.warn('[LLM Warning] Recommended model: gpt-4o-mini for cost efficiency.');
    }

    // B) LIMITE DE TOKENS (ECONOMIA REAL)
    const {
        messages,
        temperature = 0.5,        // Reduced from 0.7 for cost control
        maxTokens = 300,          // Reduced from 800 for cost control
    } = options;

    // D) LOG SIMPLES (SEM VAZAR DADOS)
    console.log(`[LLM] provider=openai model=${model} max_tokens=${maxTokens} temp=${temperature}`);

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
            throw new Error('Empty response from OpenAI');
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
        console.error('[LLM] Error:', error);

        // Retry once on failure
        if (error instanceof Error && error.message.includes('timeout')) {
            console.log('[LLM] Retrying after timeout...');
            return callLLM(options);
        }

        throw error;
    }
}

/**
 * Parse and validate LLM JSON response (fallback if response_format fails)
 */
export function parseLLMResponse(content: string): LLMResponse {
    try {
        // Try to extract JSON from markdown code blocks
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;

        const response = JSON.parse(jsonString) as LLMResponse;

        if (!response.reply || !Array.isArray(response.actions)) {
            throw new Error('Invalid response structure');
        }

        return response;
    } catch (error) {
        console.error('[OpenAI] Failed to parse response:', content);
        throw new Error('Failed to parse LLM response as JSON');
    }
}
