export interface IEmployee {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  occupation: string;
  salary: number;
  employed: Date;
}
export type IOccupations =
  | 'developer'
  | 'sales'
  | 'hr'
  | 'management'
  | 'customer_success'
  | 'tester';

export const Occupations: Record<IOccupations, string> = {
  developer: 'Developer',
  sales: 'Sales',
  hr: 'HR',
  management: 'Management',
  customer_success: 'Customer success',
  tester: 'Tester',
} as const;

// duplicate but idea is if login or create user types change
// we can do it this way because they might change in the future
export interface ICreateUserPayload {
  username: string;
  password: string;
}

export interface ILoginPayload {
  username: string;
  password: string;
}

export type IEmployeePayload = Omit<IEmployee, 'id'>;

export interface IEmployeePaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  employees: IEmployee[];
}

export interface ApiResult {
  status: number;
  ok: boolean;
  message: string;
}

export interface MessageResult {
  success: boolean;
  message: string;
}
