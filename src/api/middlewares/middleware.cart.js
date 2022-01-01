import enums from '../../lib/enums';
import * as CartService from '../services/service.cart';
import ApiResponse from '../../lib/http/lib.http.response';
 

export const getCart = (type = 'validate') => async(req, res, next) => {
  try {
    const { user: { _id } } = req;
    let payload = { userId: _id };
    const cart = await CartService.findCart(payload);
    if (!cart && type === 'authenticate') {
      return ApiResponse.error(res, enums.CART_NOT_EXIST, enums.HTTP_NOT_FOUND, enums.GET_CART_MIDDLEWARE);
    }
    if (!cart && type === 'validate') {
      return next();
    }
    req.cart = cart;
    return next();
  } catch (error) {
    error.label = enums.GET_CART_MIDDLEWARE;
    return next(error);
  }
};
