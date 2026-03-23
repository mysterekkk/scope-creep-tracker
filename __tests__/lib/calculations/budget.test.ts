import { describe, it, expect } from 'vitest';
import {
  calculateBudgetBurnRate,
  calculateTotalCost,
  calculateOutOfScopeCost,
  calculateRemainingBudget,
} from '@/lib/calculations/budget';
import type { Project } from '@/types/project';

const hourlyProject: Project = {
  id: '1', name: 'Test', clientName: 'Client', startDate: '2026-01-01',
  deadline: '2026-03-01', budgetType: 'hours', budgetAmount: 100,
  currency: 'USD', hourlyRate: 50, createdAt: '', updatedAt: '',
};

const fixedProject: Project = {
  ...hourlyProject, budgetType: 'fixed', budgetAmount: 5000,
};

describe('calculateBudgetBurnRate', () => {
  it('returns 50% when half the hours budget is used', () => {
    expect(calculateBudgetBurnRate(hourlyProject, 50)).toBe(50);
  });

  it('returns 100% when hours budget is fully used', () => {
    expect(calculateBudgetBurnRate(hourlyProject, 100)).toBe(100);
  });

  it('handles fixed budget (hours * rate / budget)', () => {
    expect(calculateBudgetBurnRate(fixedProject, 50)).toBe(50);
  });

  it('returns 0 for no hours', () => {
    expect(calculateBudgetBurnRate(hourlyProject, 0)).toBe(0);
  });
});

describe('calculateTotalCost', () => {
  it('multiplies hours by rate', () => {
    expect(calculateTotalCost(10, 50)).toBe(500);
  });
});

describe('calculateOutOfScopeCost', () => {
  it('multiplies out-of-scope hours by rate', () => {
    expect(calculateOutOfScopeCost(5, 50)).toBe(250);
  });
});

describe('calculateRemainingBudget', () => {
  it('returns remaining hours for hours budget', () => {
    expect(calculateRemainingBudget(hourlyProject, 30)).toBe(70);
  });

  it('returns remaining amount for fixed budget', () => {
    expect(calculateRemainingBudget(fixedProject, 30)).toBe(3500);
  });

  it('can go negative', () => {
    expect(calculateRemainingBudget(hourlyProject, 120)).toBe(-20);
  });
});
