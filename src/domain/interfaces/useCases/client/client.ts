import {
  CreateClient,
  FindClientById,
  FindManyClients,
  UpdateClient,
} from '@/domain/interfaces/useCases/client';

export namespace Client {
  export type ClientUseCaseName =
    | 'createClient'
    | 'findManyClients'
    | 'findClientById'
    | 'updateClient';

  export type ClientUseCase = () =>
    | CreateClient
    | FindManyClients
    | FindClientById
    | UpdateClient;
}
