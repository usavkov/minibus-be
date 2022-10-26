import { SetMetadata } from '@nestjs/common';

import { Permission, PERMISSIONS_KEY } from '../constants';

/**
 * This decorator is used for specifying what roles are required to access a route (RBAC)
 *
 * E.g:
 *
 * \@RequirePermissions('users.collection.get')
 * \@Get('users')
 * getUsers() {}
 */
export const RequirePermissions = (...perms: Permission[]) => SetMetadata(PERMISSIONS_KEY, perms);
