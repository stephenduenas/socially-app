import { Router } from 'express';
import { UserController } from '../controllers';
import {
  LoginRequestBodySchema,
  RegisterRequestBodySchema,
  UserUpdateSchema,
} from '../types/User';
import { validateWrapperMiddleware } from '../middlewares/validate.middleware';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware';

const userRoute = Router();

/**
 * Register user with email, password and name inputs
 */
userRoute.post(
  '/register',
  validateWrapperMiddleware(RegisterRequestBodySchema),
  UserController.register
);

/**
 * Authenticate a user login session using input email and password if valid.
 */
userRoute.post(
  '/login',
  validateWrapperMiddleware(LoginRequestBodySchema),
  UserController.login
);

userRoute.put(
  '/:userId',
  authenticateMiddleware,
  validateWrapperMiddleware(UserUpdateSchema),
  UserController.update
);

export default userRoute;
