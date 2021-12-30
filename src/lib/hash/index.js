import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const saltRounds = 10;

export default {
  generateRandom: () => {
    try {
      return crypto.randomBytes(64).toString('hex');
    } catch (error) {
      return error;
    }
  },
  hashData: (data) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashed = bcrypt.hashSync(data, salt);
    if (hashed && salt) {
      return { hashed, salt };
    }
    return false;
  },
  compareData: (data, hashed) => {
    const isValid = bcrypt.compareSync(data, hashed);
    return !!isValid;
  },
  generateToken: (user, secret) => {
    try {
      return jwt.sign(user, secret, { expiresIn: '48h' });
    } catch (error) {
      return error;
    }
  },
  generateUserId: () => `user-${uuidv4()}`,
};
