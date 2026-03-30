import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClsContextService } from '../clst_context.service';
import { log } from 'console';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userName = request.user?.username || 'Unknown User';

    if (userName) {
      return new Observable((observer) => {
        ClsContextService.run(userName, () => {
          next.handle().subscribe(observer);
        });
      });
    }
    return next.handle();
  }
}
