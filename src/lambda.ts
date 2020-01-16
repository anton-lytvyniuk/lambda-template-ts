/* eslint-disable import/prefer-default-export */
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import ase from 'aws-serverless-express';

import createApp from './app';

const getServer = Promise
  .resolve(createApp())
  .then((app) => ase.createServer(app))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

export function handler(event: APIGatewayProxyEvent, context: Context) {
  getServer.then((server) => ase.proxy(server, event, context));
}
