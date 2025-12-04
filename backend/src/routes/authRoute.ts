import express from 'express';
import { loginUser, registerUser } from '../services/authService.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.post(
  '/login',
  asyncHandler(async (request, response) => {
    const token = await loginUser(request.body);

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7257600000,
      sameSite: 'lax',
    });
    response.status(200).json({ success: true, message: 'Login successful' });
  })
);

router.post(
  '/register',
  asyncHandler(async (request, response) => {
    const r = await registerUser(request.body);
    response.status(200).json(r);
  })
);

export default router;
