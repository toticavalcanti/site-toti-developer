import { query } from './db';
import type { LeadData, ConversationMessage, LeadStatus } from '../types/whatsapp';

/**
 * Get lead by phone number
 */
export async function getLeadByPhone(phone: string): Promise<LeadData | null> {
    const result = await query<LeadData>(
        `SELECT * FROM leads WHERE phone = $1`,
        [phone]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

/**
 * Create or update lead (UPSERT)
 */
export async function upsertLead(
    phone: string,
    patch: Partial<LeadData>
): Promise<LeadData> {
    const existing = await getLeadByPhone(phone);

    if (existing) {
        // UPDATE existing lead
        const updates: string[] = [];
        const values: unknown[] = [];
        let paramIndex = 1;

        if (patch.name !== undefined) {
            updates.push(`name = $${paramIndex++}`);
            values.push(patch.name);
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

        updates.push(`updated_at = NOW()`);
        values.push(phone); // WHERE condition

        const sql = `
      UPDATE leads 
      SET ${updates.join(', ')}
      WHERE phone = $${paramIndex}
      RETURNING *
    `;

        const result = await query<LeadData>(sql, values);
        return result.rows[0];
    } else {
        // INSERT new lead
        const sql = `
      INSERT INTO leads (
        phone, 
        name, 
        service_interest, 
        desired_deadline, 
        budget_range, 
        notes, 
        status, 
        conversation_history,
        last_message_id,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING *
    `;

        const values = [
            phone,
            patch.name || null,
            patch.service_interest || null,
            patch.desired_deadline || null,
            patch.budget_range || null,
            patch.notes || null,
            patch.status || 'new',
            JSON.stringify(patch.conversation_history || []),
            patch.last_message_id || null,
        ];

        const result = await query<LeadData>(sql, values);
        return result.rows[0];
    }
}

/**
 * Add message to conversation history
 */
export async function addMessageToHistory(
    phone: string,
    message: ConversationMessage
): Promise<void> {
    const lead = await getLeadByPhone(phone);

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
