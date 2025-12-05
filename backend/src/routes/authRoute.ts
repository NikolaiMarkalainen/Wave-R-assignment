import express from 'express';
import { loginUser, registerUser } from '../services/authService.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { protectedRoute } from '../middleware/auth.js';
import { TokenError } from '../utils/errors.js';
import type { AuthRequest } from '../types/types.js';
const router = express.Router();

router.post(
  '/login',
  asyncHandler(async (request, response) => {
    const token = await loginUser(request.body);

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 7257600000,
      sameSite: 'none',
    });
    response.status(200).json({ success: true, message: 'Login successful' });
  })
);

router.post(
  '/register',
  asyncHandler(async (request, response) => {
    const r = await registerUser(request.body);
    response.status(200).json({ success: true, message: `${r.username} created successfully!` });
  })
);

router.get(
  '/me',
  protectedRoute,
  asyncHandler(async (request: AuthRequest, response) => {
    if (!request.user) {
      throw TokenError();
    }
    response.status(200).json({ success: true });
  })
);

router.post(
  '/logout',
  protectedRoute,
  asyncHandler(async (request: AuthRequest, response) => {
    if (!request.user) {
      throw TokenError();
    }
    response.cookie('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      sameSite: 'none',
    });
    return response.status(200).json({ message: 'Logged out successfully' });
  })
);
export default router;
