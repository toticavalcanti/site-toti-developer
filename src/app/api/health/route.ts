import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getTodayMetrics, computeEstimatedSavingsUSD } from '@/lib/metrics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const timestamp = new Date().toISOString();

        // ============================================
        // ENV CHECKS
        // ============================================

        const envChecks = {
            openai: !!process.env.OPENAI_API_KEY,
            zapi: !!(process.env.ZAPI_INSTANCE_ID && process.env.ZAPI_TOKEN),
            neon: false, // Will test below
            google_calendar: !!(
                process.env.GOOGLE_CLIENT_ID &&
                process.env.GOOGLE_CLIENT_SECRET &&
                process.env.GOOGLE_REFRESH_TOKEN
            ),
        };

        // ============================================
        // REAL NEON HEALTHCHECK
        // ============================================

        try {
            await query('SELECT 1');
            envChecks.neon = true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('[Health] Neon check failed:', errorMessage);
            envChecks.neon = false;
        }

        // ============================================
        // DB-BACKED COST METRICS
        // ============================================

        const metrics = await getTodayMetrics();
        const cost_savings = {
            guardrails_blocked: metrics.guardrails_blocked,
            faq_cache_hits: metrics.faq_cache_hits,
            duplicate_cache_hits: metrics.duplicate_cache_hits,
            llm_calls_avoided: metrics.llm_calls_avoided,
            llm_calls: metrics.llm_calls,
            estimated_savings_usd: computeEstimatedSavingsUSD(metrics),
        };

        // ============================================
        // RESPONSE
        // ============================================

        return NextResponse.json({
            status: 'ok',
            timestamp,
            env_checks: envChecks,
            cost_savings,
            openai_model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('[Health] Unexpected error:', error);

        return NextResponse.json(
            {
                status: 'error',
                error: errorMessage,
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
