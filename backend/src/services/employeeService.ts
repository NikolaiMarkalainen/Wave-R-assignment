import { EmployeeOrderByWithRelationInput } from '../../generated/prisma/models.js';
import { prisma } from '../../lib/prisma.js';
import { IEmployee, IOccupations, IQueryParams } from '../types/types.js';
import { BadRequest, NotFound } from '../utils/errors.js';

export const getAllEmployees = async (params: IQueryParams) => {
  const where: any = {};
  const { occupation, page, pageSize, sortDir, sortBy } = params;
  const realPageSize = pageSize || 10;
  const pageN = page || 1;
  let occupationList: IOccupations[] | undefined;
  console.log('asd', occupation);

  if (occupation) {
    if (Array.isArray(occupation)) {
      occupationList = occupation.map((o) => (o as string).toLowerCase() as IOccupations);
    } else {
      occupationList = [(occupation as string).toLowerCase() as IOccupations];
    }
  }

  if (occupationList?.length) {
    where.occupation = { in: occupationList };
  }
  const orderBy = sortBy
    ? ({
        [sortBy]: sortDir,
      } as EmployeeOrderByWithRelationInput)
    : ({ id: 'asc' } as EmployeeOrderByWithRelationInput);

  const skip = (pageN - 1) * realPageSize;

  const [employees, total] = await Promise.all([
    prisma.employee.findMany({
      skip,
      take: Number(realPageSize),
      where,
      orderBy,
    }),
    prisma.employee.count({ where }),
  ]);

  return { employees, total, page: pageN, pageSize: realPageSize };
};

export const getEmployeeById = async (id: string) => {
  if (!id) {
    throw BadRequest('Employee ID is required');
  }

  const employee = await prisma.employee.findUnique({
    where: { id: Number(id) },
  });

  if (!employee) {
    throw NotFound('Employee not found');
  }

  return employee;
};

export const updateEmployee = async (id: string, body: IEmployee) => {
  if (!id || !body) {
    throw BadRequest('Missing required data for update');
  }

  const employee = await prisma.employee.findUnique({
    where: { id: Number(id) },
  });

  if (!employee) {
    throw NotFound('Employee not found');
  }

  const updated = await prisma.employee.update({
    where: { id: Number(id) },
    data: body,
  });

  return updated;
};

export const createEmployee = async (body: IEmployee) => {
  const { firstname, lastname, age, occupation, salary, employed } = body;
  if (!body || !firstname || !lastname || !age || !occupation || !salary || !employed) {
    throw BadRequest('Missing required data to create employee');
  }
  const created = await prisma.employee.create({
    data: body,
  });
  return created;
};

export const deleteEmployees = async (ids: string[]) => {
  if (!ids || ids.length === 0) {
    throw BadRequest('No employee IDs were provided');
  }

  const numericIds = ids.map((id) => Number(id));

  const result = await prisma.employee.deleteMany({
    where: {
      id: { in: numericIds },
    },
  });

  if (result.count === 0) {
    throw NotFound('No matching employees found');
  }

  return result.count;
};
