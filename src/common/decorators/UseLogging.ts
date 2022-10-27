import { UseInterceptors } from '@nestjs/common';

import { LoggingInterceptor } from '../../interceptors';

export const UseLogging = () => UseInterceptors(LoggingInterceptor)
