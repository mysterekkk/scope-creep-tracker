import type { Project } from '@/types/project';
import type { Task } from '@/types/task';
import type { TimeEntry } from '@/types/time';
import type { ClientMessage } from '@/types/message';
import type { ScopeReport } from '@/types/scope';
import { calculateBudgetBurnRate, calculateOutOfScopeCost } from './budget';
import {
  getTotalProjectHours,
  getInScopeHours,
  getOutOfScopeHours,
  getHoursOverrun,
} from './hours';
import { detectScopeCreep } from '../detection/scope-detector';

export function calculateScopeCreepPercent(
  outOfScopeHours: number,
  originalEstimatedHours: number
): number {
  if (originalEstimatedHours === 0) return 0;
  return (outOfScopeHours / originalEstimatedHours) * 100;
}

export function generateScopeReport(
  project: Project,
  tasks: Task[],
  timeEntries: TimeEntry[],
  messages: ClientMessage[]
): ScopeReport {
  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const projectEntries = timeEntries.filter((e) => e.projectId === project.id);

  const inScopeTasks = projectTasks.filter((t) => t.scopeFlag === 'in-scope');
  const outOfScopeTasks = projectTasks.filter(
    (t) => t.scopeFlag === 'out-of-scope'
  );

  const originalEstimatedHours = inScopeTasks.reduce(
    (sum, t) => sum + t.estimatedHours,
    0
  );
  const currentEstimatedHours = projectTasks.reduce(
    (sum, t) => sum + t.estimatedHours,
    0
  );

  const totalActualHours = getTotalProjectHours(project.id, projectEntries);
  const inScopeActualHours = getInScopeHours(projectTasks, projectEntries);
  const outOfScopeActualHours = getOutOfScopeHours(
    projectTasks,
    projectEntries
  );

  const overrunHours = projectTasks.reduce(
    (sum, t) => sum + getHoursOverrun(t.estimatedHours, t.actualHours),
    0
  );

  const additionalCost = calculateOutOfScopeCost(
    outOfScopeActualHours,
    project.hourlyRate
  );

  const changes = detectScopeCreep(
    projectTasks,
    projectEntries,
    messages.filter((m) => m.projectId === project.id),
    project.hourlyRate
  );

  return {
    projectId: project.id,
    originalTaskCount: inScopeTasks.length,
    currentTaskCount: projectTasks.length,
    outOfScopeTaskCount: outOfScopeTasks.length,
    originalEstimatedHours,
    currentEstimatedHours,
    totalActualHours,
    inScopeActualHours,
    outOfScopeActualHours,
    budgetUsedPercent: calculateBudgetBurnRate(project, totalActualHours),
    scopeCreepPercent: calculateScopeCreepPercent(
      outOfScopeActualHours,
      originalEstimatedHours
    ),
    overrunHours,
    additionalCost,
    changes,
  };
}
