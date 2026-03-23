import type { Project } from '@/types/project';
import type { Task } from '@/types/task';
import type { TimeEntry } from '@/types/time';
import { aggregateTaskHours, getHoursOverrun } from '../calculations/hours';

export interface OutOfScopeItem {
  title: string;
  description: string;
  estimatedHours: number;
  actualHours: number;
  overrunHours: number;
  cost: number;
}

export interface ChangeRequestTotals {
  totalOutOfScopeHours: number;
  totalOverrunHours: number;
  totalAdditionalCost: number;
  itemCount: number;
}

export interface ProjectInfo {
  name: string;
  clientName: string;
  currency: string;
  hourlyRate: number;
  budgetType: string;
  budgetAmount: number;
}

export interface ChangeRequestData {
  outOfScopeItems: OutOfScopeItem[];
  totals: ChangeRequestTotals;
  projectInfo: ProjectInfo;
}

export function getChangeRequestData(
  project: Project,
  tasks: Task[],
  timeEntries: TimeEntry[],
  hourlyRate: number
): ChangeRequestData {
  const outOfScopeTasks = tasks.filter(
    (t) => t.projectId === project.id && t.scopeFlag === 'out-of-scope'
  );

  const outOfScopeItems: OutOfScopeItem[] = outOfScopeTasks.map((task) => {
    const actualHours = aggregateTaskHours(task.id, timeEntries);
    const overrunHours = getHoursOverrun(task.estimatedHours, actualHours);

    return {
      title: task.title,
      description: task.description,
      estimatedHours: task.estimatedHours,
      actualHours,
      overrunHours,
      cost: actualHours * hourlyRate,
    };
  });

  const totals: ChangeRequestTotals = {
    totalOutOfScopeHours: outOfScopeItems.reduce(
      (sum, item) => sum + item.actualHours,
      0
    ),
    totalOverrunHours: outOfScopeItems.reduce(
      (sum, item) => sum + item.overrunHours,
      0
    ),
    totalAdditionalCost: outOfScopeItems.reduce(
      (sum, item) => sum + item.cost,
      0
    ),
    itemCount: outOfScopeItems.length,
  };

  const projectInfo: ProjectInfo = {
    name: project.name,
    clientName: project.clientName,
    currency: project.currency,
    hourlyRate: project.hourlyRate,
    budgetType: project.budgetType,
    budgetAmount: project.budgetAmount,
  };

  return {
    outOfScopeItems,
    totals,
    projectInfo,
  };
}
