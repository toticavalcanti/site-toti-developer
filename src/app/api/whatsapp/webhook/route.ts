import { NextRequest, NextResponse } from 'next/server';
import type { ZAPIWebhookPayload } from '@/types/whatsapp';
import { processMessage } from '@/lib/agent-processor';
import { sendMessage } from '@/lib/zapi';
import { getLeadByIdentifier, upsertLead } from '@/lib/leads';
import { normalizeText } from '@/lib/cost-controls';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TIMEOUT_MS = 9000; // 9 seconds (safe for Vercel 10s limit)
const TIMEOUT_FALLBACK_MESSAGE = 'Recebi sua mensagem 🙂 Já já te respondo por aqui.';

/**
 * Z-API Webhook Handler (SYNCHRONOUS for Vercel reliability)
 * Receives incoming WhatsApp messages and processes them
 */
export async function POST(request: NextRequest) {
    try {
        const payload = await request.json() as ZAPIWebhookPayload;

        console.log('[Webhook] Received:', {
            phone: payload.phone,
            type: payload.type,
            fromMe: payload.fromMe,
            messageId: payload.messageId,
        });

        // Ignore messages sent by us
        if (payload.fromMe) {
            return NextResponse.json({ status: 'ignored', reason: 'from_me' });
        }

        // Only process text messages for now
        if (payload.type !== 'text' || !payload.text?.message) {
            return NextResponse.json({ status: 'ignored', reason: 'not_text' });
        }

        // Ignore group messages
        if (payload.isGroup) {
            return NextResponse.json({ status: 'ignored', reason: 'group_message' });
        }

        const phone = payload.phone;
        const message = payload.text.message;
        const messageId = payload.messageId;

        if (!phone || !message) {
            return NextResponse.json(
                { error: 'Missing phone or message' },
                { status: 400 }
            );
        }

        // ============================================
        // IDEMPOTENCY CHECK - Prevent duplicate processing
        // ============================================
        if (messageId) {
            const lead = await getLeadByIdentifier({ phone });
            if (lead && lead.last_message_id === messageId) {
                console.log('[Webhook] Duplicate messageId detected - ignoring');
                return NextResponse.json({
                    status: 'ignored',
                    reason: 'duplicate_messageId',
                });
            }
        }

        // ============================================
        // ANTI-SPAM CACHE - Avoid unnecessary OpenAI calls
        // ============================================
        try {
            const lead = await getLeadByIdentifier({ phone });
            const now = new Date();

            // 2.1) COOLDOWN ANTI-SPAM (5 seconds)
            if (lead?.last_inbound_at) {
                const secondsSinceLastMessage = (now.getTime() - new Date(lead.last_inbound_at).getTime()) / 1000;

                if (secondsSinceLastMessage < 5) {
                    console.log('[Webhook] Cooldown triggered:', { secondsSinceLastMessage });

                    const cooldownMessage = 'Recebi 🙂 só um instante que já te respondo.';
                    await sendMessage(phone, cooldownMessage);

                    // Update timestamps
                    await upsertLead(phone, {
                        last_inbound_at: now,
                        last_message_id: messageId || null,
                    });

                    return NextResponse.json({
                        status: 'cooldown',
                        secondsSinceLastMessage,
                    });
                }
            }

            // 2.2) CACHE DE PERGUNTA REPETIDA (24 horas)
            if (lead?.last_user_text_norm && lead?.last_agent_reply && lead?.last_agent_reply_at) {
                const normalizedMessage = normalizeText(message);
                const hoursSinceLastReply = (now.getTime() - new Date(lead.last_agent_reply_at).getTime()) / (1000 * 60 * 60);

                if (normalizedMessage === lead.last_user_text_norm && hoursSinceLastReply < 24) {
                    console.log('[Webhook] Cached reply used:', { hoursSinceLastReply });

                    await sendMessage(phone, lead.last_agent_reply);

                    // Update timestamps
                    await upsertLead(phone, {
                        last_inbound_at: now,
                        last_message_id: messageId || null,
                    });

                    return NextResponse.json({
                        status: 'cached_reply',
                        hoursSinceLastReply,
                    });
                }
            }
        } catch (cacheError) {
            // Cache check failed - don't block the flow
            console.warn('[Webhook] Cache check error (non-blocking):', cacheError);
        }

        // ============================================
        // SYNCHRONOUS PROCESSING with timeout protection
        // ============================================
        try {
            const now = new Date();

            const reply = await Promise.race([
                // Main processing
                (async () => {
                    const result = await processMessage(phone, message);
                    await sendMessage(phone, result);
                    return result;
                })(),
                // Timeout fallback
                new Promise<string>((_, reject) => {
                    setTimeout(() => reject(new Error('TIMEOUT')), TIMEOUT_MS);
                }),
            ]);

            // 3) UPDATE CACHE AFTER SUCCESSFUL PROCESSING
            try {
                const normalizedMessage = normalizeText(message);

                await upsertLead(phone, {
                    last_message_id: messageId || null,
                    last_inbound_at: now,
                    last_user_text_norm: normalizedMessage,
                    last_agent_reply: reply,
                    last_agent_reply_at: now,
                });
            } catch (persistError) {
                // Don't block response if persistence fails
                console.warn('[Webhook] Cache persistence error (non-blocking):', persistError);
            }

            console.log('[Webhook] Processed successfully:', { phone, messageId });

            return NextResponse.json({
                status: 'success',
                reply: reply.substring(0, 100), // Log preview only
            });
        } catch (error) {
            // Timeout or processing error
            if (error instanceof Error && error.message === 'TIMEOUT') {
                console.warn('[Webhook] Timeout - sending fallback message');

                // Send fallback message
                await sendMessage(phone, TIMEOUT_FALLBACK_MESSAGE);

                // Still update messageId to prevent reprocessing
                if (messageId) {
                    await upsertLead(phone, { last_message_id: messageId });
                }

                return NextResponse.json({
                    status: 'timeout',
                    message: 'Processed with fallback',
                });
            }

            // Other errors
            throw error;
        }
    } catch (error) {
        console.error('[Webhook] Error:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

/**
 * Health check endpoint
 */
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        service: 'whatsapp-webhook',
        timestamp: new Date().toISOString(),
        mode: 'synchronous', // Updated
    });
}
