import { Router } from 'express';

import {
  createClientValidateSchema,
  findClientByIdValidateSchema,
  findManyClientsValidateSchema,
  updateClientValidateSchema,
} from '@/domain/schemas/client';
import { adaptRoute } from '@/main/adapters';
import { makeClientController } from '@/main/factories/application/controllers';
import { authToken, validateRequest } from '@/main/middlewares';

export default (router: Router): void => {
  router.post(
    '/client/create-client',
    authToken,
    validateRequest(createClientValidateSchema),
    adaptRoute(makeClientController('createClient')),
  );

  router.get(
    '/client/find-many-clients/:page?/:limit?',
    authToken,
    validateRequest(findManyClientsValidateSchema),
    adaptRoute(makeClientController('findManyClients')),
  );

  router.get(
    '/client/find-client-by-id/:clientId?',
    authToken,
    validateRequest(findClientByIdValidateSchema),
    adaptRoute(makeClientController('findClientById')),
  );

  router.put(
    '/client/update-client/:clientId?',
    authToken,
    validateRequest(updateClientValidateSchema),
    adaptRoute(makeClientController('updateClient')),
  );
};
