import type { Task } from '@/types/task';
import { getHoursOverrun } from '../calculations/hours';

export function generateTasksCsv(tasks: Task[], hourlyRate: number): string {
  const headers = [
    'title',
    'description',
    'estimatedHours',
    'actualHours',
    'status',
    'scopeFlag',
    'overrunHours',
    'overrunCost',
  ];

  const rows = tasks.map((task) => {
    const overrunHours = getHoursOverrun(task.estimatedHours, task.actualHours);
    const overrunCost = overrunHours * hourlyRate;

    return [
      escapeCsvField(task.title),
      escapeCsvField(task.description),
      task.estimatedHours.toString(),
      task.actualHours.toString(),
      task.status,
      task.scopeFlag,
      overrunHours.toFixed(2),
      overrunCost.toFixed(2),
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

function escapeCsvField(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
