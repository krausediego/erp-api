import { ClientController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { Client } from '@/domain/interfaces/useCases/client';
import { makeClientUseCase } from '@/main/factories/domain/useCases';

export const makeClientController = (
  useCaseName: Client.ClientUseCaseName,
): Controller => {
  return new ClientController(useCaseName, makeClientUseCase(useCaseName));
};
