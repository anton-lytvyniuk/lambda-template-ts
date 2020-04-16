
import aseMiddleware from 'aws-serverless-express/middleware';
import cors from 'cors';
import express from 'express';
import { validate } from 'express-validation';

import * as httpbinController from './controllers/httpbin';
import errorMiddleware from './middlewares/errorMiddleware';
import loggingMiddleware from './middlewares/loggingMiddleware';
import * as httpbinValidator from './validators/httbin';

const validationOptions = { keyByField: true, context: true };

export default () => {
  const app = express();

  return app
    .disable('x-powered-by')
    .use(express.json())
    .use(cors())
    .use(aseMiddleware.eventContext())
    .use(loggingMiddleware({ loggingRequest: true }))
    .get(
      '/v1/httpbin',
      validate(httpbinValidator.get, validationOptions),
      httpbinController.get,
    )
    .use(errorMiddleware);
};
