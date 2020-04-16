import { NextFunction, Response } from 'express';
import { ValidationError } from 'express-validation';
import { getStatusText, INTERNAL_SERVER_ERROR } from 'http-status-codes';

import logger from '../utils/logger';

import { IRequest } from '../interface';

interface IError extends Error {
  statusCode?: number;
  localisationCode?: number;
  validationErrors?: string[];
}

function getMessageFromValidationError(err: any) {
  return Object.values(err.details[0])[0];
}

/**
 * Next is mandatory here because express treat it as an error handler.
 *
 * It will be skipped if we remove it. next
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: IError, req: IRequest, res: Response, next: NextFunction) => {
  (req.app.logger || logger).error(err);

  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({
      http_status: err.statusCode,
      message: getMessageFromValidationError(err) || getStatusText(err.statusCode),
      validation_errors: true,
    });
  } else {
    const {
      statusCode = INTERNAL_SERVER_ERROR,
      message,
      localisationCode,
      validationErrors,
    } = err;

    const response = {
      http_status: statusCode,
      localisation_code: localisationCode ? String(localisationCode) : undefined,
      message: message || getStatusText(statusCode),
      validation_errors: validationErrors,
    };

    res.status(statusCode).json(response);
  }
};
