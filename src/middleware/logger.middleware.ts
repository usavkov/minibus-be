import * as chalk from 'chalk';

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const getMessage = (request: Request, response: Response) => {
  const method =
    {
      POST: chalk.yellow('POST'),
      PUT: chalk.blue('PUT'),
      PATCH: chalk.blue('PATCH'),
      DELETE: chalk.red('DELETE'),
    }[request.method] || chalk.green(request.method);

  const status = ((code) => {
    const statusInfo = `${code} ${response.statusMessage}`;

    if (code >= 400) return chalk.red(statusInfo);
    if (code >= 300) return chalk.cyan(statusInfo);

    return chalk.green(statusInfo);
  })(response.statusCode);

  const originalUrl = chalk.cyanBright(chalk.underline(request.originalUrl));

  return `${method} ${originalUrl} ${status}`;
};

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl } = request;
      const { statusCode } = response;
      const message = getMessage(request, response);

      if (Object.keys(request.body).length > 0) {
        this.logger.debug(
          `Request body (${method} ${originalUrl}):\n---\n${JSON.stringify(
            request.body,
            null,
            2
          )}\n---`
        );
      }

      if (statusCode >= 400) return this.logger.error(message);
      if (statusCode >= 300) return this.logger.warn(message);

      return this.logger.log(message);
    });

    next();
  }
}
