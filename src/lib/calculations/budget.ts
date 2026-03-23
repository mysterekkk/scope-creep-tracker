import type { Project } from '@/types/project';

export function calculateBudgetBurnRate(
  project: Project,
  totalActualHours: number
): number {
  if (project.budgetAmount === 0) return 0;

  if (project.budgetType === 'hours') {
    return (totalActualHours / project.budgetAmount) * 100;
  }

  return (totalActualHours * project.hourlyRate / project.budgetAmount) * 100;
}

export function calculateTotalCost(
  totalHours: number,
  hourlyRate: number
): number {
  return totalHours * hourlyRate;
}

export function calculateOutOfScopeCost(
  outOfScopeHours: number,
  hourlyRate: number
): number {
  return outOfScopeHours * hourlyRate;
}

export function calculateRemainingBudget(
  project: Project,
  totalActualHours: number
): number {
  if (project.budgetType === 'hours') {
    return project.budgetAmount - totalActualHours;
  }

  return project.budgetAmount - totalActualHours * project.hourlyRate;
}
