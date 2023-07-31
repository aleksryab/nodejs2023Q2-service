import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { EntityNotFoundError } from './entity-not-found.error';
import { EntityConflictError } from './entity-conflict.error';
import { EntityUnprocessableError } from './entity-unprocessable.error';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof EntityNotFoundError) {
          throw new NotFoundException(error.message);
        }

        if (error instanceof EntityConflictError) {
          throw new ConflictException(error.message);
        }

        if (error instanceof EntityUnprocessableError) {
          throw new UnprocessableEntityException(error.message);
        }

        throw error;
      }),
    );
  }
}
