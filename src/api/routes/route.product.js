import { Router } from 'express';
import Model from '../middlewares/middleware.model';
import Schema from '../../lib/schema/lib.schema.product';
import * as AuthMiddleware from '../middlewares/middleware.auth';
import * as ProductController from '../controllers/controller.product';
import * as ProductMiddleware from '../middlewares/middleware.product';
import * as CategoryMiddleware from '../middlewares/middleware.category';

const router = new Router();

router.post(
  '/',
  Model(Schema.newProduct, 'payload'),
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  AuthMiddleware.isAdmin, // only admins can add, edit and delete product from a category
  CategoryMiddleware.getCategory('authenticate'),
  ProductMiddleware.getProductInCategory('validate'),
  ProductController.addProductToCategory,
);

router.patch(
  '/',
  Model(Schema.editProduct, 'payload'),
  Model(Schema.editProductQuery, 'query'),
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  AuthMiddleware.isAdmin,
  ProductMiddleware.getProduct,
  ProductController.editProduct,
);

router.delete(
  '/',
  Model(Schema.deleteProduct, 'query'),
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  AuthMiddleware.isAdmin,
  ProductMiddleware.getProduct,
  ProductController.deleteProduct,
);

router.get(
  '/',
  Model(Schema.getProduct, 'query'),
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  ProductMiddleware.getProduct,
  ProductController.getProduct,
);

export default router;
