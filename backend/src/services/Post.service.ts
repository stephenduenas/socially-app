import PostRepository from '../repositories/Post.repository';
import { CreatePostRequestBody, Post } from '../types/Post';
import utils from '../utils';

export const create = async (user: CreatePostRequestBody) => {
  const { caption, ...userData } = user;
  await PostRepository.create({
    ...userData,
    caption,
    created_at: utils.getDateTime(),
    updated_at: utils.getDateTime(),
  });
  return true;
};

export const update = async (
  postId: Post['id'],
  user: CreatePostRequestBody
) => {
  const { caption, ...userData } = user;
  await PostRepository.update(postId, {
    ...userData,
    caption,
    updated_at: utils.getDateTime(),
  });
  return true;
};
