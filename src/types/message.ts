export type ScopeCreepFlag = 'none' | 'auto-detected' | 'manual';

export interface ClientMessage {
  id: string;
  projectId: string;
  date: string;
  text: string;
  scopeCreepFlag: ScopeCreepFlag;
  linkedTaskId: string | null;
  createdAt: string;
}
