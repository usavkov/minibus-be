import { SetMetadata } from '@nestjs/common';

import { IS_PUBLIC_ROUTE_KEY } from '../constants';

/**
 * This decorator is used for making a route (in controllers) public - by default all the routes are protected
 *
 * E.g:
 *
 * \@Public
 * \@Get(users)
 * getUsers() {}
 */
export const Public = () => SetMetadata(IS_PUBLIC_ROUTE_KEY, true);
