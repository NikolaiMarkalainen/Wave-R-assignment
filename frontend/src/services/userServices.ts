import type { ICreateUserPayload } from '@/types/types'
export interface IEmployeePaginationResponse {
  page: number
  limit: number
  total: number
  totalPages: number
  employees: IEmployee[]
}

export const postEmployeeService = (payload: ICreateUserPayload) => {
  console.log('POST: postemployeeService ', payload)
}

export const deleteEmployeeService = (payload: number[]) => {
  console.log('DELETE: deleteemployeeService ', payload)
}

export const putEmployeeService = (payload: ICreateUserPayload) => {
  console.log('PUT: putemployeeService', payload)
}
