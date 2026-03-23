import { describe, it, expect } from 'vitest';
import { analyzeMessage } from '@/lib/detection/heuristic-detector';

const inScopeTasks = ['Design homepage layout', 'Implement login form', 'Set up database'];

describe('analyzeMessage', () => {
  it('detects scope creep keywords', () => {
    expect(analyzeMessage('Can you also add a dark mode toggle?', inScopeTasks)).toBe(true);
  });

  it('detects "one more thing"', () => {
    expect(analyzeMessage('One more thing — we need a newsletter signup', inScopeTasks)).toBe(true);
  });

  it('does not flag normal messages', () => {
    expect(analyzeMessage('The design looks great, thank you!', inScopeTasks)).toBe(false);
  });

  it('does not flag when message matches existing task', () => {
    expect(analyzeMessage('Can you also update the homepage layout?', inScopeTasks)).toBe(false);
  });

  it('detects "additional" keyword', () => {
    expect(analyzeMessage('We need additional analytics tracking', inScopeTasks)).toBe(true);
  });

  it('handles empty message', () => {
    expect(analyzeMessage('', inScopeTasks)).toBe(false);
  });

  it('is case insensitive', () => {
    expect(analyzeMessage('CAN YOU ALSO build a mobile app?', inScopeTasks)).toBe(true);
  });
});
