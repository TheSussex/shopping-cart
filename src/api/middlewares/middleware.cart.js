import enums from '../../lib/enums';
import * as CartService from '../services/service.cart';
import ApiResponse from '../../lib/http/lib.http.response';

export const getCart = (type = 'validate') => async(req, res, next) => {
  try {
    const { user: { _id } } = req;
    const payload = { userId: _id };
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

export const getItemInCart = async(req, res, next) => {
  try {
    const { cart, query } = req;
    const payload = { id: query.id, cartId: cart.id };
    const cartItem = await CartService.getItemInCart(payload);
    if (!cartItem) {
      return ApiResponse.error(res, enums.ITEM_NOT_IN_CART, enums.HTTP_NOT_FOUND, enums.GET_ITEM_IN_CART_MIDDLEWARE);
    }
    req.cartItem = cartItem;
    return next();
  } catch (error) {
    error.label = enums.GET_ITEM_IN_CART_MIDDLEWARE;
    return next(error);
  }
};
