export type ScopeChangeType = 'new-task' | 'hours-overrun' | 'client-request';

export interface ScopeChange {
  id: string;
  projectId: string;
  type: ScopeChangeType;
  sourceId: string;
  description: string;
  detectedAt: string;
  additionalHours: number;
  additionalCost: number;
}

export interface ScopeReport {
  projectId: string;
  originalTaskCount: number;
  currentTaskCount: number;
  outOfScopeTaskCount: number;
  originalEstimatedHours: number;
  currentEstimatedHours: number;
  totalActualHours: number;
  inScopeActualHours: number;
  outOfScopeActualHours: number;
  budgetUsedPercent: number;
  scopeCreepPercent: number;
  overrunHours: number;
  additionalCost: number;
  changes: ScopeChange[];
}
