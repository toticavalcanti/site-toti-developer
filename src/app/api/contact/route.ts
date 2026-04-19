import { NextRequest, NextResponse } from 'next/server';
import { qualificationSubmittedSchema } from '@/lib/qualification-schema';
import { upsertLead } from '@/lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Normalize phone number:
 * - Remove all non-digit characters
 * - Ensure Brazilian prefix (55) is present
 */
function normalizePhone(phone: string): string {
    if (!phone) return '';
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
 * POST /api/contact - Capture lead from contact form
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input using the shared qualification schema
        const validationResult = qualificationSubmittedSchema.safeParse(body);
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

        const data = validationResult.data;
        const normalizedPhone = normalizePhone(data.whatsapp || '');

        // Use email as primary identifier if phone is missing, 
        // but here we usually have both from the contact form.
        const identifier = normalizedPhone || data.email;

        // Insert/Update lead into database
        await upsertLead(identifier, {
            name: data.name,
            email: data.email,
            phone: normalizedPhone || null,
            service_interest: data.projectType,
            budget_range: data.budget,
            desired_deadline: data.timeline,
            source: data.source || 'contact_form',
            stage: 'submitted',
            notes: data.message ? `[Formulário Site] ${data.message}` : null,
            status: 'new'
        });

        return NextResponse.json({
            success: true,
            message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        });

    } catch (error) {
        console.error('[Contact API] Error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.',
            },
            { status: 500 }
        );
    }
}
