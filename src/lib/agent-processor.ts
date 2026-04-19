import type { ConversationMessage, LeadData } from '../types/whatsapp';
import { getLeadByIdentifier, upsertLead, addMessageToHistory } from './leads';
import { callLLM } from './llm'; // New LLM router
import { SYSTEM_PROMPT } from './prompts';
import { executeActions } from './action-executor';
import {
    checkGuardrails,
    checkFAQ,
    checkDuplicate,
} from './cost-controls';
import { incrementMetric } from './metrics';
import { detectWebSearchNeed, searchWeb } from './websearch/tavily';
import { getKnowledgeBaseForLLM } from '../agent/knowledge/loader';

const MAX_HISTORY_MESSAGES = 10; // Keep last 10 messages for context

/**
 * Process incoming WhatsApp message and generate response
 */
export async function processMessage(
    phone: string,
    message: string
): Promise<string> {
    try {
        console.log('[Agent] Processing message from:', phone);

        // Get or create lead
        let lead = await getLeadByIdentifier({ phone });

        if (!lead) {
            // Create new lead
            lead = await upsertLead(phone, {
                phone,
                status: 'new',
                conversation_history: [],
            });
        }

        // Add user message to history
        const userMessage: ConversationMessage = {
            role: 'user',
            content: message,
            timestamp: new Date().toISOString(),
        };

        await addMessageToHistory(phone, userMessage);

        // ============================================
        // COST CONTROLS - Check before calling LLM
        // ============================================

        // 1. Guardrails - block if out of scope
        const guardrailResult = checkGuardrails(message, lead);
        if (guardrailResult.blocked) {
            console.log('[Agent] Guardrail blocked:', guardrailResult.reason);

            // Add fallback response to history
            const fallbackMessage: ConversationMessage = {
                role: 'assistant',
                content: guardrailResult.fallbackResponse!,
                timestamp: new Date().toISOString(),
            };
            await addMessageToHistory(phone, fallbackMessage);

            return guardrailResult.fallbackResponse!;
        }

        // 2. FAQ Cache - check for common questions
        const faqResult = checkFAQ(message);
        if (faqResult.isFAQ) {
            console.log('[Agent] FAQ hit');

            // If budget value detected, save to lead
            if (faqResult.budgetValue) {
                await upsertLead(phone, {
                    budget_range: `R$ ${faqResult.budgetValue}`,
                });
                console.log('[Agent] Budget saved from FAQ:', faqResult.budgetValue);
            }

            // Add FAQ response to history
            const faqMessage: ConversationMessage = {
                role: 'assistant',
                content: faqResult.response!,
                timestamp: new Date().toISOString(),
            };
            await addMessageToHistory(phone, faqMessage);

            return faqResult.response!;
        }

        // 3. Duplicate Detection - check for repeated questions
        const duplicateResult = checkDuplicate(message, lead);
        if (duplicateResult.isDuplicate && duplicateResult.cachedResponse) {
            console.log('[Agent] Duplicate detected - using cached response');

            // Already in history, just return cached response
            return duplicateResult.cachedResponse;
        }

        // ============================================
        // LLM CALL - All cost controls passed
        // ============================================

        // Build conversation context (last N messages)
        const conversationHistory = lead.conversation_history || [];
        const recentHistory = conversationHistory.slice(-MAX_HISTORY_MESSAGES);

        // Build messages for LLM
        const messages = [
            { role: 'system' as const, content: SYSTEM_PROMPT },
            ...recentHistory.map(msg => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
            })),
            { role: 'user' as const, content: message },
        ];

        // Add lead context to system prompt
        const leadContext = buildLeadContext(lead);
        if (leadContext) {
            messages[0].content += `\n\n## CONTEXTO DO LEAD ATUAL\n${leadContext}`;
        }

        // Inject knowledge base
        const knowledgeBase = getKnowledgeBaseForLLM();
        messages[0].content += `\n\n## CATÁLOGO DE SERVIÇOS (FONTE DA VERDADE)\n${knowledgeBase}`;

        // Detect and execute web search if needed
        if (detectWebSearchNeed(message)) {
            try {
                const searchResults = await searchWeb(message);
                if (searchResults) {
                    messages[0].content += `\n\n## CONTEXTO EXTERNO (resumo de busca web)\n${searchResults}`;
                    console.log('[Agent] Web search context injected');
                }
            } catch (error) {
                console.error('[Agent] Web search failed:', error);
                // Continue without web search context
            }
        }

        // Call LLM
        const llmResponse = await callLLM({ messages });

        // Track LLM call in metrics (async, non-blocking)
        incrementMetric('llm_calls').catch(() => { });

        // Execute actions
        await executeActions(llmResponse.actions, {
            phone,
            currentLead: lead,
            leadPatch: llmResponse.lead_patch,
        });

        // Update lead with patch from LLM (if any)
        if (llmResponse.lead_patch && Object.keys(llmResponse.lead_patch).length > 0) {
            await upsertLead(phone, llmResponse.lead_patch);
        }

        // Add assistant response to history
        const assistantMessage: ConversationMessage = {
            role: 'assistant',
            content: llmResponse.reply,
            timestamp: new Date().toISOString(),
        };

        await addMessageToHistory(phone, assistantMessage);

        console.log('[Agent] Response generated:', {
            phone,
            confidence: llmResponse.confidence,
            actions: llmResponse.actions.length,
        });

        return llmResponse.reply;
    } catch (error) {
        console.error('[Agent] Error processing message:', error);

        // Fallback response
        return 'Desculpe, tive um problema técnico. Pode repetir sua mensagem?';
    }
}

/**
 * Build lead context string for system prompt
 */
function buildLeadContext(lead: LeadData): string {
    const parts: string[] = [];

    if (lead.name) {
        parts.push(`Nome: ${lead.name} `);
    }
    if (lead.service_interest) {
        parts.push(`Interesse: ${lead.service_interest} `);
    }
    if (lead.desired_deadline) {
        parts.push(`Prazo: ${lead.desired_deadline} `);
    }
    if (lead.budget_range) {
        parts.push(`Orçamento: ${lead.budget_range} `);
    }
    if (lead.notes) {
        parts.push(`Notas: ${lead.notes} `);
    }
    if (lead.status) {
        parts.push(`Status atual: ${lead.status} `);
    }

    return parts.join('\n');
}
