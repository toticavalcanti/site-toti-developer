import { NextRequest, NextResponse } from 'next/server';
import { 
  qualificationSubmittedSchema, 
  qualificationPartialSchema,
  QualificationSubmitted
} from '@/lib/qualification-schema';
import { upsertLead } from '@/lib/leads';
import { sendLeadNotification } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stage } = body;

    if (stage === 'submitted') {
      const result = qualificationSubmittedSchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json({ success: false, errors: result.error.flatten().fieldErrors }, { status: 400 });
      }
      const data = result.data;
      
      // Upsert
      const identifier = data.whatsapp || data.email;
      await upsertLead(identifier, {
        name: data.name,
        email: data.email,
        phone: data.whatsapp || null,
        service_interest: data.projectType,
        budget_range: data.budget,
        desired_deadline: data.timeline,
        source: data.source,
        stage: data.stage,
        notes: data.message ? `[Qualification Funnel] ${data.message}` : null,
        status: 'new'
      });

      // Notification (Fire and forget)
      try {
        await sendLeadNotification({
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          projectType: data.projectType,
          budget: data.budget,
          timeline: data.timeline,
          message: data.message,
          source: data.source,
          locale: data.locale,
        });
      } catch (emailError) {
        console.error('[Email Notification] Failed to send:', emailError);
      }

      return NextResponse.json({ success: true });

    } else {
      const result = qualificationPartialSchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json({ success: false, errors: result.error.flatten().fieldErrors }, { status: 400 });
      }
      const data = result.data;
      
      const identifier = data.whatsapp || data.email || 'anonymous';
      await upsertLead(identifier, {
        name: data.name || null,
        email: data.email || null,
        phone: data.whatsapp || null,
        service_interest: data.projectType,
        budget_range: data.budget,
        desired_deadline: data.timeline,
        source: data.source,
        stage: data.stage,
        notes: data.message ? `[Qualification Funnel] ${data.message}` : null,
        status: 'new'
      });

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('[Qualification API] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
