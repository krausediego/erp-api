import { BadRequestError } from '@/application/errors';
import {
  IAddressesRepository,
  IClientsRepository,
} from '@/domain/interfaces/repositories';
import { UpdateClient } from '@/domain/interfaces/useCases/client';

export class UpdateClientUseCase implements UpdateClient {
  constructor(
    private readonly clientsRepository: IClientsRepository,
    private readonly addressesRepository: IAddressesRepository,
  ) {}

  async run(params: UpdateClient.Params): Promise<UpdateClient.Response> {
    const { client, addresses, clientId, userId } = params;

    if (client?.type) {
      throw new BadRequestError('Não é possível alterar o tipo do cliente');
    }

    const clientFinded = await this.clientsRepository.findClientById({
      clientId,
      userId,
    });

    if (clientFinded?.type === 'FISICO') {
      delete client?.cnpj;
      delete client?.inscricaoEstadual;
      delete client?.razaoSocial;

      await this.clientsRepository.updateClient({ client, clientId, userId });
    } else {
      delete client?.cpf;
      delete client?.birthDate;
      delete client?.genre;

      await this.clientsRepository.updateClient({ client, clientId, userId });
    }

    if (addresses) {
      await Promise.all(
        addresses?.map(async address => {
          await this.addressesRepository.updateAddress({
            address: { ...address },
            addressId: address?.id as string,
          });
        }),
      );
    }

    return {
      message: 'Alterado com sucesso!',
    };
  }
}
