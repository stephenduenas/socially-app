import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/BadRequestError';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { JwtPayload as UserPayload } from '../types/User';
import InternalServerError from '../errors/InternalServerError';

type Payload = JwtPayload & UserPayload;

const verifyJwt = (token: string): Payload => {
  try {
    const result = <Payload>(
      jwt.verify(token, process.env.LOGIN_TOKEN_SECRET_KEY!)
    );
    if (typeof result === 'string') {
      throw new BadRequestError({
        message: 'Login token is wrong.',
      });
    }
    return result;
  } catch (error: unknown) {
    if (error instanceof JsonWebTokenError) {
      throw new BadRequestError({ message: error.message });
    }
    throw new InternalServerError({ message: 'JWT - Unknown Error.' });
  }
};

export const authenticateMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const loginToken = req.headers['login-token'];
  if (loginToken && typeof loginToken === 'string') {
    const { id } = verifyJwt(loginToken);
    req.body.user_id = id;
    next();
    return;
  }
  throw new BadRequestError({
    message: 'Login token is required.',
  });
};
