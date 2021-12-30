import Hash from '../../lib/hash';
import moment from 'moment';
import enums from '../../lib/enums';
import config from '../../config/setup';

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
  } catch (error) {
    error.label = enums.HASH_PASSWORD_MIDDLEWARE;
    return next(error);
  }
};

export const isUserVerified = (type = 'authenticate') => async(req, res, next) => {
  try {
    const { user: { isVerified } } = req;
    if (isVerified && type === 'validate') {
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
    user.token = await Hash.generateToken(user, config.AUTHENTICATION_SECRET);
    delete user.password;
    delete user.salt;
    return next();
  } catch (error) {
    error.label = enums.GENERATE_TOKEN_MIDDLEWARE;
    return next(error);
  }
};