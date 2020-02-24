import { NextFunction, Response } from 'express';
import { getStatusText, INTERNAL_SERVER_ERROR } from 'http-status-codes';

import { IError, IRequest } from '../interface';

/**
 * Next is mandatory here because express treat it as an error handler.
 *
 * It will be skipped if we remove it. next
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: IError, req: IRequest, res: Response, next: NextFunction) => {
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
};
