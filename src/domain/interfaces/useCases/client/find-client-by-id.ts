import { Address, Client } from '@prisma/client';

export interface FindClientById {
  run(params: FindClientById.Params): Promise<FindClientById.Response>;
}

export namespace FindClientById {
  export type Params = {
    userId: string;
    clientId: string;
  };

  export type ParamsUseCase = {
    params: Params;
    locals?: any;
  };

  export type Response = {
    client: Client;
    address: Address[];
  } | null;
}
