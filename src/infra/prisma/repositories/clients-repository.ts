import { IClientsRepository } from '@/domain/interfaces/repositories';
import { Prisma, Client, Address } from '@prisma/client';

import { PrismaManager } from '../prisma-manager';

export class ClientsRepository implements IClientsRepository {
  async create(client: Prisma.ClientCreateManyInput): Promise<Client> {
    return PrismaManager.client.create({ data: client });
  }

  async findManyClients(
    page: number,
    limit: number,
  ): Promise<{
    clients: { client: Client; address: Address }[];
    total: number;
  }> {
    const [docs, total] = await PrismaManager.$transaction([
      PrismaManager.client.findMany({
        include: { address: true },
        skip: (page - 1) * limit,
        take: Number(limit),
      }),
      PrismaManager.client.count(),
    ]);

    const clients = docs.map(client => {
      const { address, ...rest } = client;
      return {
        client: rest,
        address,
      };
    });

    return {
      clients,
      total,
    };
  }
}
