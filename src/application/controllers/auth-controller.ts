import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import { Auth, Login, Register } from '@/domain/interfaces/useCases/auth';

export class AuthController implements Controller {
  constructor(
    private readonly useCaseName: Auth.AuthUseCaseName,
    private readonly useCase: Auth.AuthUseCase,
  ) {}

  async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.useCaseName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async register({
    params,
  }: Register.ParamsUseCase): Promise<Http.Response> {
    const { username, email, password } = params;

    const { message } = await (this.useCase() as Register).run({
      username,
      email,
      password,
    });

    return ok({ message });
  }

  private async login({ params }: Login.ParamsUseCase): Promise<Http.Response> {
    const { email, password } = params;

    const { token } = await (this.useCase() as Login).run({
      email,
      password,
    });

    return ok({ token }, true);
  }
}
