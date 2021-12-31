import enums from '../../lib/enums';
import * as UserService from '../services/service.user';
import ApiResponse from '../../lib/http/lib.http.response';
import UserModel from '../models/model.user';

export const registerUser = async(req, res, next) => {
  try {
    const { userCredentials, token: { encryptedToken, expires_at } } = req;
    const payload = {
      ...userCredentials,
      emailVerificationToken: encryptedToken,
      emailVerificationTokenExpiry: expires_at,
    };
    const user = await UserService.addNewUser(UserModel, payload);
    return ApiResponse.success(res, enums.REG_SUCCESSFUL, enums.HTTP_CREATED, user);
  } catch (error) {
    error.label = enums.REGISTER_USER_CONTROLLER;
    return next(error);
  }
};

export const verifyEmail = async(req, res, next) => {
  try {
    const { user: { email } } = req;
    const payload = { email, isVerified: true };
    const verifiedUser = await UserService.verifyUser(payload);
    return ApiResponse.success(res, enums.EMAIL_VERIFIED, enums.HTTP_OK, verifiedUser);
  } catch (error) {
    error.label = enums.VERIFY_EMAIL_CONTROLLER;
    return next(error);
  }
};

export const login = async(req, res, next) => {
  try {
    const { user } = req;
    return ApiResponse.success(res, enums.LOGIN_SUCCESSFUL, enums.HTTP_OK, user);
  } catch (error) {
    error.label = enums.LOGIN_CONTROLLER;
    return next(error);
  }
};
