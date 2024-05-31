export interface TableIssue {
  id: string;
  name: string;
  message: string;
  status: string;
  numEvents: number;
  numUsers: number;
  value: number;
}

export interface CheckedState {
  checked: boolean;
  backgroundColor: string;
}
