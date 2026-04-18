import { query } from './db';

// Tipos de métricas que podem ser incrementadas
export type MetricKind =
    | 'guardrails_blocked'
    | 'faq_cache_hits'
    | 'duplicate_cache_hits'
    | 'llm_calls_avoided'
    | 'llm_calls';

// Interface para métricas do dia
export interface DailyMetrics {
    guardrails_blocked: number;
    faq_cache_hits: number;
    duplicate_cache_hits: number;
    llm_calls_avoided: number;
    llm_calls: number;
}

/**
 * Incrementa uma métrica específica para o dia atual
 * Usa UPSERT para criar linha se não existir
 * 
 * IMPORTANTE: Nunca deve quebrar o fluxo do agente
 * Se falhar, apenas loga erro e continua
 */
export async function incrementMetric(kind: MetricKind): Promise<void> {
    try {
        const sql = `
            INSERT INTO cost_metrics (date, ${kind})
            VALUES (CURRENT_DATE, 1)
            ON CONFLICT (date)
            DO UPDATE SET 
                ${kind} = cost_metrics.${kind} + 1,
                updated_at = now()
        `;

        await query(sql);
    } catch (error) {
        // Log error mas não quebra o fluxo
        console.error(`[Metrics] Failed to increment ${kind}:`, error);
    }
}

/**
 * Retorna as métricas do dia atual
 * Se não houver dados ou houver erro, retorna zeros
 */
export async function getTodayMetrics(): Promise<DailyMetrics> {
    const defaultMetrics: DailyMetrics = {
        guardrails_blocked: 0,
        faq_cache_hits: 0,
        duplicate_cache_hits: 0,
        llm_calls_avoided: 0,
        llm_calls: 0,
    };

    try {
        const sql = `
            SELECT 
                guardrails_blocked,
                faq_cache_hits,
                duplicate_cache_hits,
                llm_calls_avoided,
                llm_calls
            FROM cost_metrics
            WHERE date = CURRENT_DATE
        `;

        const result = await query<DailyMetrics>(sql);

        if (result.rows.length === 0) {
            return defaultMetrics;
        }

        return result.rows[0];
    } catch (error) {
        console.error('[Metrics] Failed to get today metrics:', error);
        return defaultMetrics;
    }
}

/**
 * Calcula a economia estimada em USD baseado nas métricas
 * 
 * Fórmula: llm_calls_avoided * COST_PER_LLM_CALL_USD
 * 
 * Custo configurável via env var COST_PER_LLM_CALL_USD (default: 0.002)
 */
export function computeEstimatedSavingsUSD(metrics: DailyMetrics): number {
    const costPerCall = parseFloat(
        process.env.COST_PER_LLM_CALL_USD || '0.002'
    );

    const savings = metrics.llm_calls_avoided * costPerCall;

    // Arredondar para 4 casas decimais
    return Math.round(savings * 10000) / 10000;
}
