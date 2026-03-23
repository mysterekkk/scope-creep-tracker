'use client';

import { useParams } from 'next/navigation';
import { useProjectStore } from '@/stores/project-store';
import { ProjectNav } from '@/components/app/ProjectNav';
import { TaskList } from '@/components/app/TaskList';

export default function TasksPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const { getProject } = useProjectStore();
  const project = getProject(projectId);

  if (!project) return null;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">{project.name}</h1>
        <p className="text-sm text-muted-foreground">{project.clientName}</p>
      </div>
      <ProjectNav projectId={projectId} />
      <TaskList projectId={projectId} projectStartDate={project.startDate} />
    </div>
  );
}
