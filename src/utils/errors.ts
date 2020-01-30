/* eslint-disable max-classes-per-file */
// import { try } from "bluebird";
// tslint:disable: max-classes-per-file

export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class InternalError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnprocessableError extends CustomError {
  constructor(message: string) {
    super(message, 422);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}
