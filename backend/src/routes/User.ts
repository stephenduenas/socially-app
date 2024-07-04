import { Router } from 'express';
import { UserController } from '../controllers';
const userRoute = Router();

/**
 * Register user with email, password and name inputs
 */
userRoute.post('/register', UserController.register);

/**
 * Authenticate a user login session using input email and password if valid.
 */
userRoute.post('/login', UserController.login);

export default userRoute;
