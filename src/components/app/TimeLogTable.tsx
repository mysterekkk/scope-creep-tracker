'use client';

import { useTimeStore } from '@/stores/time-store';
import { useTaskStore } from '@/stores/task-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface TimeLogTableProps {
  projectId: string;
}

export function TimeLogTable({ projectId }: TimeLogTableProps) {
  const entries = useTimeStore((s) => s.getProjectEntries(projectId));
  const deleteEntry = useTimeStore((s) => s.deleteEntry);
  const tasks = useTaskStore((s) => s.getProjectTasks(projectId));

  const taskMap = new Map(tasks.map((t) => [t.id, t.title]));

  const sorted = [...entries].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );

  function formatDuration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  if (sorted.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No time entries yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2 pr-4 font-medium">Date</th>
            <th className="py-2 pr-4 font-medium">Task</th>
            <th className="py-2 pr-4 font-medium">Duration</th>
            <th className="py-2 pr-4 font-medium">Note</th>
            <th className="py-2 pr-4 font-medium">Type</th>
            <th className="py-2 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry) => (
            <tr key={entry.id} className="border-b">
              <td className="py-2 pr-4">
                {new Date(entry.startTime).toLocaleDateString()}
              </td>
              <td className="py-2 pr-4">
                {taskMap.get(entry.taskId) ?? 'Unknown'}
              </td>
              <td className="py-2 pr-4">{formatDuration(entry.durationMinutes)}</td>
              <td className="py-2 pr-4 text-muted-foreground truncate max-w-[200px]">
                {entry.note || '-'}
              </td>
              <td className="py-2 pr-4">
                <Badge variant={entry.isManual ? 'secondary' : 'default'}>
                  {entry.isManual ? 'Manual' : 'Timer'}
                </Badge>
              </td>
              <td className="py-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => deleteEntry(entry.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
