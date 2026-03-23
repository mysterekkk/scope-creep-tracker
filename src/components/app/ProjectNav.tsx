'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface ProjectNavProps {
  projectId: string;
}

const NAV_ITEMS = [
  { label: 'Overview', segment: '' },
  { label: 'Tasks', segment: '/tasks' },
  { label: 'Time', segment: '/time' },
  { label: 'Messages', segment: '/messages' },
  { label: 'Reports', segment: '/reports' },
] as const;

export function ProjectNav({ projectId }: ProjectNavProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const basePath = `/${locale}/app/${projectId}`;

  return (
    <nav className="flex gap-1 border-b">
      {NAV_ITEMS.map((item) => {
        const href = `${basePath}${item.segment}`;
        const isActive =
          item.segment === ''
            ? pathname === basePath
            : pathname.startsWith(href);

        return (
          <Link
            key={item.segment}
            href={href}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
              isActive
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
