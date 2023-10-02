import { Prisma } from '@prisma/client';

export interface IAddressesRepository {
  create(address: Prisma.AddressCreateManyInput): Promise<void>;
}
