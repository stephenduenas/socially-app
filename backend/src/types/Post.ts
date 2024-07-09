import { z } from 'zod';

export const PostSchema = z
  .object({
    id: z.number(),
    user_id: z.number(),
    image_path: z.string().min(7),
    caption: z.string().min(0).max(100).optional(),
  })
  .strict();

export const UpdatePostSchema = z
  .object({
    user_id: z.number(),
    image_path: z.string().min(7),
    caption: z.string().min(0).max(100).optional(),
  })
  .strict();

export const CreatePostRequestBodySchema = PostSchema.omit({ id: true });

export type CreatePostRequestBody = z.infer<typeof CreatePostRequestBodySchema>;

export type Post = z.infer<typeof PostSchema>;

export type PostUpdateRequestParams = { postId: string };

export type CreatePost = Omit<Post, 'id'>;
