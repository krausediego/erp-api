import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import {
  Client,
  CreateClient,
  FindManyClients,
} from '@/domain/interfaces/useCases/client';

export class ClientController implements Controller {
  constructor(
    private readonly useCaseName: Client.ClientUseCaseName,
    private readonly useCase: Client.ClientUseCase,
  ) {}

  async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.useCaseName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async createClient({
    params,
  }: CreateClient.ParamsUseCase): Promise<Http.Response> {
    const { client, address } = params;

    const { message } = await (this.useCase() as CreateClient).run({
      client,
      address,
    });

    return ok({ message });
  }

  private async findManyClients({
    params,
  }: FindManyClients.ParamsUseCase): Promise<Http.Response> {
    const { page, limit } = params;

    const { clients, total } = await (this.useCase() as FindManyClients).run({
      page,
      limit,
    });

    return ok({ clients, total });
  }
}
