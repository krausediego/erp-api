import {
  Client,
  CreateClient,
  FindClientById,
  FindManyClients,
  UpdateClient,
} from '@/domain/interfaces/useCases/client';
import {
  CreateClientUseCase,
  FindClientByIdUseCase,
  FindManyClientsUseCase,
  UpdateClientUseCase,
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

const findClientById = (): FindClientById => {
  return new FindClientByIdUseCase(makeClientsRepository());
};

const updateClient = (): UpdateClient => {
  return new UpdateClientUseCase(
    makeClientsRepository(),
    makeAddressesRepository(),
  );
};

const useCases = {
  createClient,
  findManyClients,
  findClientById,
  updateClient,
};

const makeClientUseCase = (
  useClassName: Client.ClientUseCaseName,
): Client.ClientUseCase => {
  return useCases[useClassName];
};

export { makeClientUseCase };
