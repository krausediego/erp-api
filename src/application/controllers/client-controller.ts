import { created, getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import {
  Client,
  CreateClient,
  FindClientById,
  FindManyClients,
  UpdateClient,
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
    locals,
  }: CreateClient.ParamsUseCase): Promise<Http.Response> {
    const { client, address } = params;
    const { userId } = locals;

    const { message } = await (this.useCase() as CreateClient).run({
      client,
      address,
      userId,
    });

    return created({ message });
  }

  private async findManyClients({
    params,
    locals,
  }: FindManyClients.ParamsUseCase): Promise<Http.Response> {
    const { page, limit, nameOrEmail } = params;
    const { userId } = locals;

    const { clients, total } = await (this.useCase() as FindManyClients).run({
      page,
      limit,
      nameOrEmail,
      userId,
    });

    return ok({ clients, total });
  }

  private async findClientById({
    params,
    locals,
  }: FindClientById.ParamsUseCase): Promise<Http.Response> {
    const { clientId } = params;
    const { userId } = locals;

    const client = await (this.useCase() as FindClientById).run({
      userId,
      clientId,
    });

    return ok({ ...client });
  }

  private async updateClient({
    params,
    locals,
  }: UpdateClient.ParamsUseCase): Promise<Http.Response> {
    const { client, addresses, clientId } = params;
    const { userId } = locals;

    const { message } = await (this.useCase() as UpdateClient).run({
      client,
      addresses,
      clientId,
      userId,
    });

    return ok({ message });
  }
}
