import express from 'express';
import { loginUser, registerUser } from '../services/authService.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.post(
  '/login',
  asyncHandler(async (request, response) => {
    // handle auth here and send cookie back with jwt auth token
    const r = await loginUser(request.body);
    response.status(200).json(r);
  })
);

router.post(
  '/register',
  asyncHandler(async (request, response) => {
    // handle registering here and return status if completed
    const r = await registerUser(request.body);
    response.status(200).json(r);
  })
);

export default router;
