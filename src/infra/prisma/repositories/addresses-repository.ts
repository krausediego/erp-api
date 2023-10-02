import { IAddressesRepository } from '@/domain/interfaces/repositories';
import { Prisma } from '@prisma/client';

import { PrismaManager } from '../prisma-manager';

export class AddressesRepository implements IAddressesRepository {
  async create(address: Prisma.AddressCreateManyInput): Promise<void> {
    await PrismaManager.address.create({ data: address });
  }
}
