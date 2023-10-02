import { IAddressesRepository } from '@/domain/interfaces/repositories';
import { AddressesRepository } from '@/infra/prisma/repositories';

export const makeAddressesRepository = (): IAddressesRepository => {
  return new AddressesRepository();
};
