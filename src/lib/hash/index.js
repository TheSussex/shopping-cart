import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      const {
        _id, email, username, phoneNumber,
      } = user;
      return jwt.sign({
        _id, email, username, phoneNumber,
      }, secret, { expiresIn: '48h' });
    } catch (error) {
      return error;
    }
  },
  decodeToken: (token, secret) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return error;
    }
  },
  generateRandomStrings: () => {
    const str =
    Math.random().toString(32).substring(5, 10) +
    Math.random().toString(32).substring(5, 10);
    return str.toUpperCase();
  },
};
