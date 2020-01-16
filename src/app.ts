
import aseMiddleware from 'aws-serverless-express/middleware';
import express from 'express';

import * as httpbinController from './controllers/httpbin';
import errorHandler from './midelwares/errorHandler';
import loggingMidleware from './midelwares/logging';

export default () => {
  const app = express();

  app.disable('x-powered-by');

  return app
    .use(express.json())
    .use(aseMiddleware.eventContext())
    .use(loggingMidleware({ loggingRequest: true }))
    .get('/v1/httpbin', httpbinController.get)
    .use(errorHandler);
};
