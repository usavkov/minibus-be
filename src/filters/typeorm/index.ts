import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError, TypeORMError } from 'typeorm';

const errorsMap = new Map();

// NotFoundException
errorsMap.set(
  [EntityNotFoundError.name],
  (exception: TypeORMError, host: ArgumentsHost) => {
    const error = new NotFoundException(
      exception.message
    ).getResponse() as object;

    return {
      ...error,
      code: exception.name,
      stack: exception.stack,
    };
  }
);

@Catch(TypeORMError)
export class TypeOrmExceptionFilters implements ExceptionFilter {
  private readonly logger = new Logger(TypeOrmExceptionFilters.name);

  public catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const [, getError] = [...errorsMap.entries()].find(([errorClasses]) =>
      errorClasses.includes(exception.name)
    );

    const { stack, ...error } = getError(exception, host);

    this.logger.log(`${exception.name} | ${error.message}`);
    this.logger.debug(stack);

    response.status(error.statusCode).json(error);
  }
}
