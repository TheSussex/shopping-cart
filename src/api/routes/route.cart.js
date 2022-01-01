import { Router } from 'express';
import Model from '../middlewares/middleware.model';
import Schema from '../../lib/schema/lib.schema.cart';
import * as AuthMiddleware from '../middlewares/middleware.auth';
import * as CartMiddleware from '../middlewares/middleware.cart';
import * as CartController from '../controllers/controller.cart';
import * as ProductMiddleware from '../middlewares/middleware.product';


const router = new Router();

router.post(
  '/',
  Model(Schema.addToCart, 'payload'),
  Model(Schema.addToCartQuery, 'query'),
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  ProductMiddleware.getProduct,
  CartMiddleware.getCart('validate'),
  CartController.addProductToCart,
);

router.delete(
  '/all',
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  CartMiddleware.getCart('authenticate'),
  CartController.deleteCart,
);

router.delete(
  '/',
  Model(Schema.deleteFromCart, 'query'),
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  ProductMiddleware.getProduct,
  CartMiddleware.getCart('authenticate'),
  CartMiddleware.getItemInCart,
  CartController.deleteFromCart,
);

router.get(
  '/all',
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  CartMiddleware.getCart('authenticate'),
  CartController.getCart,
);

router.get(
  '/',
  Model(Schema.getItemInCartQuery, 'query'),
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  ProductMiddleware.getProduct,
  CartMiddleware.getCart('authenticate'),
  CartMiddleware.getItemInCart,
  CartController.getItemInCart,
);

router.patch(
  '/',
  Model(Schema.editProductInCart, 'payload'),
  Model(Schema.editProductInCartQuery, 'query'),
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  ProductMiddleware.getProduct,
  CartMiddleware.getCart('authenticate'),
  CartMiddleware.getItemInCart,
  CartController.editProductInCart,
);

export default router;
