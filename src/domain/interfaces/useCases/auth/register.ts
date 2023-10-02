import { Prisma } from '@prisma/client';

export interface Register {
  run(params: Register.Params): Promise<Register.Response>;
}

export namespace Register {
  export type Params = Prisma.UserCreateManyInput;

  export type ParamsUseCase = {
    params: Params;
    locals: any;
  };

  export type Response = {
    message: string;
  };
}
