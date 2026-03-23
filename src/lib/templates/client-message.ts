import type { Project } from '@/types/project';
import type { ScopeReport } from '@/types/scope';

export function generateClientMessage(
  project: Project,
  scopeReport: ScopeReport
): string {
  return `Subject: Scope Change Request — ${project.name}

Dear ${project.clientName},

During our work on ${project.name}, we identified ${scopeReport.outOfScopeTaskCount} items that fall outside the originally agreed scope.

Summary:
- Original scope: ${scopeReport.originalTaskCount} tasks (${scopeReport.originalEstimatedHours}h)
- Additional items: ${scopeReport.outOfScopeTaskCount} tasks (${scopeReport.outOfScopeActualHours.toFixed(1)}h)
- Additional cost: ${scopeReport.additionalCost.toFixed(2)} ${project.currency}

Please find the detailed change request attached.

Best regards`;
}
