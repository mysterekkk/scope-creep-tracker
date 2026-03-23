'use client';

import { useProjectStore } from '@/stores/project-store';
import { useTaskStore } from '@/stores/task-store';
import { useTimeStore } from '@/stores/time-store';
import { useMessageStore } from '@/stores/message-store';
import { generateScopeReport } from '@/lib/calculations/scope';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ReportSummary({ projectId }: { projectId: string }) {
  const project = useProjectStore(s => s.getProject(projectId));
  const tasks = useTaskStore(s => s.getProjectTasks(projectId));
  const entries = useTimeStore(s => s.getProjectEntries(projectId));
  const messages = useMessageStore(s => s.getProjectMessages(projectId));

  if (!project || tasks.length === 0) return null;

  const report = generateScopeReport(project, tasks, entries, messages);
  const outOfScopeTasks = tasks.filter(t => t.scopeFlag === 'out-of-scope');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Scope Creep Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Original Scope</p>
            <p className="font-medium">{report.originalTaskCount} tasks / {report.originalEstimatedHours.toFixed(1)}h</p>
          </div>
          <div>
            <p className="text-muted-foreground">Current Scope</p>
            <p className="font-medium">{report.currentTaskCount} tasks / {report.totalActualHours.toFixed(1)}h</p>
          </div>
          <div>
            <p className="text-muted-foreground">Scope Creep</p>
            <p className="font-bold text-destructive">{Math.round(report.scopeCreepPercent)}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Additional Cost</p>
            <p className="font-bold text-destructive">{project.currency} {report.additionalCost.toFixed(2)}</p>
          </div>
        </div>

        {outOfScopeTasks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Out-of-Scope Items</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 pr-4 font-medium text-muted-foreground">Task</th>
                    <th className="pb-2 pr-4 font-medium text-muted-foreground">Hours</th>
                    <th className="pb-2 font-medium text-muted-foreground">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {outOfScopeTasks.map(task => (
                    <tr key={task.id} className="border-b last:border-0">
                      <td className="py-2 pr-4">{task.title}</td>
                      <td className="py-2 pr-4">{task.actualHours.toFixed(1)}h</td>
                      <td className="py-2">{project.currency} {(task.actualHours * project.hourlyRate).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {report.changes.length === 0 && (
          <div className="py-4 text-center">
            <Badge variant="success">No scope creep detected</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
