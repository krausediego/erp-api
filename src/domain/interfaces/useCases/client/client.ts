import { CreateClient } from '@/domain/interfaces/useCases/client';

export namespace Client {
  export type ClientUseCaseName = 'createClient';

  export type ClientUseCase = () => CreateClient;
}
