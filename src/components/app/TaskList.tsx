'use client';

import { useState } from 'react';
import type { ScopeFlag } from '@/types/task';
import { useTaskStore } from '@/stores/task-store';
import { Button } from '@/components/ui/button';
import { TaskRow } from './TaskRow';
import { TaskForm } from './TaskForm';

interface TaskListProps {
  projectId: string;
  projectStartDate: string;
}

type Filter = 'all' | ScopeFlag;

export function TaskList({ projectId, projectStartDate }: TaskListProps) {
  const tasks = useTaskStore((s) => s.getProjectTasks(projectId));
  const [filter, setFilter] = useState<Filter>('all');
  const [showForm, setShowForm] = useState(false);

  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter((t) => t.scopeFlag === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(['all', 'in-scope', 'out-of-scope'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f === 'in-scope' ? 'In Scope' : 'Out of Scope'}
            </Button>
          ))}
        </div>
        <Button onClick={() => setShowForm(true)}>Add Task</Button>
      </div>

      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No tasks found.
          </p>
        ) : (
          filteredTasks.map((task) => <TaskRow key={task.id} task={task} />)
        )}
      </div>

      <TaskForm
        projectId={projectId}
        projectStartDate={projectStartDate}
        open={showForm}
        onOpenChange={setShowForm}
      />
    </div>
  );
}
