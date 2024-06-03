export enum IssueStatus {
  Open = 'open',
  Resolved = 'resolved',
}

export interface TableIssue {
  id: string;
  name: string;
  message: string;
  status: IssueStatus;
  numEvents: number;
  numUsers: number;
  value: number;
}

export interface ITableIssueViewModel extends TableIssue {
  isOpen: boolean;
}
