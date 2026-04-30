import { z } from 'zod';

export const projectTypeEnum = z.enum(['landing', 'ecommerce', 'automation', 'custom', 'audit', 'not_sure']);
export const timelineEnum = z.enum(['asap', '1_month', '2_3_months', 'no_rush']);
export const budgetBrlEnum = z.enum(['under_3k', '3k_10k', '10k_30k', '30k_plus', 'undefined']);
export const budgetUsdEnum = z.enum(['under_1k', '1k_3k', '3k_10k', '10k_plus', 'undefined']);

export const leadStageEnum = z.enum(['submitted', 'whatsapp_handoff', 'modal_abandoned']);
export type LeadStage = z.infer<typeof leadStageEnum>;

export const qualificationBase = z.object({
  projectType: projectTypeEnum,
  budget: z.string(), // validated against budgetBrlEnum | budgetUsdEnum based on locale at runtime
  timeline: timelineEnum,
  name: z.string().min(2).optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  whatsapp: z.string().optional().or(z.literal('')),
  message: z.string().max(500).optional().or(z.literal('')),
  locale: z.enum(['pt', 'en']),
  source: z.string(), // e.g. 'hero', 'package_card', 'cta_section'
  stage: leadStageEnum,
});

// Stricter variant for full form submission (requires name + email)
export const qualificationSubmittedSchema = qualificationBase.extend({
  name: z.string().min(2),
  email: z.string().email(),
  stage: z.literal('submitted'),
});

// Lenient variant for partial saves (name/email optional)
export const qualificationPartialSchema = qualificationBase.extend({
  stage: z.union([z.literal('whatsapp_handoff'), z.literal('modal_abandoned')]),
});

export type ProjectType = z.infer<typeof projectTypeEnum>;
export type Timeline = z.infer<typeof timelineEnum>;
export type BudgetBrl = z.infer<typeof budgetBrlEnum>;
export type BudgetUsd = z.infer<typeof budgetUsdEnum>;
export type QualificationBase = z.infer<typeof qualificationBase>;
export type QualificationSubmitted = z.infer<typeof qualificationSubmittedSchema>;
export type QualificationPartial = z.infer<typeof qualificationPartialSchema>;
