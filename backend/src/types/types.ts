import { Employee } from '../../generated/prisma/client.js';
import { Occupation } from '../../generated/prisma/enums.js';
import type { Request } from 'express';
export interface IEmployee {
  firstname: string;
  lastname: string;
  age: number;
  occupation: Occupation;
  salary: number;
  employed: Date;
}

export interface JwtPayload {
  userId: number;
  username: string;
}

export interface IRegister {
  username: string;
  password: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export type cookieTypes = 'access_token' | 'test';

export const CookieType: Record<string, cookieTypes> = {
  JWT: 'access_token',
};

export interface AuthRequest extends Request {
  user?: { userId: number; username: string };
}
export type IOccupations =
  | 'developer'
  | 'sales'
  | 'hr'
  | 'management'
  | 'customer_success'
  | 'tester';

export interface IQueryParams {
  occupation?: IOccupations[];
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}
