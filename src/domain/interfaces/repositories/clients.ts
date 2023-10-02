import { Client, Prisma } from '@prisma/client';

export interface IClientsRepository {
  create(client: Prisma.ClientCreateManyInput): Promise<Client>;
  findManyClients(
    page: number,
    limit: number,
  ): Promise<{ clients: Client[]; total: number }>;
}
