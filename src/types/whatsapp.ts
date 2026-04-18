// Types for WhatsApp AI Agent System

export type LeadStatus =
    | 'new'
    | 'qualifying'
    | 'meeting_suggested'
    | 'meeting_scheduled'
    | 'human_handoff';

export interface LeadData {
    id?: string;
    phone: string;
    name?: string | null;
    service_interest?: string | null;
    desired_deadline?: string | null;
    budget_range?: string | null;
    notes?: string | null;
    status: LeadStatus;
    conversation_history?: ConversationMessage[];
    last_message_id?: string | null; // For webhook idempotency

    // Anti-spam cache fields
    last_inbound_at?: Date | null;
    last_user_text_norm?: string | null;
    last_agent_reply?: string | null;
    last_agent_reply_at?: Date | null;

    created_at?: Date;
    updated_at?: Date;
}

export interface ConversationMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export type LLMActionType =
    | 'upsert_lead'
    | 'ask_clarifying'
    | 'suggest_services'
    | 'offer_calendar_slots'
    | 'create_calendar_event'
    | 'handoff_human';

export interface LLMAction {
    type: LLMActionType;
    data?: Record<string, unknown>;
}

export interface LLMResponse {
    reply: string;
    actions: LLMAction[];
    lead_patch?: Partial<LeadData>;
    confidence: number;
}

// Z-API Webhook Types
export interface ZAPIWebhookPayload {
    instanceId?: string;
    messageId?: string;
    phone?: string;
    fromMe?: boolean;
    momment?: number;
    status?: string;
    chatName?: string;
    senderPhoto?: string;
    senderName?: string;
    participantPhone?: string | null;
    participantName?: string | null;
    photo?: string;
    broadcast?: boolean;
    type?: string;
    text?: {
        message?: string;
    };
    image?: {
        caption?: string;
        imageUrl?: string;
        thumbnailUrl?: string;
        mimeType?: string;
    };
    audio?: {
        audioUrl?: string;
        mimeType?: string;
    };
    video?: {
        caption?: string;
        videoUrl?: string;
        mimeType?: string;
    };
    contact?: {
        displayName?: string;
        vcard?: string;
    };
    document?: {
        documentUrl?: string;
        mimeType?: string;
        title?: string;
        pageCount?: number;
    };
    location?: {
        latitude?: number;
        longitude?: number;
        address?: string;
        url?: string;
    };
    isStatusReply?: boolean;
    isNewsletter?: boolean;
    waitingMessage?: boolean;
    isGroup?: boolean;
}

// Z-API Send Message Request
export interface ZAPISendMessageRequest {
    phone: string;
    message: string;
}

export interface ZAPISendMessageResponse {
    zaapId: string;
    messageId: string;
    id: string;
}
