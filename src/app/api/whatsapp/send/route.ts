import { NextRequest, NextResponse } from 'next/server';
import { processMessage } from '@/lib/agent-processor';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Test endpoint to simulate message processing
 * Useful for testing with Postman
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { phone, message } = body;

        if (!phone || !message) {
            return NextResponse.json(
                { error: 'Missing phone or message' },
                { status: 400 }
            );
        }

        console.log('[Test Send] Processing:', { phone, message });

        // Process message
        const reply = await processMessage(phone, message);

        return NextResponse.json({
            success: true,
            phone,
            userMessage: message,
            agentReply: reply,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('[Test Send] Error:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
