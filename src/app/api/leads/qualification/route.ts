import { NextRequest, NextResponse } from 'next/server';
import { 
  qualificationSubmittedSchema, 
  qualificationPartialSchema 
} from '@/lib/qualification-schema';
import { upsertLead } from '@/lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stage } = body;

    let validatedData;
    if (stage === 'submitted') {
      const result = qualificationSubmittedSchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json({ success: false, errors: result.error.flatten().fieldErrors }, { status: 400 });
      }
      validatedData = result.data;
    } else {
      const result = qualificationPartialSchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json({ success: false, errors: result.error.flatten().fieldErrors }, { status: 400 });
      }
      validatedData = result.data;
    }

    // Map to LeadData
    // Use phone if provided, fallback to email, or use 'anonymous'
    const identifier = validatedData.whatsapp || validatedData.email || 'anonymous';
    
    // Fire the upsert
    await upsertLead(identifier, {
      name: validatedData.name || null,
      email: validatedData.email || null,
      phone: validatedData.whatsapp || null,
      service_interest: validatedData.projectType,
      budget_range: validatedData.budget,
      desired_deadline: validatedData.timeline,
      source: validatedData.source,
      stage: validatedData.stage,
      notes: validatedData.message ? `[Qualification Funnel] ${validatedData.message}` : null,
      status: 'new'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Qualification API] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
