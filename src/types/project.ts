export type Currency = 'USD' | 'EUR' | 'PLN' | 'GBP';
export type BudgetType = 'hours' | 'fixed';

export interface Project {
  id: string;
  name: string;
  clientName: string;
  startDate: string;
  deadline: string;
  budgetType: BudgetType;
  budgetAmount: number;
  currency: Currency;
  hourlyRate: number;
  createdAt: string;
  updatedAt: string;
}
