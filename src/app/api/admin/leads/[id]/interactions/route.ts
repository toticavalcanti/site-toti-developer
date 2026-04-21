import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { createInteraction, createAuditEvent } from '@/lib/leads';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  try {
    const interaction = await createInteraction({
      lead_id: id,
      type: body.type,
      direction: body.direction,
      content: body.content,
      created_by_admin_id: session.userId,
    });

    // Audit Log
    await createAuditEvent({
      entity_type: 'lead',
      entity_id: id,
      action: 'ADD_INTERACTION',
      after_json: interaction,
      actor_admin_id: session.userId,
    });

    return NextResponse.json({ success: true, interaction });
  } catch (error) {
    console.error('[Admin Interaction Data API] Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
