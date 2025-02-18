export interface Employee {
  name: string,
}

export interface Project {
  name: string,
  id: number,
}

export interface Selected {
  project: Project,
  month: Month,
  year: number,
  dayCount: number,
  dayColumns: Array<any>
}

export interface Signature {
  name: string,
  date: string,
}

export interface EmployeeTimesheet {
  employee: Employee,
  entries: Array<number>,
}

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
