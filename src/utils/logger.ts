// tslint:disable: no-console
import safeStringify from 'fast-safe-stringify';

type LoggerFunc = (...args: any[]) => void;
interface ILoggerObject { [key: string]: any; }

export interface ILogger {
  debug: LoggerFunc;
  error: LoggerFunc;
  warn: LoggerFunc;
  info: LoggerFunc;
  extend: (meta: ILoggerObject) => ILogger;
}

function prepareLog(meta: ILoggerObject, output: LoggerFunc): LoggerFunc {
  return (...args: any[]): void => {
    const logObj = args.reduce((acc: ILoggerObject, log: any, index: number) => {
      acc[`log${index || ''}`] = log;

      return acc;
    }, {});

    output(safeStringify({ ...meta, ...logObj }));
  };
}

export function createLogger(meta = {} as ILoggerObject, initialLoger = console): ILogger {
  const loggerMeta = { ...meta };

  return {
    debug: prepareLog(loggerMeta, initialLoger.debug),
    error: prepareLog(loggerMeta, initialLoger.error),
    info: prepareLog(loggerMeta, initialLoger.info),
    warn: prepareLog(loggerMeta, initialLoger.warn),
    extend(extendedMeta: ILoggerObject) {
      return createLogger({ ...loggerMeta, ...extendedMeta }, initialLoger);
    },
  };
}

export default createLogger();
