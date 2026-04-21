import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { upsertLead, getLeadById, createAuditEvent } from '@/lib/leads';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  try {
    const existingLead = await getLeadById(id);
    if (!existingLead) {
      return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
    }

    const updatedLead = await upsertLead(existingLead.phone || existingLead.email!, body);

    // Audit Log
    await createAuditEvent({
      entity_type: 'lead',
      entity_id: id,
      action: 'UPDATE',
      before_json: existingLead,
      after_json: updatedLead,
      actor_admin_id: session.userId,
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error('[Admin Lead Update API] Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
