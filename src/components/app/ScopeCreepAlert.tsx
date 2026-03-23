'use client';

import type { ScopeChange } from '@/types/scope';
import { AlertTriangle, Plus, MessageSquare } from 'lucide-react';

interface ScopeCreepAlertProps {
  change: ScopeChange;
  currency?: string;
}

export function ScopeCreepAlert({ change, currency = 'USD' }: ScopeCreepAlertProps) {
  const icon = (() => {
    switch (change.type) {
      case 'hours-overrun':
        return <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />;
      case 'new-task':
        return <Plus className="h-4 w-4 text-red-500 flex-shrink-0" />;
      case 'client-request':
        return <MessageSquare className="h-4 w-4 text-orange-500 flex-shrink-0" />;
    }
  })();

  return (
    <div className="flex items-start gap-3 rounded-md border px-3 py-2">
      {icon}
      <div className="flex-1 min-w-0">
        <p className="text-sm">{change.description}</p>
        <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
          <span>+{change.additionalHours.toFixed(1)}h</span>
          <span>
            +{change.additionalCost.toFixed(2)} {currency}
          </span>
        </div>
      </div>
    </div>
  );
}
