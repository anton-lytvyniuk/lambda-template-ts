// eslint-disable-next-line import/no-unresolved
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Application, Request } from 'express';

export interface IObject {
  [key: string]: any;
}

export interface IError extends Error {
  statusCode?: number;
  localisationCode?: number;
  validationErrors?: string[];
}

export interface IAPIGateWay {
  event?: APIGatewayProxyEvent;
  context?: Context;
}

export interface IAplication extends Application {
  logger?: (...args: any[]) => void;
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
