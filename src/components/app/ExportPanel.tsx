'use client';

import { useProjectStore } from '@/stores/project-store';
import { useTaskStore } from '@/stores/task-store';
import { useTimeStore } from '@/stores/time-store';
import { useMessageStore } from '@/stores/message-store';
import { useSettingsStore } from '@/stores/settings-store';
import { generateScopeReport } from '@/lib/calculations/scope';
import { generateTasksCsv } from '@/lib/export/csv';
import { generateProjectJson } from '@/lib/export/json';
import { getChangeRequestData } from '@/lib/export/pdf';
import { downloadFile } from '@/lib/download';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileDown } from 'lucide-react';

interface ExportPanelProps {
  projectId: string;
}

export function ExportPanel({ projectId }: ExportPanelProps) {
  const project = useProjectStore((s) => s.getProject(projectId));
  const tasks = useTaskStore((s) => s.tasks);
  const entries = useTimeStore((s) => s.entries);
  const messages = useMessageStore((s) => s.messages);
  const includeBranding = useSettingsStore((s) => s.includeBranding);

  if (!project) return null;

  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  const report = generateScopeReport(project, tasks, entries, messages);

  function handleCsv() {
    const csv = generateTasksCsv(projectTasks, project!.hourlyRate);
    downloadFile(csv, `${project!.name}-tasks.csv`, 'text/csv');
  }

  function handleJson() {
    const json = generateProjectJson(project!, tasks, entries, messages, report);
    downloadFile(json, `${project!.name}-export.json`, 'application/json');
  }

  async function handlePdf() {
    const [{ pdf }, { ChangeRequestPdf }] = await Promise.all([
      import('@react-pdf/renderer'),
      import('./ChangeRequestPdf'),
    ]);

    const data = getChangeRequestData(project!, projectTasks, entries, project!.hourlyRate);

    const blob = await pdf(
      ChangeRequestPdf({
        project: project!,
        outOfScopeItems: data.outOfScopeItems,
        totals: data.totals,
        includeBranding,
      }),
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project!.name}-change-request.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Export</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 flex-wrap">
        <Button variant="outline" onClick={handlePdf}>
          <FileDown className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" onClick={handleCsv}>
          <FileDown className="h-4 w-4 mr-2" />
          Download CSV
        </Button>
        <Button variant="outline" onClick={handleJson}>
          <FileDown className="h-4 w-4 mr-2" />
          Download JSON
        </Button>
      </CardContent>
    </Card>
  );
}
