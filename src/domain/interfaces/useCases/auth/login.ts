export interface Login {
  run(params: Login.Params): Promise<Login.Response>;
}

export namespace Login {
  export type Params = {
    email: string;
    password: string;
  };

  export type ParamsUseCase = {
    params: Params;
    locals: any;
  };

  export type Response = {
    token: string;
  };
}
