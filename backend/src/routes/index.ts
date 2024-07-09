// server/src/routes/index.ts

// Global dependencies
import { Router } from 'express';
const router = Router();
import userRoute from './User.route';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware';
import postRoute from './Post.route.';
// import resourceRoute from './resource';
// import { checkAuthToken } from '../middleware/auth';

// All routes for api
router.use('/user', userRoute);
router.use('/post', authenticateMiddleware, postRoute);

// router.use('/resource', checkAuthToken, resourceRoute);

export default router;
