import { NextRequest, NextResponse } from 'next/server';
import { getAllLeads } from '@/lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Get all leads (with pagination)
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '100', 10);
        const offset = parseInt(searchParams.get('offset') || '0', 10);

        const leads = await getAllLeads(limit, offset);

        return NextResponse.json({
            success: true,
            count: leads.length,
            leads,
        });
    } catch (error) {
        console.error('[Leads API] Error:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
