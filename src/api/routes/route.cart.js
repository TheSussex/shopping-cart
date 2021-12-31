// import { Router } from 'express';
// import * as AuthMiddleware from '../middlewares/middleware.auth';
// import Model from '../middlewares/middleware.model';
// import Schema from '../../lib/schema/lib.schema.auth';

// const router = new Router();

// router.post(
//   '/',
//   Model(Schema.newProduct, 'payload'),
//   AuthMiddleware.getAuthToken,
//   AuthMiddleware.validateAuthToken,
//   AuthMiddleware.isAdmin,
//   ProductController.addProductToCategory,
// );

// router.patch(
//   '/',
//   Model(Schema.editProduct, 'payload'),
//   AuthMiddleware.getAuthToken,
//   AuthMiddleware.validateAuthToken,
//   AuthMiddleware.isAdmin,
//   ProductController.editProduct,
// );

// router.delete(
//   '/:sku',
//   AuthMiddleware.getAuthToken,
//   AuthMiddleware.validateAuthToken,
//   AuthMiddleware.isAdmin,
//   ProductMiddleware.getProduct,
//   ProductController.deleteProduct,
// );

// router.get(
//   '/:sku',
//   AuthMiddleware.getAuthToken,
//   AuthMiddleware.validateAuthToken,
//   ProductController.getProduct, // name or product sku
// );

// router.get(
//   '/',
//   AuthMiddleware.getAuthToken,
//   AuthMiddleware.validateAuthToken,
//   ProductController.getProductByCategory,
// );

// export default router;
