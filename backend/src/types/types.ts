import { Occupation } from '../../generated/prisma/enums.js';

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
