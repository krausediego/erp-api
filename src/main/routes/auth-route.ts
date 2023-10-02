import { Router } from 'express';

import {
  loginValidateSchema,
  registerValidateSchema,
} from '@/domain/schemas/auth';
import { adaptRoute } from '@/main/adapters';
import { makeAuthController } from '@/main/factories/application/controllers';
import { validateRequest } from '@/main/middlewares';

export default (router: Router): void => {
  router.post(
    '/register',
    validateRequest(registerValidateSchema),
    adaptRoute(makeAuthController('register')),
  );

  router.post(
    '/login',
    validateRequest(loginValidateSchema),
    adaptRoute(makeAuthController('login')),
  );
};
