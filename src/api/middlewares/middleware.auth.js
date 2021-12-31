import moment from 'moment';
import Hash from '../../lib/hash';
import enums from '../../lib/enums';
import config from '../../config/setup';
import ApiResponse from '../../lib/http/lib.http.response';
import * as UserService from '../services/service.user';

const { AUTHENTICATION_SECRET } = config;

export const generateEmailVerificationToken = async(req, res, next) => {
  try {
    const encryptedToken = await Hash.generateRandom();
    const expires_at = moment().add(48, 'hours').format();
    req.token = { encryptedToken, expires_at };
    return next();
  } catch (error) {
    error.label = enums.EMAIL_TOKEN_MIDDLEWARE;
    return next(error);
  }
};

export const hashPassword = async(req, res, next) => {
  try {
    const { password } = req.body;
    const { hashed, salt } = Hash.hashData(password);
    req.userCredentials = {
      ...req.body,
      password: hashed,
      salt,
    };
    return next();
  } catch (error) {
    error.label = enums.HASH_PASSWORD_MIDDLEWARE;
    return next(error);
  }
};

export const isUserVerified = (type = 'authenticate') => async(req, res, next) => {
  try {
    const { user: { isVerified } } = req;
    if (isVerified && type === 'verify') {
      return ApiResponse.error(res, enums.IS_VERIFIED, enums.HTTP_BAD_REQUEST, enums.IS_VERIFIED_MIDDLEWARE);
    }
    if (!isVerified && type === 'authenticate') {
      return ApiResponse.error(res, enums.NOT_VERIFIED, enums.HTTP_BAD_REQUEST, enums.IS_VERIFIED_MIDDLEWARE);
    }
    req.isVerified = isVerified;
    return next();
  } catch (error) {
    error.label = enums.IS_VERIFIED_MIDDLEWARE;
    return next(error);
  }
};

export const checkVerificationToken = async(req, res, next) => {
  try {
    if (req.isVerified) {
      return next();
    }
    const { query: { id }, user: { emailVerificationToken, emailVerificationTokenExpiry } } = req;
    const isExpired = new Date().getTime() > new Date(emailVerificationTokenExpiry).getTime();
    if (emailVerificationToken !== id || isExpired) {
      return ApiResponse.error(res, enums.INVALID_TOKEN, enums.HTTP_BAD_REQUEST, enums.DECRYPT_TOKEN_MIDDLEWARE);
    }
    return next();
  } catch (error) {
    error.label = enums.DECRYPT_TOKEN_MIDDLEWARE;
    return next(error);
  }
};

export const comparePassword = async(req, res, next) => {
  try {
    const { body: { password }, user } = req;
    const passwordValid = await Hash.compareData(password, user.password);
    if (passwordValid) {
      return next();
    }
    return ApiResponse.error(res, enums.INVALID_CREDENTIALS, enums.HTTP_BAD_REQUEST, enums.COMPARE_PASSWORD_MIDDLEWARE);
  } catch (error) {
    error.label = enums.COMPARE_PASSWORD_MIDDLEWARE;
    return next(error);
  }
};

export const generateAuthenticationToken = async(req, res, next) => {
  try {
    const { user } = req;
    user.token = await Hash.generateToken(user, AUTHENTICATION_SECRET);
    delete user.password;
    delete user.salt;
    return next();
  } catch (error) {
    error.label = enums.GENERATE_TOKEN_MIDDLEWARE;
    return next(error);
  }
};

export const getAuthToken = async(req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return ApiResponse.error(res, enums.NO_TOKEN, enums.HTTP_BAD_REQUEST, enums.GET_AUTH_TOKEN_MIDDLEWARE);
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    req.token = token;
    return next();
  } catch (error) {
    error.label = enums.GET_AUTH_TOKEN_MIDDLEWARE;
    return next(error);
  }
};

export const validateAuthToken = async(req, res, next) => {
  try {
    const { token } = req;
    const decoded = Hash.decodeToken(token, AUTHENTICATION_SECRET);
    if (decoded.message) {
      return ApiResponse.error(res, decoded.message, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_AUTH_TOKEN_MIDDLEWARE);
    }
    // const [ user ] = await UserService.getUser(decoded.email.toLowerCase());
    const payload = { email: decoded.email.toLowerCase() };
    const user = await UserService.findUser(payload);
    if (!user) {
      return ApiResponse.error(res, enums.INVALID_TOKEN, enums.HTTP_BAD_REQUEST, enums.VALIDATE_AUTH_TOKEN_MIDDLEWARE);
    }
    delete user.password;
    delete user.salt;
    req.user = user;
    return next();
  } catch (error) {
    error.label = enums.VALIDATE_AUTH_TOKEN_MIDDLEWARE;
    return next(error);
  }
};

export const isAdmin = async(req, res, next) => {
  try {
    const { user: { roleCode } } = req;
    if (roleCode !== 'ADMIN') {
      return ApiResponse.error(res, enums.UNAUTHORIZED, enums.HTTP_UNAUTHORIZED, enums.IS_ADMIN_MIDDLEWARE);
    }
    return next();
  } catch (error) {
    error.label = enums.DECRYPT_TOKEN_MIDDLEWARE;
    return next(error);
  }
};
