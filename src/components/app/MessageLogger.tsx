'use client';

import { useState } from 'react';
import { useMessageStore } from '@/stores/message-store';
import { useTaskStore } from '@/stores/task-store';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MessageRow } from './MessageRow';

interface MessageLoggerProps {
  projectId: string;
}

export function MessageLogger({ projectId }: MessageLoggerProps) {
  const messages = useMessageStore((s) => s.getProjectMessages(projectId));
  const addMessage = useMessageStore((s) => s.addMessage);
  const tasks = useTaskStore((s) => s.getProjectTasks(projectId));

  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const taskTitleMap = new Map(tasks.map((t) => [t.id, t.title]));
  const inScopeTaskTitles = tasks
    .filter((t) => t.scopeFlag === 'in-scope')
    .map((t) => t.title);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    addMessage({ projectId, date, text: text.trim() }, inScopeTaskTitles);
    setText('');
  }

  const sorted = [...messages].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type a client message..."
          rows={3}
        />
        <div className="flex gap-2">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-auto"
          />
          <Button type="submit" disabled={!text.trim()}>
            Submit
          </Button>
        </div>
      </form>

      <div className="space-y-2">
        {sorted.map((msg) => (
          <MessageRow
            key={msg.id}
            message={msg}
            taskTitleMap={taskTitleMap}
          />
        ))}
      </div>
    </div>
  );
}
