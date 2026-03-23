import { describe, it, expect } from 'vitest';
import { calculateScopeCreepPercent } from '@/lib/calculations/scope';

describe('calculateScopeCreepPercent', () => {
  it('returns correct percentage', () => {
    expect(calculateScopeCreepPercent(10, 100)).toBe(10);
  });

  it('returns 0 when no original hours', () => {
    expect(calculateScopeCreepPercent(10, 0)).toBe(0);
  });

  it('returns 0 when no out-of-scope hours', () => {
    expect(calculateScopeCreepPercent(0, 100)).toBe(0);
  });

  it('can exceed 100%', () => {
    expect(calculateScopeCreepPercent(150, 100)).toBe(150);
  });
});
