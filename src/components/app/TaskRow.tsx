'use client';

import type { Task, TaskStatus } from '@/types/task';
import { useTaskStore } from '@/stores/task-store';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ScopeBadge } from './ScopeBadge';
import { ArrowLeftRight, Trash2 } from 'lucide-react';

interface TaskRowProps {
  task: Task;
}

export function TaskRow({ task }: TaskRowProps) {
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const toggleScopeFlag = useTaskStore((s) => s.toggleScopeFlag);

  return (
    <div className="flex items-center gap-3 rounded-md border px-3 py-2">
      <span className="font-medium text-sm flex-1 truncate">{task.title}</span>
      <ScopeBadge scopeFlag={task.scopeFlag} />
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {task.actualHours.toFixed(1)}h / {task.estimatedHours}h
      </span>
      <Select
        value={task.status}
        onValueChange={(v) => updateTask(task.id, { status: v as TaskStatus })}
      >
        <SelectTrigger className="w-[120px] h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => toggleScopeFlag(task.id)}
        title="Toggle scope"
      >
        <ArrowLeftRight className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive"
        onClick={() => deleteTask(task.id)}
        title="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
