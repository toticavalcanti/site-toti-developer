import { ProjectType, Timeline } from './qualification-schema';

export const projectTypeLabels: Record<ProjectType, string> = {
  landing: 'project_landing',
  ecommerce: 'project_ecommerce',
  automation: 'project_automation',
  custom: 'project_custom',
  not_sure: 'project_not_sure',
};

export const timelineLabels: Record<Timeline, string> = {
  asap: 'timeline_asap',
  '1_month': 'timeline_1_month',
  '2_3_months': 'timeline_2_3_months',
  no_rush: 'timeline_no_rush',
};

export const budgetBrlLabels: Record<string, string> = {
  under_3k: 'budget_under_3k',
  '3k_10k': 'budget_3k_10k',
  '10k_30k': 'budget_10k_30k',
  '30k_plus': 'budget_30k_plus',
  undefined: 'budget_undefined',
};

export const budgetUsdLabels: Record<string, string> = {
  under_1k: 'budget_under_1k',
  '1k_3k': 'budget_1k_3k',
  '3k_10k': 'budget_3k_10k',
  '10k_plus': 'budget_10k_plus',
  undefined: 'budget_undefined',
};
