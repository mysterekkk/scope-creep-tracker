import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ClientMessage, ScopeCreepFlag } from '@/types/message';
import { generateId } from '@/lib/id';
import { analyzeMessage } from '@/lib/detection/heuristic-detector';

interface MessageStore {
  messages: ClientMessage[];
  addMessage: (
    data: { projectId: string; date: string; text: string },
    inScopeTaskTitles: string[],
  ) => string;
  deleteMessage: (id: string) => void;
  toggleFlag: (id: string) => void;
  linkTask: (messageId: string, taskId: string) => void;
  getProjectMessages: (projectId: string) => ClientMessage[];
  deleteProjectMessages: (projectId: string) => void;
}

export const useMessageStore = create<MessageStore>()(
  persist(
    (set, get) => ({
      messages: [],

      addMessage: (data, inScopeTaskTitles) => {
        const id = generateId();
        const now = new Date().toISOString();
        const isCreep = analyzeMessage(data.text, inScopeTaskTitles);

        const message: ClientMessage = {
          id,
          projectId: data.projectId,
          date: data.date,
          text: data.text,
          scopeCreepFlag: isCreep ? 'auto-detected' : 'none',
          linkedTaskId: null,
          createdAt: now,
        };

        set((state) => ({ messages: [...state.messages, message] }));
        return id;
      },

      deleteMessage: (id) =>
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        })),

      toggleFlag: (id) =>
        set((state) => ({
          messages: state.messages.map((m) => {
            if (m.id !== id) return m;
            let nextFlag: ScopeCreepFlag;
            if (m.scopeCreepFlag === 'none') {
              nextFlag = 'manual';
            } else {
              nextFlag = 'none';
            }
            return { ...m, scopeCreepFlag: nextFlag };
          }),
        })),

      linkTask: (messageId, taskId) =>
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === messageId ? { ...m, linkedTaskId: taskId } : m,
          ),
        })),

      getProjectMessages: (projectId) =>
        get().messages.filter((m) => m.projectId === projectId),

      deleteProjectMessages: (projectId) =>
        set((state) => ({
          messages: state.messages.filter((m) => m.projectId !== projectId),
        })),
    }),
    { name: 'scope-creep-messages' },
  ),
);
