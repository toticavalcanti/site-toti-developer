import { tavily } from '@tavily/core';

let tavilyClient: ReturnType<typeof tavily> | null = null;

function getTavilyClient() {
    if (!tavilyClient) {
        const apiKey = process.env.TAVILY_API_KEY;

        if (!apiKey) {
            throw new Error('TAVILY_API_KEY environment variable is not set');
        }

        tavilyClient = tavily({ apiKey });
    }

    return tavilyClient;
}

/**
 * Detect if message needs web search
 * Looks for URLs, search keywords, price queries, etc.
 */
export function detectWebSearchNeed(message: string): boolean {
    const lowerMessage = message.toLowerCase();

    // Check for URLs
    if (message.match(/https?:\/\/[^\s]+/)) {
        return true;
    }

    // Check for search keywords
    const searchKeywords = [
        'pesquisa',
        'pesquisar',
        'busca',
        'buscar',
        'verifica',
        'verificar',
        'quanto custa',
        'preço de',
        'valor de',
        'procura',
        'procurar',
        'encontra',
        'encontrar'
    ];

    const needsSearch = searchKeywords.some(keyword =>
        lowerMessage.includes(keyword)
    );

    if (needsSearch) {
        console.log('[Tavily] Web search need detected');
        return true;
    }

    return false;
}

/**
 * Search the web using Tavily
 * Returns a concise summary (max 200 chars)
 */
export async function searchWeb(query: string): Promise<string> {
    try {
        // Check if Tavily is configured
        if (!process.env.TAVILY_API_KEY) {
            console.log('[Tavily] Not configured, skipping web search');
            return '';
        }

        const client = getTavilyClient();

        console.log('[Tavily] Searching:', query);

        const response = await client.search(query, {
            maxResults: 3,
            searchDepth: 'basic',
            includeAnswer: true
        });

        // Extract and summarize results
        let summary = '';

        if (response.answer) {
            summary = response.answer.substring(0, 200);
        } else if (response.results && response.results.length > 0) {
            // Concatenate first few results
            summary = response.results
                .slice(0, 2)
                .map(r => r.content)
                .join(' ')
                .substring(0, 200);
        }

        console.log('[Tavily] Search complete, summary length:', summary.length);

        return summary || 'Nenhum resultado relevante encontrado.';
    } catch (error) {
        console.error('[Tavily] Search error:', error);
        return '';
    }
}
