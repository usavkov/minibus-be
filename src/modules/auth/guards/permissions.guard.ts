import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Permission, PERMISSIONS_KEY } from '%common/constants';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private readonly logger = new Logger(PermissionsGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions?.length) return true;

    const { user } = context.switchToHttp().getRequest();

    // TODO: unify logging
    this.logger.verbose(`Required permissions:\n${JSON.stringify(requiredPermissions, null, 2)}\n---\nUser permissions:\n${JSON.stringify(user.permissions, null, 2)}`);

    return requiredPermissions.every((perm: Permission) =>
      user.permissions?.includes(perm)
    );
  }
}
