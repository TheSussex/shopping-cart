import enums from '../../lib/enums';
import * as CategoryService from '../services/service.category';
import ApiResponse from '../../lib/http/lib.http.response';

export const getCategory = (type = 'validate') => async(req, res, next) => {
  try {
    const { body, params: { code } } = req;
    let payload = { categoryCode: body.categoryCode };
    if (!body.categoryCode) { payload = { categoryCode: code }; }
    const category = await CategoryService.findCategory(payload);
    if (category && type === 'validate') {
      return ApiResponse.error(res, enums.CATEGORY_EXIST, enums.HTTP_BAD_REQUEST, enums.GET_CATEGORY_MIDDLEWARE);
    }
    if (!category && type === 'authenticate') {
      return ApiResponse.error(res, enums.CATEGORY_NOT_EXIST, enums.HTTP_NOT_FOUND, enums.GET_CATEGORY_MIDDLEWARE);
    }
    req.category = category;
    return next();
  } catch (error) {
    error.label = enums.GET_CATEGORY_MIDDLEWARE;
    return next(error);
  }
};
