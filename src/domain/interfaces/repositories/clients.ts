import { Address, Client, Prisma } from '@prisma/client';

export interface IClientsRepository {
  create(client: Prisma.ClientCreateManyInput): Promise<Client>;
  findManyClients(data: IClientsRepository.FindManyClientsProps): Promise<{
    clients: { client: Client; address: Address[] }[];
    total: number;
  }>;
  findClientById(
    data: IClientsRepository.FindClientByIdProps,
  ): Promise<IClientsRepository.FindClientByIdResponse | null>;
  updateClient(data: IClientsRepository.UpdateClientProps): Promise<void>;
}

export namespace IClientsRepository {
  export type FindManyClientsProps = {
    userId: string;
    page: number;
    limit: number;
    nameOrEmail?: string;
  };

  export type FindClientByIdProps = {
    userId: string;
    clientId: string;
  };

  export type FindClientByIdResponse = Client & {
    address: Address[];
  };

  export type UpdateClientProps = {
    client: Prisma.ClientUpdateManyMutationInput;
    clientId: string;
    userId: string;
  };
}
