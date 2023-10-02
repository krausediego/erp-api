import { IClientsRepository } from '@/domain/interfaces/repositories';
import { FindManyClients } from '@/domain/interfaces/useCases/client';

export class FindManyClientsUseCase implements FindManyClients {
  constructor(private readonly clientsRepository: IClientsRepository) {}

  async run(params: FindManyClients.Params): Promise<FindManyClients.Response> {
    const { page, limit } = params;

    const { clients, total } = await this.clientsRepository.findManyClients(
      page,
      limit,
    );

    return {
      clients,
      total,
    };
  }
}
