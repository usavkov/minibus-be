import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role, ROLES_KEY } from '%common/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles?.length) return true;

    const { user } = context.switchToHttp().getRequest();

    console.log('user', user)

    // TODO: unify logging
    this.logger.verbose(`Required roles:\n${JSON.stringify(requiredRoles, null, 2)}\n---\nUser roles:\n${JSON.stringify(user.roles, null, 2)}`);

    return requiredRoles.some((role: Role) => user.roles?.includes(role));
  }
}
