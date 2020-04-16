// eslint-disable-next-line import/no-unresolved
import { APIGatewayEventRequestContext, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Application, Request } from 'express';

import { ILogger } from './utils/logger';

export interface IObject {
  [key: string]: any;
}

export interface IError extends Error {
  statusCode?: number;
  localisationCode?: number;
  validationErrors?: string[];
}

export type IAPIGatewayProxyEvent = APIGatewayProxyEvent;

export type IContext = Context;

export type IAPIGatewayEventRequestContext = APIGatewayEventRequestContext;

export interface IAPIGateWay {
  event?: APIGatewayProxyEvent;
  context?: Context;
}

export interface IAplication extends Application {
  logger?: ILogger;
}

export interface IRequest extends Request {
  apiGateway?: IAPIGateWay;
  app: IAplication;
}

export interface IObfuscationObject {
  headers?: string[];
  body?: string[];
  query?: string[];
}

export interface ILoggingMidlewareParams {
  handleFinishRequest?: (req: IRequest) => void;
  loggingRequest?: boolean;
  obfuscate?: IObfuscationObject;
}
