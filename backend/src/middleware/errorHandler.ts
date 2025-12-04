import type { Express, NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/errors.js';

export const errorMiddleWare = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ error: 'Internal server error' });
};
