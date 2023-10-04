import {
  IAddressesRepository,
  IClientsRepository,
} from '@/domain/interfaces/repositories';
import { CreateClient } from '@/domain/interfaces/useCases/client';

export class CreateClientUseCase implements CreateClient {
  constructor(
    private readonly clientsRepository: IClientsRepository,
    private readonly addressesRepository: IAddressesRepository,
  ) {}

  async run(params: CreateClient.Params): Promise<CreateClient.Response> {
    const { client, address, userId } = params;

    let clientCreated;

    // It guarantees that even if the mandatory data for both types is past,
    // the customer will only be registered with the data referring to the chosen type.
    if (client.type === 'FISICO') {
      delete client.cnpj;
      delete client.inscricaoEstadual;
      delete client.razaoSocial;

      clientCreated = await this.clientsRepository.create({
        ...client,
        userId,
      });
    } else {
      delete client.birthDate;
      delete client.genre;
      delete client.cpf;

      clientCreated = await this.clientsRepository.create({
        ...client,
        userId,
      });
    }

    await this.addressesRepository.create({
      ...address,
      clientId: clientCreated!.id,
    });

    return {
      message: 'Cliente criado com sucesso!',
    };
  }
}
