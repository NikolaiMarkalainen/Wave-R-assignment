import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from '../types/types.js';
import { TokenError } from './errors.js';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: `${Number(JWT_EXPIRATION)}HRS` });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
  } catch (error) {
    throw TokenError();
  }
};
