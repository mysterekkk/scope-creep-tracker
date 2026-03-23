import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TimeEntry, TimerState } from '@/types/time';
import { generateId } from '@/lib/id';

interface TimeStore {
  entries: TimeEntry[];
  timer: TimerState;
  startTimer: (taskId: string, projectId: string) => void;
  stopTimer: () => void;
  addManualEntry: (data: {
    taskId: string;
    projectId: string;
    durationMinutes: number;
    note: string;
    date: string;
  }) => void;
  deleteEntry: (id: string) => void;
  getTaskEntries: (taskId: string) => TimeEntry[];
  getProjectEntries: (projectId: string) => TimeEntry[];
  deleteProjectEntries: (projectId: string) => void;
}

const DEFAULT_TIMER: TimerState = {
  isRunning: false,
  activeTaskId: null,
  activeProjectId: null,
  startedAt: null,
};

export const useTimeStore = create<TimeStore>()(
  persist(
    (set, get) => ({
      entries: [],
      timer: { ...DEFAULT_TIMER },

      startTimer: (taskId, projectId) =>
        set({
          timer: {
            isRunning: true,
            activeTaskId: taskId,
            activeProjectId: projectId,
            startedAt: new Date().toISOString(),
          },
        }),

      stopTimer: () => {
        const { timer } = get();
        if (!timer.isRunning || !timer.startedAt || !timer.activeTaskId || !timer.activeProjectId) {
          return;
        }

        const now = new Date();
        const startedAt = new Date(timer.startedAt);
        const durationMinutes = Math.round(
          (now.getTime() - startedAt.getTime()) / 60000,
        );

        const entry: TimeEntry = {
          id: generateId(),
          taskId: timer.activeTaskId,
          projectId: timer.activeProjectId,
          startTime: timer.startedAt,
          endTime: now.toISOString(),
          durationMinutes,
          note: '',
          isManual: false,
        };

        set((state) => ({
          entries: [...state.entries, entry],
          timer: { ...DEFAULT_TIMER },
        }));
      },

      addManualEntry: (data) => {
        const now = new Date().toISOString();
        const entry: TimeEntry = {
          id: generateId(),
          taskId: data.taskId,
          projectId: data.projectId,
          startTime: data.date,
          endTime: data.date,
          durationMinutes: data.durationMinutes,
          note: data.note,
          isManual: true,
        };
        set((state) => ({ entries: [...state.entries, entry] }));
      },

      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),

      getTaskEntries: (taskId) =>
        get().entries.filter((e) => e.taskId === taskId),

      getProjectEntries: (projectId) =>
        get().entries.filter((e) => e.projectId === projectId),

      deleteProjectEntries: (projectId) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.projectId !== projectId),
        })),
    }),
    { name: 'scope-creep-time' },
  ),
);
