import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project } from '@/types/project';
import { generateId } from '@/lib/id';

interface ProjectStore {
  projects: Project[];
  addProject: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],

      addProject: (data) => {
        const id = generateId();
        const now = new Date().toISOString();
        const project: Project = {
          ...data,
          id,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ projects: [...state.projects, project] }));
        return id;
      },

      updateProject: (id, data) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id
              ? { ...p, ...data, updatedAt: new Date().toISOString() }
              : p,
          ),
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),

      getProject: (id) => get().projects.find((p) => p.id === id),
    }),
    { name: 'scope-creep-projects' },
  ),
);
