import { Prisma } from '@prisma/client';

export interface UpdateClient {
  run(params: UpdateClient.Params): Promise<UpdateClient.Response>;
}

export namespace UpdateClient {
  export type Params = {
    client: Prisma.ClientUpdateManyMutationInput;
    addresses: Prisma.AddressUpdateManyMutationInput[];
    clientId: string;
    userId: string;
  };

  export type ParamsUseCase = {
    params: Params;
    locals?: any;
  };

  export type Response = {
    message: string;
  };
}
