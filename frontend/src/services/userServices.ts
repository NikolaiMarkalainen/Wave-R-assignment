import type { ICreateUserPayload, queryParams } from '@/types/types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const postEmployeeService = (payload: ICreateUserPayload) => {
  console.log('POST: postemployeeService ', payload);
};

export const deleteEmployeeService = (payload: number[]) => {
  console.log('DELETE: deleteemployeeService ', payload);
};

export const putEmployeeService = (payload: ICreateUserPayload) => {
  console.log('PUT: putemployeeService', payload);
};

export const getEmployeeService = async (params: queryParams) => {
  const query = new URLSearchParams();

  if (params.page) query.append('page', params.page.toString());
  if (params.pageSize) query.append('pageSize', params.pageSize.toString());
  if (params.occupation) {
    if (Array.isArray(params.occupation)) {
      // append each occupation separately
      params.occupation.forEach((occ) => query.append('occupation', occ));
    } else {
      query.append('occupation', params.occupation);
    }
  }
  if (params.sortBy) query.append('sortBy', params.sortBy);
  if (params.sortDir) query.append('sortDir', params.sortDir);

  const url = `${API_URL}/employee?${query.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  return response.json();
};
