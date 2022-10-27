import { LogLevel } from '@nestjs/common';

export const getLogLevels = (env): LogLevel[] => {
  if (env === 'production') {
    return ['log', 'warn', 'error'];
  }

  return ['error', 'warn', 'log', 'verbose', 'debug'];
}
