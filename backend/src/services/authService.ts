import { verify } from 'crypto';
import { prisma } from '../../lib/prisma.js';
import { IRegister, ILogin, JwtPayload } from '../types/types.js';
import { BadRequest } from '../utils/errors.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (payload: IRegister) => {
  const { username, password } = payload;
  if (!username || !password) {
    throw BadRequest('Missing required fields for account creation');
  }
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    throw BadRequest('User already exists');
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return user;
};

export const loginUser = async (payload: ILogin) => {
  const { username, password } = payload;

  if (!username || !password) {
    throw BadRequest('Username and password are required');
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    throw { status: 401, message: 'Invalid email or password' };
  }

  const isPasswordValid = verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw { status: 401, message: 'Invalid email or password' };
  }
  const tokenPayload: JwtPayload = { userId: user.id, username: user.username };
  const token = generateToken(tokenPayload);
  return token;
};
