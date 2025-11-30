export type IOccupations =
  | 'developer'
  | 'sales'
  | 'hr'
  | 'management'
  | 'customer_success'
  | 'tester'

export const Occupations: Record<IOccupations, string> = {
  developer: 'Developer',
  sales: 'Sales',
  hr: 'HR',
  management: 'Management',
  customer_success: 'Customer success',
  tester: 'Tester',
} as const
