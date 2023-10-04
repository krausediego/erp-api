import { ForbiddenError } from '@/application/errors';
import { getHttpError, ok } from '@/application/helpers';
import { Http, Middleware } from '@/application/interfaces';
import { Token } from '@/domain/interfaces/token';

type Params = {
  authorization: string;
};

export class AuthTokenMiddleware implements Middleware {
  constructor(private readonly token: Token) {}

  async handle(params: Http.Request<Params>): Promise<Http.Response> {
    try {
      const { authorization } = params.data;

      if (!authorization) {
        throw new Error('Token not provided');
      }

      const [authPrefix, token] = authorization.split(' ');

      if (!authPrefix || !token) {
        throw new Error('Authorization invalid');
      }

      this.token.checkToken(token);

      return ok({ userId: this.token.decodeToken(token) });
    } catch (error: any) {
      return getHttpError(new ForbiddenError(error.message));
    }
  }
}
