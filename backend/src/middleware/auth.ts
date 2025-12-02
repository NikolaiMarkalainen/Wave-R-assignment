import { NextFunction, Response, Request } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { TokenError } from '../utils/errors.js';
const JWT_SECRET = process.env.JWT_SECRET as string;
export interface AuthRequest extends Request {
  user?: { userId: number; username: string };
}

export const protectedRoute = (request: AuthRequest, response: Response, next: NextFunction) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    request.user = decoded;
    next();
  } catch (error) {
    return next(TokenError());
  }
};
