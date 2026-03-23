'use client';

interface ScopeComparisonBarProps {
  originalTaskCount: number;
  outOfScopeTaskCount: number;
  originalHours: number;
  outOfScopeHours: number;
}

function StackedBar({
  label,
  inScope,
  outOfScope,
}: {
  label: string;
  inScope: number;
  outOfScope: number;
}) {
  const total = inScope + outOfScope;
  if (total === 0) return null;

  const inPercent = (inScope / total) * 100;
  const outPercent = (outOfScope / total) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {inScope} in-scope / {outOfScope} out-of-scope
        </span>
      </div>
      <div className="flex h-4 w-full rounded-full overflow-hidden bg-secondary">
        <div
          className="bg-green-500 transition-all"
          style={{ width: `${inPercent}%` }}
        />
        <div
          className="bg-red-500 transition-all"
          style={{ width: `${outPercent}%` }}
        />
      </div>
    </div>
  );
}

export function ScopeComparisonBar({
  originalTaskCount,
  outOfScopeTaskCount,
  originalHours,
  outOfScopeHours,
}: ScopeComparisonBarProps) {
  return (
    <div className="space-y-4">
      <StackedBar
        label="Tasks"
        inScope={originalTaskCount}
        outOfScope={outOfScopeTaskCount}
      />
      <StackedBar
        label="Hours"
        inScope={originalHours}
        outOfScope={outOfScopeHours}
      />
    </div>
  );
}
