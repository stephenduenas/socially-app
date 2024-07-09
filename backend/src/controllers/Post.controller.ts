import { Request, Response } from 'express';
import { CreatePostRequestBody, PostUpdateRequestParams } from '../types/Post';
import { PostService } from '../services';

export const create = async (
  req: Request<unknown, unknown, CreatePostRequestBody>,
  res: Response
) => {
  await PostService.create(req.body);
  return res.status(200).json({ message: 'Post created successfully' });
};

export const update = async (
  req: Request<PostUpdateRequestParams, unknown, CreatePostRequestBody>,
  res: Response
) => {
  await PostService.update(parseInt(req.params.postId, 10), req.body);
  return res.status(200).json({ message: 'Post updated successfully' });
};
