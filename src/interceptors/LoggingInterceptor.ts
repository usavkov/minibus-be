import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const _class = context.getClass();
    const handler = context.getHandler();
    const _type = context.getType();
    const logger = new Logger(`${context.getClass().name} > ${handler.name}`);

    logger.verbose(
      `Intercepted "${handler.name}" handler of "${_class.name}" class. Type - "${_type}"`
    );

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => logger.verbose(`Interception handled +${Date.now() - now}ms`))
      );
  }
}
