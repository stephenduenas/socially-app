import { db } from '../knexfile';
import InternalServerError from '../errors/InternalServerError';
import { TPost, Post as TablePost } from '../db/models/post-table';
import { Post } from '../types/Post';

const getPostById = async (postId: TPost['id']) => {
  try {
    const result = await db<Post>(TablePost.TableName)
      .select('*')
      .where(TablePost.Column.Id, postId)
      .first();
    return result;
  } catch (error) {
    throw new InternalServerError({ message: JSON.stringify(error) });
  }
};

const create = async (postData: Omit<TPost, 'id'>) => {
  try {
    const result = await db<Post>(TablePost.TableName).insert({
      ...postData,
    });
    return result;
  } catch (error) {
    throw new InternalServerError({ message: JSON.stringify(error) });
  }
};

const update = async (
  postId: TPost['id'],
  postData: Omit<TPost, 'id' | 'created_at'>
) => {
  try {
    const result = await db<Post>(TablePost.TableName)
      .where({
        [TablePost.Column.Id]: postId,
      })
      .update({
        ...postData,
      });
    return result;
  } catch (error) {
    throw new InternalServerError({ message: JSON.stringify(error) });
  }
};

export default {
  getPostById,
  create,
  update,
};
