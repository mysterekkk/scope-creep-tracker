import type { Task } from '@/types/task';
import type { TimeEntry } from '@/types/time';

export function aggregateTaskHours(
  taskId: string,
  timeEntries: TimeEntry[]
): number {
  return timeEntries
    .filter((entry) => entry.taskId === taskId)
    .reduce((sum, entry) => sum + entry.durationMinutes, 0) / 60;
}

export function getHoursOverrun(
  estimatedHours: number,
  actualHours: number
): number {
  return Math.max(0, actualHours - estimatedHours);
}

export function getTotalProjectHours(
  projectId: string,
  timeEntries: TimeEntry[]
): number {
  return timeEntries
    .filter((entry) => entry.projectId === projectId)
    .reduce((sum, entry) => sum + entry.durationMinutes, 0) / 60;
}

export function getInScopeHours(
  tasks: Task[],
  timeEntries: TimeEntry[]
): number {
  const inScopeTaskIds = new Set(
    tasks.filter((t) => t.scopeFlag === 'in-scope').map((t) => t.id)
  );

  return timeEntries
    .filter((entry) => inScopeTaskIds.has(entry.taskId))
    .reduce((sum, entry) => sum + entry.durationMinutes, 0) / 60;
}

export function getOutOfScopeHours(
  tasks: Task[],
  timeEntries: TimeEntry[]
): number {
  const outOfScopeTaskIds = new Set(
    tasks.filter((t) => t.scopeFlag === 'out-of-scope').map((t) => t.id)
  );

  return timeEntries
    .filter((entry) => outOfScopeTaskIds.has(entry.taskId))
    .reduce((sum, entry) => sum + entry.durationMinutes, 0) / 60;
}
