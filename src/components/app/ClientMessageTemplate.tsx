'use client';

import { useState } from 'react';
import { useProjectStore } from '@/stores/project-store';
import { useTaskStore } from '@/stores/task-store';
import { useTimeStore } from '@/stores/time-store';
import { useMessageStore } from '@/stores/message-store';
import { generateScopeReport } from '@/lib/calculations/scope';
import { generateClientMessage } from '@/lib/templates/client-message';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

export function ClientMessageTemplate({ projectId }: { projectId: string }) {
  const project = useProjectStore(s => s.getProject(projectId));
  const tasks = useTaskStore(s => s.getProjectTasks(projectId));
  const entries = useTimeStore(s => s.getProjectEntries(projectId));
  const messages = useMessageStore(s => s.getProjectMessages(projectId));
  const [copied, setCopied] = useState(false);

  if (!project || tasks.length === 0) return null;

  const report = generateScopeReport(project, tasks, entries, messages);
  if (report.outOfScopeTaskCount === 0) return null;

  const messageText = generateClientMessage(project, report);

  async function handleCopy() {
    await navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Client-Ready Message</CardTitle>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? (
            <><Check className="h-4 w-4 mr-1" /> Copied!</>
          ) : (
            <><Copy className="h-4 w-4 mr-1" /> Copy</>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md">
          {messageText}
        </pre>
      </CardContent>
    </Card>
  );
}
