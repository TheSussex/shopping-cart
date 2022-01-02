import enums from '../../lib/enums';
import * as UserService from '../services/service.user';
import ApiResponse from '../../lib/http/lib.http.response';

export const getUser = (type = 'authenticate') => async(req, res, next) => {
  try {
    const { body, query } = req;
    let payload = { email: body.email };
    if (!body.email) { payload = { emailVerificationToken: query.id }; }
    const data = await UserService.findUser(payload);
    if (!data && type === 'validate') {
      return next();
    }
    const user = data ? { ...data._doc } : data;
    if (user && type === 'validate') {
      return ApiResponse.error(res, enums.USER_EXIST, enums.HTTP_BAD_REQUEST, enums.GET_USER_MIDDLEWARE);
    }
    if (!user && type === 'verify') {
      return ApiResponse.error(res, enums.INVALID_VERIFICATION_TOKEN, enums.HTTP_BAD_REQUEST, enums.GET_USER_MIDDLEWARE);
    }
    if (!user && type === 'authenticate') {
      return ApiResponse.error(res, enums.USER_NOT_EXIST, enums.HTTP_NOT_FOUND, enums.GET_USER_MIDDLEWARE);
    }
    req.user = user;
    return next();
  } catch (error) {
    error.label = enums.GET_USER_MIDDLEWARE;
    return next(error);
  }
};
