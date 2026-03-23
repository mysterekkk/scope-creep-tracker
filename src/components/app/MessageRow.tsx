'use client';

import type { ClientMessage } from '@/types/message';
import { useMessageStore } from '@/stores/message-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';

interface MessageRowProps {
  message: ClientMessage;
  taskTitleMap: Map<string, string>;
}

export function MessageRow({ message, taskTitleMap }: MessageRowProps) {
  const toggleFlag = useMessageStore((s) => s.toggleFlag);

  const flagBadge = (() => {
    switch (message.scopeCreepFlag) {
      case 'auto-detected':
        return <Badge variant="warning">Auto-detected</Badge>;
      case 'manual':
        return <Badge variant="destructive">Manual Flag</Badge>;
      case 'none':
      default:
        return <Badge variant="success">OK</Badge>;
    }
  })();

  return (
    <div className="flex items-start gap-3 rounded-md border px-3 py-2">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground">{message.date}</span>
          {flagBadge}
        </div>
        <p className="text-sm truncate">{message.text}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 flex-shrink-0"
        onClick={() => toggleFlag(message.id)}
        title="Toggle scope creep flag"
      >
        <Flag className="h-4 w-4" />
      </Button>
    </div>
  );
}
