import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, ScopeFlag } from '@/types/task';
import { generateId } from '@/lib/id';

interface TaskStore {
  tasks: Task[];
  addTask: (
    data: {
      projectId: string;
      title: string;
      description: string;
      estimatedHours: number;
      scopeFlag?: ScopeFlag;
    },
    projectStartDate: string,
  ) => string;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getProjectTasks: (projectId: string) => Task[];
  toggleScopeFlag: (id: string) => void;
  deleteProjectTasks: (projectId: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (data, projectStartDate) => {
        const id = generateId();
        const now = new Date().toISOString();

        let scopeFlag: ScopeFlag;
        if (data.scopeFlag) {
          scopeFlag = data.scopeFlag;
        } else {
          scopeFlag =
            new Date() > new Date(projectStartDate)
              ? 'out-of-scope'
              : 'in-scope';
        }

        const task: Task = {
          id,
          projectId: data.projectId,
          title: data.title,
          description: data.description,
          estimatedHours: data.estimatedHours,
          actualHours: 0,
          status: 'todo',
          scopeFlag,
          order: get().tasks.length,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ tasks: [...state.tasks, task] }));
        return id;
      },

      updateTask: (id, data) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, ...data, updatedAt: new Date().toISOString() }
              : t,
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      getProjectTasks: (projectId) =>
        get().tasks.filter((t) => t.projectId === projectId),

      toggleScopeFlag: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  scopeFlag:
                    t.scopeFlag === 'in-scope' ? 'out-of-scope' : 'in-scope',
                  updatedAt: new Date().toISOString(),
                }
              : t,
          ),
        })),

      deleteProjectTasks: (projectId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.projectId !== projectId),
        })),
    }),
    { name: 'scope-creep-tasks' },
  ),
);
