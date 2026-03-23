'use client';

import { useTranslations } from 'next-intl';
import { useProjectStore } from '@/stores/project-store';
import { ProjectCard } from '@/components/app/ProjectCard';
import { CreateProjectDialog } from '@/components/app/CreateProjectDialog';
import { FolderOpen } from 'lucide-react';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const { projects } = useProjectStore();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">{t('title')}</h1>
          {projects.length > 0 && (
            <p className="text-sm text-muted-foreground">{projects.length} projects</p>
          )}
        </div>
        <CreateProjectDialog />
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">{t('emptyState')}</p>
          <div className="mt-4">
            <CreateProjectDialog />
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
