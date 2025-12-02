import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  deleteEmployees,
  updateEmployee,
  createEmployee,
} from '../services/employeeService.js';
import { IEmployee } from '../types/types.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { protectedRoute } from '../middleware/auth.js';

const router = express.Router();

router.use(protectedRoute);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { employees, total } = await getAllEmployees({ skip, take: limit });

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      employees,
    });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const employee = await getEmployeeById(req.params.id);
    res.status(200).json({ employee });
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updateBody = req.body as IEmployee;

    const updatedEmployee = await updateEmployee(id, updateBody);
    res.status(200).json({ updatedEmployee });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newEmployee = req.body as IEmployee;
    const created = await createEmployee(newEmployee);
    res.status(201).json({ created });
  })
);

router.delete(
  '/',
  asyncHandler(async (req, res) => {
    const ids: string[] = req.body.ids;
    const deletedCount = await deleteEmployees(ids);
    res.status(200).json({ deleted: deletedCount });
  })
);

export default router;
