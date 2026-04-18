import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// WhatsApp number for fallback
const WHATSAPP_NUMBER = '5521982266075';

/**
 * Normalize phone number:
 * - Remove all non-digit characters
 * - Ensure Brazilian prefix (55) is present
 */
function normalizePhone(phone: string): string {
    // Remove all non-digits
    let digits = phone.replace(/\D/g, '');

    // If starts with 0, remove it (old format like 021...)
    if (digits.startsWith('0')) {
        digits = digits.substring(1);
    }

    // If doesn't start with 55, add Brazilian prefix
    if (!digits.startsWith('55')) {
        digits = '55' + digits;
    }

    return digits;
}

/**
 * Build WhatsApp href with pre-filled message
 */
function buildWhatsAppHref(name: string, pilar: string, message: string, pocketShowWaitlist?: boolean): string {
    const pilarNames: Record<string, string> = {
        'ia-automacao': 'IA & Automação',
        'sites-sistemas': 'Sites & Sistemas',
        'audiovisual-musica': 'Audiovisual & Música',
    };

    const pilarName = pilarNames[pilar] || pilar;
    let prefilledMessage = `Olá! Sou ${name}.\n\nInteresse: ${pilarName}`;

    if (pocketShowWaitlist) {
        prefilledMessage += '\n\n🎷 LISTA DE ESPERA POCKET SHOW';
    }

    prefilledMessage += `\n\n${message}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledMessage)}`;
}

// Validation schema for contact form
const contactSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    whatsapp: z.string().min(10, 'WhatsApp inválido').max(20, 'WhatsApp inválido'),
    pilar: z.enum(['ia-automacao', 'sites-sistemas', 'audiovisual-musica'], {
        errorMap: () => ({ message: 'Selecione um pilar válido' }),
    }),
    message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(500, 'Mensagem muito longa'),
    pocketShowWaitlist: z.boolean().optional(),
});

type ContactData = z.infer<typeof contactSchema>;

/**
 * POST /api/contact - Capture lead from contact form
 */
export async function POST(request: NextRequest) {
    let parsedData: ContactData | null = null;

    try {
        const body = await request.json();

        // Validate input
        const validationResult = contactSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Dados inválidos. Verifique os campos e tente novamente.',
                    errors: validationResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        parsedData = validationResult.data;

        // Normalize phone number (digits only, ensure 55 prefix)
        const normalizedPhone = normalizePhone(parsedData.whatsapp);

        // Check if DATABASE_URL is configured
        const databaseUrl = process.env.DATABASE_URL;

        if (!databaseUrl) {
            console.warn('[Contact API] DATABASE_URL not configured - lead not saved');

            // Build fallback WhatsApp link
            const whatsappHref = buildWhatsAppHref(
                parsedData.name,
                parsedData.pilar,
                parsedData.message,
                parsedData.pocketShowWaitlist
            );

            return NextResponse.json(
                {
                    success: false,
                    message: 'Formulário temporariamente indisponível. Clique abaixo para falar diretamente no WhatsApp:',
                    whatsappHref,
                },
                { status: 503 }
            );
        }

        // Import db module dynamically to avoid errors when DATABASE_URL is not set
        const { query } = await import('@/lib/db');

        // Map pilar to readable name
        const pilarNames: Record<string, string> = {
            'ia-automacao': 'IA & Automação',
            'sites-sistemas': 'Sites & Sistemas',
            'audiovisual-musica': 'Audiovisual & Música',
        };

        // Build service interest with pocket show waitlist flag
        let serviceInterest = pilarNames[parsedData.pilar] || parsedData.pilar;
        if (parsedData.pocketShowWaitlist) {
            serviceInterest += ' (Lista Pocket Show)';
        }

        // Build notes with pocket show flag
        let notes = `[Formulário Site] ${parsedData.message}`;
        if (parsedData.pocketShowWaitlist) {
            notes = `[LISTA POCKET SHOW] ${notes}`;
        }

        // Insert lead into database with NORMALIZED phone
        const insertSql = `
      INSERT INTO leads (
        phone, 
        name, 
        service_interest, 
        notes, 
        status,
        conversation_history,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, 'new', '[]', NOW(), NOW())
      ON CONFLICT (phone) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        service_interest = EXCLUDED.service_interest,
        notes = CONCAT(leads.notes, E'\n---\n', EXCLUDED.notes),
        updated_at = NOW()
      RETURNING id, phone
    `;

        const result = await query(insertSql, [
            normalizedPhone,  // Use normalized phone
            parsedData.name,
            serviceInterest,
            notes,
        ]);

        if (result.rowCount === 0) {
            throw new Error('Failed to insert lead');
        }

        console.log('[Contact API] Lead saved successfully:', {
            phone: normalizedPhone,
            name: parsedData.name,
            pilar: parsedData.pilar,
            pocketShowWaitlist: parsedData.pocketShowWaitlist || false,
            id: result.rows[0]?.id,
        });

        return NextResponse.json({
            success: true,
            message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        });

    } catch (error) {
        console.error('[Contact API] Error:', error);

        // Build fallback WhatsApp link if we have parsed data
        const whatsappHref = parsedData
            ? buildWhatsAppHref(parsedData.name, parsedData.pilar, parsedData.message, parsedData.pocketShowWaitlist)
            : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Vim pelo formulário do site.')}`;

        // Return user-friendly error with WhatsApp fallback
        return NextResponse.json(
            {
                success: false,
                message: 'Erro ao enviar mensagem. Por favor, fale diretamente pelo WhatsApp:',
                whatsappHref,
            },
            { status: 500 }
        );
    }
}
