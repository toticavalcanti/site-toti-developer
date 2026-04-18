import servicesData from './services.json';

export interface ServicePricing {
    model: string;
    ranges: Array<{
        name: string;
        price: string;
        description: string;
        timeline?: string;
        breakdown?: string[];
    }>;
    discounts?: string[];
    examples?: string[];
    equipment?: {
        note: string;
        packages: Array<{
            name: string;
            price: string;
            includes?: string;
        }>;
    };
}

export interface Service {
    id: string;
    name: string;
    category: string;
    short_description: string;
    status?: string;
    pricing: ServicePricing;
    timeline: string;
    includes: string[];
    essential_questions: string[];
    styles_note?: string;
    use_cases?: string[];
    ideal_for?: string[];
}

export interface Package {
    name: string;
    description: string;
    price: string;
    includes: string[];
    highlight?: boolean;
    status?: string;
}

export interface AgentRules {
    tone: string;
    message_format: string;
    pricing_rule: string;
    missing_price_rule: string;
    qualification_flow: string[];
    never_do: string[];
}

export interface KnowledgeBase {
    version: string;
    last_updated: string;
    source: string;
    services: Service[];
    packages: Package[];
    agent_rules: AgentRules;
}

let cachedKnowledgeBase: KnowledgeBase | null = null;

/**
 * Load knowledge base from JSON file
 * Cached in memory for performance
 */
export function loadKnowledgeBase(): KnowledgeBase {
    if (!cachedKnowledgeBase) {
        cachedKnowledgeBase = servicesData as KnowledgeBase;
    }
    return cachedKnowledgeBase;
}

/**
 * Get service by ID
 */
export function getServiceById(id: string): Service | undefined {
    const kb = loadKnowledgeBase();
    return kb.services.find(s => s.id === id);
}

/**
 * Get services by category
 */
export function getServicesByCategory(category: string): Service[] {
    const kb = loadKnowledgeBase();
    return kb.services.filter(s => s.category === category);
}

/**
 * Search services by keyword
 */
export function searchServices(keyword: string): Service[] {
    const kb = loadKnowledgeBase();
    const lowerKeyword = keyword.toLowerCase();

    return kb.services.filter(s =>
        s.name.toLowerCase().includes(lowerKeyword) ||
        s.short_description.toLowerCase().includes(lowerKeyword) ||
        s.category.toLowerCase().includes(lowerKeyword)
    );
}

/**
 * Get formatted knowledge base for LLM context
 * Returns a concise string representation
 */
export function getKnowledgeBaseForLLM(): string {
    const kb = loadKnowledgeBase();

    // Create a concise summary for the LLM
    const summary = {
        services: kb.services.map(s => ({
            id: s.id,
            name: s.name,
            description: s.short_description,
            pricing_model: s.pricing.model,
            price_ranges: s.pricing.ranges.map(r => `${r.name}: ${r.price}`),
            timeline: s.timeline,
            status: s.status
        })),
        packages: kb.packages,
        rules: kb.agent_rules
    };

    return JSON.stringify(summary, null, 2);
}
