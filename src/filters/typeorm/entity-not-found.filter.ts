import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilters implements ExceptionFilter {
  private readonly logger = new Logger(EntityNotFoundExceptionFilters.name);

  public catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const { stack, ...error } = new NotFoundException(
      exception.message
    ).getResponse() as EntityNotFoundError;

    this.logger.log(`${exception.name} | ${error.message}`);
    this.logger.debug(stack);

    response.status(404).json(error);
  }
}
