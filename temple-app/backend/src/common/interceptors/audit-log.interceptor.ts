import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Attach @UseInterceptors(AuditLogInterceptor) plus a custom 'auditAction'
 * reflector value, OR call prisma.auditLog.create directly inside services
 * for fine-grained control (used for booking/payment/donation status changes).
 * This generic interceptor covers simple "admin did X" logging.
 */
@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        if (req.user) {
          this.prisma.auditLog
            .create({
              data: {
                userId: req.user.userId,
                action: `${req.method} ${req.route?.path || req.url}`,
                entityType: 'HTTP',
                ipAddress: req.ip,
              },
            })
            .catch(() => undefined);
        }
      }),
    );
  }
}
