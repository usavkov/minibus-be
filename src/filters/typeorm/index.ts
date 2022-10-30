import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

import { EntityNotFoundExceptionFilters } from './entity-not-found.filter';

// TODO: required refactoring: what if error will be on GraphQL layer?

const exceptionFilters = {
  EntityNotFoundError: EntityNotFoundExceptionFilters,
} as { [key: string]: any };

@Catch(TypeORMError)
export class TypeOrmExceptionFilters implements ExceptionFilter {
  private readonly logger = new Logger(TypeOrmExceptionFilters.name);

  public catch(exception: TypeORMError, host: ArgumentsHost) {
    const Filter = exceptionFilters[exception.name];

    if (Filter) {
      return new Filter().catch(exception, host);
    }

    const { name, message, stack } = exception;

    const context = host.switchToHttp();

    // TODO: unify logger
    this.logger.error(`${name} | ${message}`);
    this.logger.debug(stack);

    return context
      .getResponse()
      .status(500)
      .json({
        name,
        message,
      });
  }
}
