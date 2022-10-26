import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Permission, PERMISSIONS_KEY } from '../../common/constants';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions?.length) return true;

    const { user } = context.switchToHttp().getRequest();

    console.log('requiredPermissions', requiredPermissions);
    console.log('user.perms', user.perms);

    // TODO: return missed permissons together with error payload
    return requiredPermissions.every((perm: Permission) => user.perms?.includes(perm));
  }
}
