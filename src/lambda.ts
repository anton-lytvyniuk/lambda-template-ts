/* eslint-disable import/prefer-default-export */
import ase from 'aws-serverless-express';

import createApp from './app';
import { IAPIGatewayProxyEvent, IContext } from './interface';

const getServer = Promise
  .resolve(createApp())
  .then((app) => ase.createServer(app))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

export function handler(event: IAPIGatewayProxyEvent, context: IContext) {
  getServer.then((server) => ase.proxy(server, event, context));
}
