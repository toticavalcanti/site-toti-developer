import type { LLMAction, LeadData } from '../types/whatsapp';
import { upsertLead, updateLeadStatus } from './leads';
import { getAvailableSlots, createCalendarEvent } from './google-calendar';

export interface ActionExecutorContext {
    phone: string;
    currentLead: LeadData | null;
    leadPatch?: Partial<LeadData>;
}

/**
 * Execute actions returned by LLM
 */
export async function executeActions(
    actions: LLMAction[],
    context: ActionExecutorContext
): Promise<void> {
    for (const action of actions) {
        await executeAction(action, context);
    }
}

async function executeAction(
    action: LLMAction,
    context: ActionExecutorContext
): Promise<void> {
    console.log('[Action Executor]', action.type, action.data);

    switch (action.type) {
        case 'upsert_lead':
            await handleUpsertLead(context);
            break;

        case 'ask_clarifying':
            // No database action needed - just a flag for the LLM
            console.log('[Action] Ask clarifying question');
            break;

        case 'suggest_services':
            // Log suggestion
            console.log('[Action] Suggest services:', action.data);
            break;

        case 'offer_calendar_slots':
            await handleOfferCalendarSlots(context, action.data);
            break;

        case 'create_calendar_event':
            await handleCreateCalendarEvent(context, action.data);
            break;

        case 'handoff_human':
            await handleHandoffHuman(context);
            break;

        default:
            console.warn('[Action Executor] Unknown action type:', action.type);
    }
}

async function handleUpsertLead(context: ActionExecutorContext): Promise<void> {
    if (!context.leadPatch) {
        return;
    }

    await upsertLead(context.phone, context.leadPatch);
    console.log('[Action] Lead updated:', context.phone);
}

async function handleOfferCalendarSlots(
    context: ActionExecutorContext,
    data?: Record<string, unknown>
): Promise<void> {
    try {
        // Default to tomorrow if no date specified
        const requestedDate = data?.date
            ? new Date(data.date as string)
            : new Date(Date.now() + 24 * 60 * 60 * 1000);

        const slots = await getAvailableSlots(requestedDate);

        console.log('[Action] Available slots:', slots.length);

        // Update lead notes with slot offer
        if (context.leadPatch) {
            const currentNotes = context.leadPatch.notes || '';
            context.leadPatch.notes = `${currentNotes}\nOffered calendar slots for ${requestedDate.toLocaleDateString()}`;
        }
    } catch (error) {
        console.error('[Action] Error fetching calendar slots:', error);
    }
}

async function handleCreateCalendarEvent(
    context: ActionExecutorContext,
    data?: Record<string, unknown>
): Promise<void> {
    try {
        if (!data?.start || !data?.end) {
            console.error('[Action] Missing start/end time for event');
            return;
        }

        const lead = context.currentLead;
        const summary = `Call - ${lead?.name || context.phone}`;
        const description = `WhatsApp: ${context.phone}\nInteresse: ${lead?.service_interest || 'N/A'}`;

        const eventLink = await createCalendarEvent({
            summary,
            description,
            start: data.start as string,
            end: data.end as string,
            attendeeEmail: data.email as string | undefined,
        });

        console.log('[Action] Calendar event created:', eventLink);

        // Update lead status to meeting_scheduled
        await updateLeadStatus(context.phone, 'meeting_scheduled');

        // Update notes
        if (context.leadPatch) {
            const currentNotes = context.leadPatch.notes || '';
            context.leadPatch.notes = `${currentNotes}\nMeeting scheduled: ${eventLink}`;
        }
    } catch (error) {
        console.error('[Action] Error creating calendar event:', error);
    }
}

async function handleHandoffHuman(context: ActionExecutorContext): Promise<void> {
    await updateLeadStatus(context.phone, 'human_handoff');
    console.log('[Action] Handoff to human:', context.phone);

    // Update notes
    if (context.leadPatch) {
        const currentNotes = context.leadPatch.notes || '';
        context.leadPatch.notes = `${currentNotes}\nRequested human handoff`;
    }
}
