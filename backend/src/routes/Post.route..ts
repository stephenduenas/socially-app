import { Router } from 'express';
import { PostController } from '../controllers';
import { validateWrapperMiddleware } from '../middlewares/validate.middleware';
import { CreatePostRequestBodySchema } from '../types/Post';

const postRoute = Router();

postRoute.post(
  '/',
  validateWrapperMiddleware(CreatePostRequestBodySchema),
  PostController.create
);

postRoute.put(
  '/:postId',
  validateWrapperMiddleware(CreatePostRequestBodySchema),
  PostController.update
);

export default postRoute;
