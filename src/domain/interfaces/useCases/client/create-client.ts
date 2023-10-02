import { Prisma } from '@prisma/client';

export interface CreateClient {
  run(params: CreateClient.Params): Promise<CreateClient.Response>;
}

export namespace CreateClient {
  export type Params = {
    client: Prisma.ClientCreateManyInput;
    address: Omit<Prisma.AddressCreateManyInput, 'clientId'>;
  };

  export type ParamsUseCase = {
    params: Params;
    locals?: any;
  };

  export type Response = {
    message: string;
  };
}
