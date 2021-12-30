import enums from '../../lib/enums';
import * as UserService from '../services/service.user';
import ApiResponse from '../../lib/http/lib.http.response';

export const registerUser = async(req, res, next) => {
  try {
    const { userCredentials, token: { encryptedToken, expires_at } } = req;
    const payload = [ ...userCredentials, encryptedToken, expires_at ];
    const [ user ] = await UserService.addNewUser(payload).save();
    return ApiResponse.success(res, enums.REG_SUCCESSFUL, enums.HTTP_CREATED, user);
  } catch (error) {
    error.label = enums.REGISTER_USER_CONTROLLER;
    return next(error);
  }
};

export const verifyEmail = async(req, res, next) => {
  try {
    const { user: { userId } } = req;
    const payload = { userId, isVerified: true };
    const verifiedUser = await UserService.verifyUser(payload);
    // return res.redirect(`${config.TONOTE_CLIENT_URL}/auth/sign-up/complete?id=${token}`); //no client url
    return ApiResponse.success(res, enums.EMAIL_VERIFIED, enums.HTTP_OK, verifiedUser);
  } catch (error) {
    error.label = enums.VERIFY_EMAIL_CONTROLLER;
    return next(error);
  }
};

export const login = async(req, res, next) => {
  try {
    const { user } = req;
    delete user.password;
    return ApiResponse.success(res, enums.LOGIN_SUCCESSFUL, enums.HTTP_OK, user);
  } catch (error) {
    error.label = enums.LOGIN_CONTROLLER;
    return next(error);
  }
};
