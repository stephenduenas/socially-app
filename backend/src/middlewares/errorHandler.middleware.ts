import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/CustomError';
import { ZodError } from 'zod';
import { CustomErrorContent } from '../errors/CustomError';

interface IErrorResponse {
  errors: CustomErrorContent[];
}

const formatZodError = (err: ZodError) => {
  const UNRECOGNIZED_KEY = 'unrecognized_keys';
  const errors = err.errors;
  const message = errors[0].message;
  const key = errors[0].path[0];
  let errorMessage = '';
  errorMessage =
    errors[0].code === UNRECOGNIZED_KEY
      ? errors[0].message
      : `${key}: ${message}`;
  const formattedError: CustomErrorContent = {
    message: errorMessage,
    context: {
      errors,
    },
  };
  return [formattedError];
};

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    if (logging) {
      console.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          2
        )
      );
    }
    const response: IErrorResponse = { errors };
    return res.status(statusCode).send(response);
  }

  if (err instanceof ZodError) {
    const response: IErrorResponse = { errors: formatZodError(err) };
    return res.status(400).send(response);
  }

  // Unhandled errors
  console.error(JSON.stringify(err, null, 2));
  const response: IErrorResponse = {
    errors: [{ message: 'Something went wrong', context: {} }],
  };
  return res.status(500).send(response);
};
