import { Request, Response } from 'express';
import { UserService } from '../services';
import {
  LoginRequestBody,
  RegisterRequestBody,
  UserUpdate,
  UserUpdateRequestParams,
} from '../types/User';

export const register = async (
  req: Request<unknown, unknown, RegisterRequestBody>,
  res: Response
) => {
  const result = await UserService.register(req.body);
  return res.status(200).json({ message: result });
};

export const login = async (
  req: Request<unknown, unknown, LoginRequestBody>,
  res: Response
) => {
  const result = await UserService.login(req.body);
  return res.status(200).json({ message: result });
};

export const update = async (
  req: Request<UserUpdateRequestParams, unknown, UserUpdate>,
  res: Response
) => {
  await UserService.update(req.params.userId, req.body);
  return res.status(200).json({ message: 'User updated successfully.' });
};
