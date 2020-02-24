
import aseMiddleware from 'aws-serverless-express/middleware';
import express from 'express';

import * as httpbinController from './controllers/httpbin';
import errorMiddleware from './middlewares/errorMiddleware';
import loggingMiddleware from './middlewares/loggingMiddleware';

export default () => {
  const app = express();

  app.disable('x-powered-by');

  return app
    .use(express.json())
    .use(aseMiddleware.eventContext())
    .use(loggingMiddleware({ loggingRequest: true }))
    .get('/v1/httpbin', httpbinController.get)
    .use(errorMiddleware);
};
