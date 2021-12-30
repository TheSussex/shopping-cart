import { Router } from 'express';
import * as AuthController from '../controllers/controller.auth';
import * as AuthMiddleware from '../middlewares/middleware.auth';
import * as UserMiddleware from '../middlewares/middleware.user';
import Model from '../middlewares/middleware.model';
import Schema from '../../lib/schema/lib.schema.auth';


const router = new Router();

router.post('/',
  Model(Schema.newUser, 'payload'),
  UserMiddleware.getUser('validate'),
  AuthMiddleware.generateEmailVerificationToken,
  AuthMiddleware.hashPassword,
  AuthController.registerUser,
  );

router.get('/confirmation',
  Model(Schema.verifyToken, 'query'),
  UserMiddleware.getUser('verify'),
  AuthMiddleware.isUserVerified('verify'),
  AuthMiddleware.checkVerificationToken,
  AuthController.verifyEmail,
);

router.post('login',
  Model(Schema.login, 'payload'),
  UserMiddleware.getUser('verify'),
  AuthMiddleware.isUserVerified(),
);