'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { Project } from '@/types/project';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTimeStore } from '@/stores/time-store';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale();
  const entries = useTimeStore((s) => s.getProjectEntries(project.id));

  const totalHours = entries.reduce((sum, e) => sum + e.durationMinutes, 0) / 60;
  const budgetPercent =
    project.budgetAmount > 0
      ? Math.min(Math.round((totalHours / project.budgetAmount) * 100), 100)
      : 0;

  return (
    <Link href={`/${locale}/app/${project.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <CardDescription>{project.clientName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Deadline: {project.deadline}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Budget</span>
              <span>{budgetPercent}%</span>
            </div>
            <Progress value={budgetPercent} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
