import { Prisma } from '@prisma/client';

export interface IAddressesRepository {
  create(address: Prisma.AddressCreateManyInput): Promise<void>;
  updateAddress(data: IAddressesRepository.UpdateAddress): Promise<void>;
}

export namespace IAddressesRepository {
  export type UpdateAddress = {
    address: Prisma.AddressUpdateManyMutationInput;
    addressId: string;
  };
}
