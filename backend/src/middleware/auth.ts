import { NextFunction, Response, Request } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { TokenError } from '../utils/errors.js';
import { CookieType, cookieTypes } from '../types/types.js';
import { AuthRequest } from '../types/types.js';

export const protectedRoute = (request: AuthRequest, response: Response, next: NextFunction) => {
  try {
    const token = getCookieHeader(request, CookieType.JWT);

    if (!token) {
      return response.status(401).json({ error: 'No token provided' });
    }
    const decoded = verifyToken(token);
    request.user = decoded;
    next();
  } catch (error) {
    return next(TokenError());
  }
};

const getCookieHeader = (request: AuthRequest, cookieType: cookieTypes) => {
  var allCookies = request.headers.cookie;
  const cookiePair = allCookies?.split('; ').find((cookie) => cookie.trim().startsWith(cookieType));

  if (!cookiePair) {
    return undefined;
  }
  const token = cookiePair.split('=')[1].trim();
  return token;
};
