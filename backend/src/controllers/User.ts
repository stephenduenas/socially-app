import { Request, Response } from 'express';
import { UserService } from '../services';
import {
  LoginRequestBody,
  LoginRequestBodySchema,
  RegisterRequestBody,
  RegisterRequestBodySchema,
} from '../types/User';

const validateRegisterRequestBody = (body: RegisterRequestBody) =>
  RegisterRequestBodySchema.parse(body);

const validateLoginRequestBody = (body: LoginRequestBody) =>
  LoginRequestBodySchema.parse(body);

export const register = async (
  req: Request<unknown, unknown, RegisterRequestBody>,
  res: Response
) => {
  const registrationDetails = validateRegisterRequestBody(req.body);
  const result = await UserService.register(registrationDetails);
  return res.status(200).json({ message: result });
};

export const login = async (
  req: Request<unknown, unknown, LoginRequestBody>,
  res: Response
) => {
  const registrationDetails = validateLoginRequestBody(req.body);
  const result = await UserService.login(registrationDetails);

  return res.status(200).json({ message: result });
};
