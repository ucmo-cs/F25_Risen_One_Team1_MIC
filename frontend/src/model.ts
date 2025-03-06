export interface User {
  username: string;
}

export interface Selected {
  projectId: number;
  year: number;
  month: number;
  dayColumns: number[];
}

export interface Signature {
  name: string;
  date: string;
}
