import { NotFoundError } from '@/application/errors';
import { IClientsRepository } from '@/domain/interfaces/repositories';
import { FindClientById } from '@/domain/interfaces/useCases/client';

export class FindClientByIdUseCase implements FindClientById {
  constructor(private readonly clientsRepository: IClientsRepository) {}

  async run(params: FindClientById.Params): Promise<FindClientById.Response> {
    const { userId, clientId } = params;

    const client = await this.clientsRepository.findClientById({
      userId,
      clientId,
    });

    if (!client) {
      throw new NotFoundError('Nenhum cliente encontrado para o ID fornecido');
    }

    const { address, ...rest } = client;

    return {
      client: rest,
      address,
    };
  }
}
