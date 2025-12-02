import bcrypt from 'bcrypt';

const SALT_RDS = 10;

export const hashPassword = async (plainPassword: string) => {
  return await bcrypt.hash(plainPassword, SALT_RDS);
};

export const verifyPassword = async (plainPassword: string, hash: string) => {
  return await bcrypt.compare(plainPassword, hash);
};
