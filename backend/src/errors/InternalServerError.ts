import { CustomError, ErrorParameters } from './CustomError';

export default class InternalServerError extends CustomError {
  private static readonly _errorTitle = 'Internal Server Error';
  private static readonly _statusCode = 500;
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: unknown };

  constructor(params?: ErrorParameters) {
    const { code, message, logging } = params || {};
    const errorMessage = `${InternalServerError._errorTitle}: ${
      message || 'Something went wrong.'
    }`;
    super(errorMessage);
    this._code = code || InternalServerError._statusCode;
    this._logging = logging || false;
    this._context = params?.context || {};

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}
