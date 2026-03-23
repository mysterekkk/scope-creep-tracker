export interface TimeEntry {
  id: string;
  taskId: string;
  projectId: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  note: string;
  isManual: boolean;
}

export interface TimerState {
  isRunning: boolean;
  activeTaskId: string | null;
  activeProjectId: string | null;
  startedAt: string | null;
}
