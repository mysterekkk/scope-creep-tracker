import { describe, it, expect } from 'vitest';
import {
  aggregateTaskHours,
  getHoursOverrun,
  getTotalProjectHours,
  getInScopeHours,
  getOutOfScopeHours,
} from '@/lib/calculations/hours';
import type { TimeEntry } from '@/types/time';
import type { Task } from '@/types/task';

const entries: TimeEntry[] = [
  { id: '1', taskId: 't1', projectId: 'p1', startTime: '', endTime: '', durationMinutes: 60, note: '', isManual: false },
  { id: '2', taskId: 't1', projectId: 'p1', startTime: '', endTime: '', durationMinutes: 30, note: '', isManual: false },
  { id: '3', taskId: 't2', projectId: 'p1', startTime: '', endTime: '', durationMinutes: 120, note: '', isManual: false },
];

const tasks: Task[] = [
  { id: 't1', projectId: 'p1', title: 'A', description: '', estimatedHours: 1, actualHours: 1.5, status: 'done', scopeFlag: 'in-scope', createdAt: '', updatedAt: '', order: 0 },
  { id: 't2', projectId: 'p1', title: 'B', description: '', estimatedHours: 1, actualHours: 2, status: 'done', scopeFlag: 'out-of-scope', createdAt: '', updatedAt: '', order: 1 },
];

describe('aggregateTaskHours', () => {
  it('sums hours for a task', () => {
    expect(aggregateTaskHours('t1', entries)).toBe(1.5);
  });

  it('returns 0 for unknown task', () => {
    expect(aggregateTaskHours('unknown', entries)).toBe(0);
  });
});

describe('getHoursOverrun', () => {
  it('returns positive overrun', () => {
    expect(getHoursOverrun(1, 2.5)).toBe(1.5);
  });

  it('returns 0 when under estimate', () => {
    expect(getHoursOverrun(10, 5)).toBe(0);
  });
});

describe('getTotalProjectHours', () => {
  it('sums all project hours', () => {
    expect(getTotalProjectHours('p1', entries)).toBe(3.5);
  });
});

describe('getInScopeHours', () => {
  it('sums only in-scope task hours', () => {
    expect(getInScopeHours(tasks, entries)).toBe(1.5);
  });
});

describe('getOutOfScopeHours', () => {
  it('sums only out-of-scope task hours', () => {
    expect(getOutOfScopeHours(tasks, entries)).toBe(2);
  });
});
