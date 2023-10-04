import { IClientsRepository } from '@/domain/interfaces/repositories';
import { Prisma, Client, Address } from '@prisma/client';

import { PrismaManager } from '../prisma-manager';

export class ClientsRepository implements IClientsRepository {
  async create(client: Prisma.ClientCreateManyInput): Promise<Client> {
    return PrismaManager.client.create({ data: client });
  }

  async findManyClients(
    data: IClientsRepository.FindManyClientsProps,
  ): Promise<{
    clients: { client: Client; address: Address[] }[];
    total: number;
  }> {
    const { userId, page, limit, nameOrEmail } = data;

    const [docs, total] = await PrismaManager.$transaction([
      PrismaManager.client.findMany({
        where: {
          userId,
          AND: [
            {
              OR: [
                { name: { contains: nameOrEmail, mode: 'insensitive' } },
                { email: { contains: nameOrEmail, mode: 'insensitive' } },
              ],
            },
          ],
        },
        include: { address: true },
        skip: (page - 1) * limit,
        take: Number(limit),
      }),
      PrismaManager.client.count({ where: { userId } }),
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

  async findClientById(
    data: IClientsRepository.FindClientByIdProps,
  ): Promise<IClientsRepository.FindClientByIdResponse | null> {
    const { userId, clientId } = data;

    const client = await PrismaManager.client.findFirst({
      where: { id: clientId, userId },
      include: { address: true },
    });

    return client;
  }

  async updateClient(
    data: IClientsRepository.UpdateClientProps,
  ): Promise<void> {
    const { client, clientId, userId } = data;

    await PrismaManager.client.update({
      data: { ...client },
      where: { id: clientId, userId },
    });
  }
}
