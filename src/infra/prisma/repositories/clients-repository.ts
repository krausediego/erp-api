import { IClientsRepository } from '@/domain/interfaces/repositories';
import { Prisma, Client } from '@prisma/client';

import { PrismaManager } from '../prisma-manager';

export class ClientsRepository implements IClientsRepository {
  async create(client: Prisma.ClientCreateManyInput): Promise<Client> {
    return PrismaManager.client.create({ data: client });
  }

  async findManyClients(
    page: number,
    limit: number,
  ): Promise<{ clients: Client[]; total: number }> {
    const [clients, total] = await PrismaManager.$transaction([
      PrismaManager.client.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      PrismaManager.client.count(),
    ]);

    return {
      clients,
      total,
    };
  }
}
