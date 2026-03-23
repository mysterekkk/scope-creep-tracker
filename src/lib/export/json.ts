import type { Project } from '@/types/project';
import type { Task } from '@/types/task';
import type { TimeEntry } from '@/types/time';
import type { ClientMessage } from '@/types/message';
import type { ScopeReport } from '@/types/scope';

export interface ProjectExportData {
  project: Project;
  tasks: Task[];
  timeEntries: TimeEntry[];
  messages: ClientMessage[];
  scopeReport: ScopeReport;
  exportedAt: string;
}

export function generateProjectJson(
  project: Project,
  tasks: Task[],
  timeEntries: TimeEntry[],
  messages: ClientMessage[],
  scopeReport: ScopeReport
): string {
  const data: ProjectExportData = {
    project,
    tasks: tasks.filter((t) => t.projectId === project.id),
    timeEntries: timeEntries.filter((e) => e.projectId === project.id),
    messages: messages.filter((m) => m.projectId === project.id),
    scopeReport,
    exportedAt: new Date().toISOString(),
  };

  return JSON.stringify(data, null, 2);
}
