import { Router } from 'express';
import Model from '../middlewares/middleware.model';
import Schema from '../../lib/schema/lib.schema.category';
import * as AuthMiddleware from '../middlewares/middleware.auth';
import * as CategoryMiddleware from '../middlewares/middleware.category';
import * as CategoryController from '../controllers/controller.category';

const router = new Router();

router.post(
  '/',
  Model(Schema.newCategory, 'payload'),
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  AuthMiddleware.isAdmin,
  CategoryMiddleware.getCategory('validate'),
  CategoryController.addCategory,
);

router.get(
  '/',
  Model(Schema.getCategory, 'query'),
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  CategoryMiddleware.getCategory('authenticate'),
  CategoryController.getCategory,
);

router.get(
  '/all',
  AuthMiddleware.getAuthToken,
  AuthMiddleware.validateAuthToken,
  CategoryController.getCategories,
);

export default router;
