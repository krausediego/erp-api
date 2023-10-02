import {
  CreateClient,
  FindManyClients,
} from '@/domain/interfaces/useCases/client';

export namespace Client {
  export type ClientUseCaseName = 'createClient' | 'findManyClients';

  export type ClientUseCase = () => CreateClient | FindManyClients;
}
