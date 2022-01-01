import enums from '../../lib/enums';
import * as CartService from '../services/service.cart';
import ApiResponse from '../../lib/http/lib.http.response';
import CartModel from '../models/model.cart';

export const addProductToCart = async(req, res, next) => {
  try {
    const {
      user, query: { id }, body: { quantity, size }, product: { sellingPrice, productName }, cart,
    } = req;

    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId === id);
      if (productIndex > -1) {
        const payload = { id, cartId: cart.id };
        const updatedProduct = await CartService.updateProductQuantityInCart(payload);
        return ApiResponse.success(res, enums.PRODUCT_ADDED_TO_CART, enums.HTTP_OK, updatedProduct);
      }

      const updatePayload = {
        id: cart.id,
        productId: id,
        quantity,
        sellingPrice,
        size,
        productName,
      };
      const updatedCart = await CartService.updateCart(updatePayload);
      return ApiResponse.success(res, enums.PRODUCT_ADDED_TO_CART, enums.HTTP_CREATED, updatedCart);
    }
    const newCartPayload = {
      userId: user.id,
      products: [ {
        productId: id, quantity, productName, sellingPrice, size,
      } ],
    };
    const newCart = await CartService.createUserCart(CartModel, newCartPayload);
    return ApiResponse.success(res, enums.PRODUCT_ADDED_TO_CART, enums.HTTP_CREATED, newCart);
  } catch (error) {
    error.label = enums.ADD_PRODUCT_TO_CART_CONTROLLER;
    return next(error);
  }
};

export const getCart = async(req, res, next) => {
  try {
    const { cart } = req;
    return ApiResponse.success(res, enums.CART_FETCHED, enums.HTTP_OK, cart);
  } catch (error) {
    error.label = enums.GET_CART_CONTROLLER;
    return next(error);
  }
};

export const getItemInCart = async(req, res, next) => {
  try {
    const { cartItem: { products } } = req;
    return ApiResponse.success(res, enums.CART_ITEM_FETCHED, enums.HTTP_OK, products);
  } catch (error) {
    error.label = enums.GET_ITEM_IN_CART_CONTROLLER;
    return next(error);
  }
};

export const deleteFromCart = async(req, res, next) => {
  try {
    const { query, cart } = req;
    const payload = { productId: query.id, cartId: cart.id };
    await CartService.deleteFromCart(payload);
    return ApiResponse.success(res, enums.ITEM_DELETED_FROM_CART, enums.HTTP_OK, '');
  } catch (error) {
    error.label = enums.DELETE_FROM_CART_CONTROLLER;
    return next(error);
  }
};

export const deleteCart = async(req, res, next) => {
  try {
    const { user: { id } } = req;
    const payload = id;
    await CartService.deleteCart(payload);
    return ApiResponse.success(res, enums.CART_DELETED, enums.HTTP_OK, '');
  } catch (error) {
    error.label = enums.DELETE_CART_CONTROLLER;
    return next(error);
  }
};

export const editProductInCart = async(req, res, next) => {
  try {
    const { query: { id }, body: { quantity, size }, cart } = req;
    const payload = {
      cartId: cart.id,
      productId: id,
      quantity,
      size,
    };
    const editedProduct = await CartService.editProductInCart(payload);
    return ApiResponse.success(res, enums.CART_ITEM_EDITED, enums.HTTP_OK, editedProduct);
  } catch (error) {
    error.label = enums.EDIT_PRODUCT_IN_CART_CONTROLLER;
    return next(error);
  }
};
