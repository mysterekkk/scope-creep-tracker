'use client';

import { useState, useEffect } from 'react';
import { useTimeStore } from '@/stores/time-store';
import { useTaskStore } from '@/stores/task-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Play, Square } from 'lucide-react';

interface TimeTrackerProps {
  projectId: string;
}

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((n) => String(n).padStart(2, '0')).join(':');
}

export function TimeTracker({ projectId }: TimeTrackerProps) {
  const timer = useTimeStore((s) => s.timer);
  const startTimer = useTimeStore((s) => s.startTimer);
  const stopTimer = useTimeStore((s) => s.stopTimer);
  const addManualEntry = useTimeStore((s) => s.addManualEntry);
  const tasks = useTaskStore((s) => s.getProjectTasks(projectId));

  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [elapsed, setElapsed] = useState(0);

  // Manual entry state
  const [manualTaskId, setManualTaskId] = useState('');
  const [manualHours, setManualHours] = useState('');
  const [manualMinutes, setManualMinutes] = useState('');
  const [manualNote, setManualNote] = useState('');
  const [manualDate, setManualDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  useEffect(() => {
    if (!timer.isRunning || !timer.startedAt) {
      setElapsed(0);
      return;
    }

    const update = () => {
      setElapsed(Date.now() - new Date(timer.startedAt!).getTime());
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timer.isRunning, timer.startedAt]);

  const activeTask = timer.activeTaskId
    ? tasks.find((t) => t.id === timer.activeTaskId)
    : null;

  function handleStart() {
    if (!selectedTaskId) return;
    startTimer(selectedTaskId, projectId);
  }

  function handleStop() {
    stopTimer();
  }

  function handleManualAdd() {
    if (!manualTaskId) return;
    const totalMinutes =
      (Number(manualHours) || 0) * 60 + (Number(manualMinutes) || 0);
    if (totalMinutes <= 0) return;

    addManualEntry({
      taskId: manualTaskId,
      projectId,
      durationMinutes: totalMinutes,
      note: manualNote.trim(),
      date: manualDate,
    });

    setManualHours('');
    setManualMinutes('');
    setManualNote('');
  }

  return (
    <div className="space-y-4">
      {/* Active Timer */}
      {timer.isRunning && timer.activeProjectId === projectId && (
        <Card className="border-primary">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm text-muted-foreground">Tracking</p>
              <p className="font-medium">{activeTask?.title ?? 'Unknown task'}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-mono tabular-nums">
                {formatElapsed(elapsed)}
              </span>
              <Button variant="destructive" size="sm" onClick={handleStop}>
                <Square className="h-4 w-4 mr-1" />
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Start Timer */}
      {!timer.isRunning && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Start Timer</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Select value={selectedTaskId} onValueChange={setSelectedTaskId}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a task" />
              </SelectTrigger>
              <SelectContent>
                {tasks.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleStart} disabled={!selectedTaskId}>
              <Play className="h-4 w-4 mr-1" />
              Start
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Manual Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Manual Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select value={manualTaskId} onValueChange={setManualTaskId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a task" />
            </SelectTrigger>
            <SelectContent>
              {tasks.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <label className="text-xs text-muted-foreground">Hours</label>
              <Input
                type="number"
                value={manualHours}
                onChange={(e) => setManualHours(e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs text-muted-foreground">Minutes</label>
              <Input
                type="number"
                value={manualMinutes}
                onChange={(e) => setManualMinutes(e.target.value)}
                placeholder="30"
                min="0"
                max="59"
              />
            </div>
          </div>
          <Input
            value={manualNote}
            onChange={(e) => setManualNote(e.target.value)}
            placeholder="Note (optional)"
          />
          <Input
            type="date"
            value={manualDate}
            onChange={(e) => setManualDate(e.target.value)}
          />
          <Button onClick={handleManualAdd} disabled={!manualTaskId} className="w-full">
            Add Entry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
