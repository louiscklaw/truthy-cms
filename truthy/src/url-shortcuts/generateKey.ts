import { randomBytes } from 'crypto';

export const generateKey = () => {
  return randomBytes(4).toString('hex');
};
