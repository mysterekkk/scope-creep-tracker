import { nanoid } from 'nanoid';
import type { Task } from '@/types/task';
import type { TimeEntry } from '@/types/time';
import type { ClientMessage } from '@/types/message';
import type { ScopeChange } from '@/types/scope';
import { aggregateTaskHours } from '../calculations/hours';

export function detectScopeCreep(
  tasks: Task[],
  timeEntries: TimeEntry[],
  messages: ClientMessage[],
  hourlyRate: number
): ScopeChange[] {
  const changes: ScopeChange[] = [];
  const now = new Date().toISOString();

  // 1. Out-of-scope tasks
  for (const task of tasks) {
    if (task.scopeFlag === 'out-of-scope') {
      const actualHours = aggregateTaskHours(task.id, timeEntries);
      changes.push({
        id: nanoid(),
        projectId: task.projectId,
        type: 'new-task',
        sourceId: task.id,
        description: `Out-of-scope task: ${task.title}`,
        detectedAt: now,
        additionalHours: actualHours,
        additionalCost: actualHours * hourlyRate,
      });
    }
  }

  // 2. Hours overruns
  for (const task of tasks) {
    const actualHours = aggregateTaskHours(task.id, timeEntries);
    const overrun = actualHours - task.estimatedHours;
    if (overrun > 0) {
      changes.push({
        id: nanoid(),
        projectId: task.projectId,
        type: 'hours-overrun',
        sourceId: task.id,
        description: `Hours overrun on task: ${task.title} (${overrun.toFixed(1)}h over estimate)`,
        detectedAt: now,
        additionalHours: overrun,
        additionalCost: overrun * hourlyRate,
      });
    }
  }

  // 3. Client requests flagged as scope creep
  for (const message of messages) {
    if (message.scopeCreepFlag !== 'none') {
      changes.push({
        id: nanoid(),
        projectId: message.projectId,
        type: 'client-request',
        sourceId: message.id,
        description: `Client request flagged as scope creep: "${message.text.slice(0, 80)}${message.text.length > 80 ? '...' : ''}"`,
        detectedAt: now,
        additionalHours: 0,
        additionalCost: 0,
      });
    }
  }

  return changes;
}
