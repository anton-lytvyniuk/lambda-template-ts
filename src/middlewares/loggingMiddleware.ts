// eslint-disable-next-line import/no-unresolved
import { NextFunction, Response } from 'express';
import safeStringify from 'fast-safe-stringify';
import { v4 as randomUuid } from 'uuid';

import logger from '../utils/logger';
import obfuscate from '../utils/obfuscator';

import {
  IAPIGateWay,
  IAPIGatewayEventRequestContext,
  IAPIGatewayProxyEvent,
  IContext,
  ILoggingMidlewareParams,
  IObfuscationObject,
  IRequest,
} from '../interface';

const CORRELATION_ID_HEADER_NAME = 'correlation-id';
const HEADERS_TO_OBFUSCATE = ['authorization'];

export default (params?: ILoggingMidlewareParams) => {
  const {
    handleFinishRequest,
    loggingRequest,
    obfuscate: {
      headers: headersToObfuscate,
      body: bodyToObfuscate,
      query: queryToObfuscate,
    } = {} as IObfuscationObject,
  } = params || {};

  return (req: IRequest, res: Response, next: NextFunction) => {
    const {
      originalUrl,
      method,
      headers,
      body,
      query,
      apiGateway: {
        event: {
          path,
          requestContext: {
            requestId,
          } = {} as IAPIGatewayEventRequestContext,
        } = {} as IAPIGatewayProxyEvent,
        context: {
          awsRequestId,
        } = {} as IContext,
      } = {} as IAPIGateWay,
    } = req;
    const id = randomUuid();
    const correlationId = req.get(CORRELATION_ID_HEADER_NAME) || randomUuid();

    res.append(CORRELATION_ID_HEADER_NAME, correlationId);

    req.app.logger = logger.extend({
      awsRequestId,
      correlation_id: correlationId,
      id,
      method,
      originalUrl,
      path,
      requestId,
    });

    if (handleFinishRequest) {
      res.on('finish', () => handleFinishRequest(req));
    }

    if (loggingRequest) {
      logger.info(safeStringify({
        body: body ? safeStringify(obfuscate(body, bodyToObfuscate)) : null,
        headers: safeStringify(obfuscate(headers, headersToObfuscate || HEADERS_TO_OBFUSCATE)),
        path: req.path || req.apiGateway?.event?.path,
        query: query ? safeStringify(obfuscate(query, queryToObfuscate)) : null,
      }));
    }
    next();
  };
};
