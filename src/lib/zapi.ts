import type { ZAPISendMessageResponse } from '../types/whatsapp';

/**
 * Send message via Z-API
 */
export async function sendMessage(
    phone: string,
    message: string
): Promise<ZAPISendMessageResponse> {
    const instanceId = process.env.ZAPI_INSTANCE_ID;
    const token = process.env.ZAPI_TOKEN;

    if (!instanceId || !token) {
        throw new Error('ZAPI_INSTANCE_ID or ZAPI_TOKEN not configured');
    }

    // Z-API endpoint
    const url = `https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone,
                message,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Z-API error: ${response.status} - ${error}`);
        }

        const data = await response.json() as ZAPISendMessageResponse;

        console.log('[Z-API] Message sent:', {
            phone,
            messageId: data.messageId,
        });

        return data;
    } catch (error) {
        console.error('[Z-API] Send error:', error);
        throw error;
    }
}

/**
 * Validate webhook signature (if ZAPI_WEBHOOK_SECRET is set)
 * For now, this is a placeholder - Z-API webhook validation can be added later
 */
export function validateWebhookSignature(
    payload: unknown,
    signature?: string
): boolean {
    const secret = process.env.ZAPI_WEBHOOK_SECRET;

    // If no secret configured, skip validation
    if (!secret) {
        return true;
    }

    // TODO: Implement actual signature validation when needed
    // For now, accept all webhooks
    return true;
}
