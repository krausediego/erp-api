import {
  Client,
  CreateClient,
  FindManyClients,
} from '@/domain/interfaces/useCases/client';
import {
  CreateClientUseCase,
  FindManyClientsUseCase,
} from '@/domain/useCases/client';
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

const findManyClients = (): FindManyClients => {
  return new FindManyClientsUseCase(makeClientsRepository());
};

const useCases = {
  createClient,
  findManyClients,
};

const makeClientUseCase = (
  useClassName: Client.ClientUseCaseName,
): Client.ClientUseCase => {
  return useCases[useClassName];
};

export { makeClientUseCase };
