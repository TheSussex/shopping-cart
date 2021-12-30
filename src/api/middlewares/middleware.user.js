import enums from '../../lib/enums';
import * as AuthService from '../services/service.user';

export const getUser = (type = 'authenticate') => async(req, res, next) => {
    try {
      const { body, query } = req;
      const payload = body.email || query.id;
      const [ user ] = await AuthService.findUser(payload);
      if (user && type === 'validate') {
        return ApiResponse.error(res, enums.USER_EXIST, enums.HTTP_BAD_REQUEST, enums.GET_USER_MIDDLEWARE);
      }
      if (!user && type === 'verify') {
        return ApiResponse.error(res, enums.INVALID_VERIFICATION_TOKEN, enums.HTTP_NOT_FOUND, enums.GET_USER_MIDDLEWARE);
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