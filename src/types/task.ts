export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type ScopeFlag = 'in-scope' | 'out-of-scope';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  estimatedHours: number;
  actualHours: number;
  status: TaskStatus;
  scopeFlag: ScopeFlag;
  createdAt: string;
  updatedAt: string;
  order: number;
}
