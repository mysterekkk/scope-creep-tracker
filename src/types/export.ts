export type ExportFormat = 'pdf' | 'csv' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  projectId: string;
  includeBranding: boolean;
  locale: string;
}
