import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { isArray, isDefined } from 'class-validator';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(tap((data) => this.sanitize(data, 'password')));
  }

  sanitize<T>(source: T, field: string): T {
    if (typeof source !== 'object') return source;
    if (isArray(source)) {
      for (const item of source as any[]) {
        this.sanitize(item, field);
      }
    }
    for (const [key, value] of Object.entries(source) as any) {
      if (!isDefined(value)) continue;
      if (typeof value === 'object') {
        source[key] = this.sanitize(value, field);
      }
      if (key === field && source[key]) {
        delete source[key];
      }
    }
    return source;
  }
}
