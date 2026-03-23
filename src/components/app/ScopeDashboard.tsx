'use client';

import { useProjectStore } from '@/stores/project-store';
import { useTaskStore } from '@/stores/task-store';
import { useTimeStore } from '@/stores/time-store';
import { useMessageStore } from '@/stores/message-store';
import { generateScopeReport } from '@/lib/calculations/scope';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BudgetGauge } from './BudgetGauge';
import { ScopeComparisonBar } from './ScopeComparisonBar';
import { ScopeCreepAlert } from './ScopeCreepAlert';

interface ScopeDashboardProps {
  projectId: string;
}

export function ScopeDashboard({ projectId }: ScopeDashboardProps) {
  const project = useProjectStore((s) => s.getProject(projectId));
  const tasks = useTaskStore((s) => s.tasks);
  const entries = useTimeStore((s) => s.entries);
  const messages = useMessageStore((s) => s.messages);

  if (!project) {
    return (
      <p className="text-sm text-muted-foreground">Project not found.</p>
    );
  }

  const report = generateScopeReport(project, tasks, entries, messages);

  const stats = [
    {
      label: 'Scope Creep',
      value: `${report.scopeCreepPercent.toFixed(1)}%`,
    },
    {
      label: 'Budget Burn',
      value: `${report.budgetUsedPercent.toFixed(1)}%`,
    },
    {
      label: 'Overrun Hours',
      value: `${report.overrunHours.toFixed(1)}h`,
    },
    {
      label: 'Additional Cost',
      value: `${report.additionalCost.toFixed(2)} ${project.currency}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scope Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Scope Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ScopeComparisonBar
            originalTaskCount={report.originalTaskCount}
            outOfScopeTaskCount={report.outOfScopeTaskCount}
            originalHours={report.originalEstimatedHours}
            outOfScopeHours={report.outOfScopeActualHours}
          />
        </CardContent>
      </Card>

      {/* Budget Gauge */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <BudgetGauge percent={report.budgetUsedPercent} />
        </CardContent>
      </Card>

      {/* Scope Creep Alerts */}
      {report.changes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Scope Changes ({report.changes.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {report.changes.map((change) => (
              <ScopeCreepAlert
                key={change.id}
                change={change}
                currency={project.currency}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
