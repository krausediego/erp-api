import { Client, CreateClient } from '@/domain/interfaces/useCases/client';
import { CreateClientUseCase } from '@/domain/useCases/client';
import {
  makeAddressesRepository,
  makeClientsRepository,
} from '@/main/factories/domain/repositories';

const createClient = (): CreateClient => {
  return new CreateClientUseCase(
    makeClientsRepository(),
    makeAddressesRepository(),
  );
};

const useCases = {
  createClient,
};

const makeClientUseCase = (
  useClassName: Client.ClientUseCaseName,
): Client.ClientUseCase => {
  return useCases[useClassName];
};

export { makeClientUseCase };
