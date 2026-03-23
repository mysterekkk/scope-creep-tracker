'use client';

import { cn } from '@/lib/utils';

interface BudgetGaugeProps {
  percent: number;
}

export function BudgetGauge({ percent }: BudgetGaugeProps) {
  const clamped = Math.max(0, percent);
  const barWidth = Math.min(clamped, 100);

  const colorClass =
    clamped > 85
      ? 'bg-red-500'
      : clamped > 60
        ? 'bg-yellow-500'
        : 'bg-green-500';

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Budget Used</span>
        <span
          className={cn(
            'font-semibold',
            clamped > 85
              ? 'text-red-600'
              : clamped > 60
                ? 'text-yellow-600'
                : 'text-green-600',
          )}
        >
          {clamped.toFixed(0)}%
        </span>
      </div>
      <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all', colorClass)}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}
