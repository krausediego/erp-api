import { Client } from '@prisma/client';

export interface FindManyClients {
  run(params: FindManyClients.Params): Promise<FindManyClients.Response>;
}

export namespace FindManyClients {
  export type Params = {
    page: number;
    limit: number;
  };

  export type ParamsUseCase = {
    params: Params;
    locals?: any;
  };

  export type Response = {
    clients: Client[];
    total: number;
  };
}
