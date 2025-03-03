export interface User {
  username: string;
}

export interface Project {
  id: number;
  name: string;
  years: {
    // Year key
    [key: number]: {
      // Month index key
      [key: number]: Timesheet;
    };
  };
}

export interface Timesheet {
  employees: {
    username: string; // Key
    hours: number[];
  }[];
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
