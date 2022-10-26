import { SetMetadata } from '@nestjs/common';

import { Role, ROLES_KEY } from '../constants';

/**
 * This decorator is used for specifying what roles are required to access a route (RBAC)
 *
 * E.g:
 *
 * \@Roles('admin', 'support')
 * \@Get('users')
 * getUsers() {}
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
