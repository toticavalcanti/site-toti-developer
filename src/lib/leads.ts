import { query } from './db';
import type { LeadData, ConversationMessage, LeadStatus } from '../types/whatsapp';

/**
 * Get lead by ID (UUID)
 */
export async function getLeadById(id: string): Promise<LeadData | null> {
    const res = await query<LeadData>('SELECT * FROM leads WHERE id = $1', [id]);
    return res.rows.length > 0 ? res.rows[0] : null;
}

/**
 * Get lead by identifier (phone or email)
 */
export async function getLeadByIdentifier(id: { phone?: string; email?: string }): Promise<LeadData | null> {
    if (!id.phone && !id.email) return null;

    let sql = 'SELECT * FROM leads WHERE ';
    const params: string[] = [];
    if (id.phone) {
        sql += 'phone = $1';
        params.push(id.phone);
    } else {
        sql += 'email = $1';
        params.push(id.email!);
    }

    const result = await query<LeadData>(sql, params);
    return result.rows.length > 0 ? result.rows[0] : null;
}

/**
 * Create or update lead (UPSERT)
 */
export async function upsertLead(
    identifier: string, // phone or email or 'anonymous'
    patch: Partial<LeadData>
): Promise<LeadData> {
    // Try to find by identifier (check if it looks like email or phone)
    const isEmail = identifier.includes('@');
    const lookup = isEmail ? { email: identifier } : { phone: identifier };
    const existing = await getLeadByIdentifier(lookup);

    if (existing) {
        // UPDATE existing lead
        const updates: string[] = [];
        const values: unknown[] = [];
        let paramIndex = 1;

        if (patch.name !== undefined) {
            updates.push(`name = $${paramIndex++}`);
            values.push(patch.name);
        }
        if (patch.email !== undefined) {
            updates.push(`email = $${paramIndex++}`);
            values.push(patch.email);
        }
        if (patch.phone !== undefined) {
            updates.push(`phone = $${paramIndex++}`);
            values.push(patch.phone);
        }
        if (patch.service_interest !== undefined) {
            updates.push(`service_interest = $${paramIndex++}`);
            values.push(patch.service_interest);
        }
        if (patch.desired_deadline !== undefined) {
            updates.push(`desired_deadline = $${paramIndex++}`);
            values.push(patch.desired_deadline);
        }
        if (patch.budget_range !== undefined) {
            updates.push(`budget_range = $${paramIndex++}`);
            values.push(patch.budget_range);
        }
        if (patch.notes !== undefined) {
            updates.push(`notes = $${paramIndex++}`);
            values.push(patch.notes);
        }
        if (patch.source !== undefined) {
            updates.push(`source = $${paramIndex++}`);
            values.push(patch.source);
        }
        if (patch.stage !== undefined) {
            updates.push(`stage = $${paramIndex++}`);
            values.push(patch.stage);
        }
        if (patch.status !== undefined) {
            updates.push(`status = $${paramIndex++}`);
            values.push(patch.status);
        }
        if (patch.conversation_history !== undefined) {
            updates.push(`conversation_history = $${paramIndex++}`);
            values.push(JSON.stringify(patch.conversation_history));
        }
        if (patch.last_message_id !== undefined) {
            updates.push(`last_message_id = $${paramIndex++}`);
            values.push(patch.last_message_id);
        }
        if (patch.last_inbound_at !== undefined) {
            updates.push(`last_inbound_at = $${paramIndex++}`);
            values.push(patch.last_inbound_at);
        }
        if (patch.last_user_text_norm !== undefined) {
            updates.push(`last_user_text_norm = $${paramIndex++}`);
            values.push(patch.last_user_text_norm);
        }
        if (patch.last_agent_reply !== undefined) {
            updates.push(`last_agent_reply = $${paramIndex++}`);
            values.push(patch.last_agent_reply);
        }
        if (patch.last_agent_reply_at !== undefined) {
            updates.push(`last_agent_reply_at = $${paramIndex++}`);
            values.push(patch.last_agent_reply_at);
        }
        if (patch.score !== undefined) {
            updates.push(`score = $${paramIndex++}`);
            values.push(patch.score);
        }
        if (patch.tags !== undefined) {
            updates.push(`tags = $${paramIndex++}`);
            values.push(JSON.stringify(patch.tags));
        }
        if (patch.next_action_at !== undefined) {
            updates.push(`next_action_at = $${paramIndex++}`);
            values.push(patch.next_action_at);
        }
        if (patch.next_action_note !== undefined) {
            updates.push(`next_action_note = $${paramIndex++}`);
            values.push(patch.next_action_note);
        }
        if (patch.lost_reason !== undefined) {
            updates.push(`lost_reason = $${paramIndex++}`);
            values.push(patch.lost_reason);
        }

        updates.push(`updated_at = NOW()`);
        
        // Final values array for WHERE
        values.push(existing.phone || existing.email);

        const sql = `
          UPDATE leads 
          SET ${updates.join(', ')}
          WHERE ${existing.phone ? 'phone' : 'email'} = $${paramIndex}
          RETURNING *
        `;

        const result = await query<LeadData>(sql, values);
        return result.rows[0];
    } else {
        // INSERT new lead
        const finalPhone = isEmail ? (patch.phone || null) : identifier;
        const finalEmail = isEmail ? identifier : (patch.email || null);

        const sql = `
          INSERT INTO leads (
            phone, 
            name,
            email, 
            service_interest, 
            desired_deadline, 
            budget_range,
            source,
            stage, 
            notes, 
            status, 
            conversation_history,
            last_message_id,
            score,
            tags,
            next_action_at,
            next_action_note,
            lost_reason,
            created_at,
            updated_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW(), NOW())
          RETURNING *
        `;

        const values = [
            finalPhone,
            patch.name || null,
            finalEmail,
            patch.service_interest || null,
            patch.desired_deadline || null,
            patch.budget_range || null,
            patch.source || null,
            patch.stage || 'submitted',
            patch.notes || null,
            patch.status || 'new',
            JSON.stringify(patch.conversation_history || []),
            patch.last_message_id || null,
            patch.score || 0,
            JSON.stringify(patch.tags || []),
            patch.next_action_at || null,
            patch.next_action_note || null,
            patch.lost_reason || null,
        ];

        const result = await query<LeadData>(sql, values);
        return result.rows[0];
    }
}

