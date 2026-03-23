import { describe, it, expect } from 'vitest';
import { detectScopeCreep } from '@/lib/detection/scope-detector';
import type { Task } from '@/types/task';
import type { TimeEntry } from '@/types/time';
import type { ClientMessage } from '@/types/message';

const tasks: Task[] = [
  { id: 't1', projectId: 'p1', title: 'In scope task', description: '', estimatedHours: 5, actualHours: 5, status: 'done', scopeFlag: 'in-scope', createdAt: '', updatedAt: '', order: 0 },
  { id: 't2', projectId: 'p1', title: 'Out of scope task', description: '', estimatedHours: 3, actualHours: 4, status: 'done', scopeFlag: 'out-of-scope', createdAt: '', updatedAt: '', order: 1 },
  { id: 't3', projectId: 'p1', title: 'Overrun task', description: '', estimatedHours: 2, actualHours: 8, status: 'done', scopeFlag: 'in-scope', createdAt: '', updatedAt: '', order: 2 },
];

const entries: TimeEntry[] = [
  { id: 'e1', taskId: 't2', projectId: 'p1', startTime: '', endTime: '', durationMinutes: 240, note: '', isManual: false },
  { id: 'e2', taskId: 't3', projectId: 'p1', startTime: '', endTime: '', durationMinutes: 480, note: '', isManual: false },
];

const messages: ClientMessage[] = [
  { id: 'm1', projectId: 'p1', date: '2026-01-15', text: 'Add a newsletter', scopeCreepFlag: 'auto-detected', linkedTaskId: null, createdAt: '' },
  { id: 'm2', projectId: 'p1', date: '2026-01-16', text: 'Looks good!', scopeCreepFlag: 'none', linkedTaskId: null, createdAt: '' },
];

describe('detectScopeCreep', () => {
  it('detects out-of-scope tasks', () => {
    const changes = detectScopeCreep(tasks, entries, messages, 50);
    const newTaskChanges = changes.filter(c => c.type === 'new-task');
    expect(newTaskChanges.length).toBe(1);
    expect(newTaskChanges[0].sourceId).toBe('t2');
  });

  it('detects hours overrun', () => {
    const changes = detectScopeCreep(tasks, entries, messages, 50);
    const overrunChanges = changes.filter(c => c.type === 'hours-overrun');
    // t2: 4h actual (240min entry) - 3h estimated = 1h overrun
    // t3: 8h actual (480min entry) - 2h estimated = 6h overrun
    expect(overrunChanges.length).toBe(2);
    const t3Overrun = overrunChanges.find(c => c.sourceId === 't3');
    expect(t3Overrun?.additionalHours).toBe(6);
  });

  it('detects client request scope creep', () => {
    const changes = detectScopeCreep(tasks, entries, messages, 50);
    const clientChanges = changes.filter(c => c.type === 'client-request');
    expect(clientChanges.length).toBe(1);
  });

  it('ignores non-flagged messages', () => {
    const changes = detectScopeCreep(tasks, entries, [messages[1]], 50);
    const clientChanges = changes.filter(c => c.type === 'client-request');
    expect(clientChanges.length).toBe(0);
  });
});
