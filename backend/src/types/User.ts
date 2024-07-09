import { z } from 'zod';

const PASSWORD_REGEX = /^[ A-Za-z0-9_@./#&+-/!]*$/;
const USERNAME_REGEX = /^\w+$/;

export const UserSchema = z
  .object({
    id: z.number(),
    username: z.string().regex(USERNAME_REGEX).min(5),
    password: z.string().regex(PASSWORD_REGEX).min(7).max(50),
    first_name: z.string().min(3).max(100),
    last_name: z.string().min(3).max(100),
    email: z.string().email(),
    dob: z.string().date(),
    is_private: z.boolean().default(false),
  })
  .strict();

export const UserUpdateSchema = z
  .object({
    username: z.string().regex(USERNAME_REGEX).min(5).optional(),
    password: z.string().regex(PASSWORD_REGEX).min(7).max(50).optional(),
    first_name: z.string().min(3).max(100).optional(),
    last_name: z.string().min(3).max(100).optional(),
    email: z.string().email().optional(),
    dob: z.string().date().optional(),
    is_private: z.boolean().default(false).optional(),
    updated_at: z.string().date().optional(),
  })
  .strict();

export const RegisterRequestBodySchema = UserSchema.omit({ id: true });

export const LoginRequestBodySchema = UserSchema.pick({
  username: true,
  password: true,
});

export type User = z.infer<typeof UserSchema>;

export type RegisterRequestBody = Omit<User, 'id'>;

export type LoginRequestBody = Pick<User, 'username' | 'password'>;

export type UserUpdate = z.infer<typeof UserUpdateSchema>;

export type UserUpdateRequestParams = { userId: string };

export type JwtPayload = Omit<User, 'password'>;
