import { Occupation } from '../../generated/prisma/enums.js';

export interface IEmployee {
  firstname: string;
  lastname: string;
  age: number;
  occupation: Occupation;
  salary: number;
  employed: Date;
}
