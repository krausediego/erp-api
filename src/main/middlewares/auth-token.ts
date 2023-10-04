import { adaptMiddleware } from '@/main/adapters';
import { makeAuthTokenMiddleware } from '@/main/factories/application/middlewares';

export const authToken = adaptMiddleware(makeAuthTokenMiddleware());