/**
 * Lead Interaction types
 */
export interface LeadInteraction {
    id: number;
    lead_id: string;
    type: 'whatsapp' | 'email' | 'call' | 'meeting' | 'proposal_sent' | 'note';
    direction: 'inbound' | 'outbound' | 'internal';
    content: string;
    created_at: Date;
    created_by_admin_id?: number | null;
}

/**
 * Create a lead interaction
 */
export async function createInteraction(data: Partial<LeadInteraction>): Promise<LeadInteraction> {
    const sql = `
        INSERT INTO lead_interactions (lead_id, type, direction, content, created_by_admin_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    const values = [
        data.lead_id,
        data.type,
        data.direction,
        data.content,
        data.created_by_admin_id || null
    ];
    const res = await query<LeadInteraction>(sql, values);
    return res.rows[0];
}

/**
 * Get interactions for a lead
 */
export async function getLeadInteractions(leadId: string): Promise<LeadInteraction[]> {
    const res = await query<LeadInteraction>(
        'SELECT * FROM lead_interactions WHERE lead_id = $1 ORDER BY created_at DESC',
        [leadId]
    );
    return res.rows;
}

/**
 * Audit Log types
 */
export interface AuditEvent {
    id: number;
    entity_type: string;
    entity_id: string;
    action: string;
    before_json?: any;
    after_json?: any;
    actor_admin_id?: number | null;
    created_at: Date;
}

/**
 * Create an audit event
 */
export async function createAuditEvent(data: Partial<AuditEvent>): Promise<AuditEvent> {
    const sql = `
        INSERT INTO audit_events (entity_type, entity_id, action, before_json, after_json, actor_admin_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
    const values = [
        data.entity_type,
        data.entity_id,
        data.action,
        data.before_json ? JSON.stringify(data.before_json) : null,
        data.after_json ? JSON.stringify(data.after_json) : null,
        data.actor_admin_id || null
    ];
    const res = await query<AuditEvent>(sql, values);
    return res.rows[0];
}

/**
 * Get audit log for an entity
 */
export async function getAuditLog(entityType: string, entityId: string): Promise<AuditEvent[]> {
    const res = await query<AuditEvent>(
        'SELECT * FROM audit_events WHERE entity_type = $1 AND entity_id = $2 ORDER BY created_at DESC',
        [entityType, entityId]
    );
    return res.rows;
}

/**
 * Lead Scoring
 */
export function calculateLeadScore(lead: Partial<LeadData>): number {
    let score = 0;

    // Budget weighting
    const budget = lead.budget_range || '';
    if (budget.includes('30k_plus') || budget.includes('10k_plus')) score += 40;
    else if (budget.includes('10k') || budget.includes('3k_10k')) score += 25;
    else if (budget.includes('3k') || budget.includes('1k_3k')) score += 10;

    // Timeline weighting
    const timeline = lead.desired_deadline || '';
    if (timeline === 'asap') score += 30;
    else if (timeline === '1_month') score += 20;
    else if (timeline === '2_3_months') score += 10;

    // Service fit
    const service = lead.service_interest || '';
    if (service === 'automation' || service === 'custom') score += 20;
    else if (service === 'ecommerce') score += 15;
    else if (service === 'landing') score += 10;

    // Source weighting
    const source = lead.source || '';
    if (source && (source.includes('direct') || source.includes('referral'))) score += 10;

    return Math.min(100, score);
}

/**
 * Get all leads (for admin panel)
 */
export async function getAllLeads(limit = 100, offset = 0): Promise<LeadData[]> {
    const result = await query<LeadData>(
        `SELECT * FROM leads ORDER BY updated_at DESC LIMIT $1 OFFSET $2`,
        [limit, offset]
    );

    return result.rows;
}

/**
 * Update lead status
 */
export async function updateLeadStatus(
    phone: string,
    status: LeadStatus
): Promise<void> {
    await query(
        `UPDATE leads SET status = $1, updated_at = NOW() WHERE phone = $2`,
        [status, phone]
    );
}

/**
 * Add message to conversation history
 */
export async function addMessageToHistory(
    phone: string,
    message: ConversationMessage
): Promise<void> {
    const lead = await getLeadByIdentifier({ phone });

    if (!lead) {
        throw new Error(`Lead with phone ${phone} not found`);
    }

    const history = lead.conversation_history || [];
    history.push(message);

    await query(
        `UPDATE leads SET conversation_history = $1, updated_at = NOW() WHERE phone = $2`,
        [JSON.stringify(history), phone]
    );
}
