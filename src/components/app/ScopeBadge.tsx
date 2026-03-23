'use client';

import type { ScopeFlag } from '@/types/task';
import { Badge } from '@/components/ui/badge';

interface ScopeBadgeProps {
  scopeFlag: ScopeFlag;
}

export function ScopeBadge({ scopeFlag }: ScopeBadgeProps) {
  return (
    <Badge variant={scopeFlag === 'in-scope' ? 'success' : 'destructive'}>
      {scopeFlag === 'in-scope' ? 'In Scope' : 'Out of Scope'}
    </Badge>
  );
}
