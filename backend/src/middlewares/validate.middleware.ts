import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateWrapperMiddleware = (zodSchema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    zodSchema.parse(req.body);
    next();
  };
};
