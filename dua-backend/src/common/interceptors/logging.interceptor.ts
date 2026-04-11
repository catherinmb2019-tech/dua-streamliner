import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

/**
 * Global logging interceptor.
 * Emits structured JSON log entries (request-id, method, path, latency)
 * compatible with AWS CloudWatch structured logging requirements.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, headers } = request;
    const requestId = (headers['x-request-id'] as string) ?? 'unknown';
    const startedAt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const latencyMs = Date.now() - startedAt;
        this.logger.log({
          requestId,
          method,
          url,
          latencyMs,
        });
      }),
    );
  }
}
