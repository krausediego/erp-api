import { Router } from 'express';

import { createClientValidateSchema } from '@/domain/schemas/client';
import { adaptRoute } from '@/main/adapters';
import { makeClientController } from '@/main/factories/application/controllers';
import { validateRequest } from '@/main/middlewares';

export default (router: Router): void => {
  router.post(
    '/client/create-client',
    validateRequest(createClientValidateSchema),
    adaptRoute(makeClientController('createClient')),
  );
};
