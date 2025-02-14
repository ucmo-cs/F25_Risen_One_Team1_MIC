export interface Project {
  name: string,
  id: number,
}

export interface Selected {
  project: Project,
  month: Month,
  year: number,
}

export interface Signature {
  name: string,
  date: string,
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
