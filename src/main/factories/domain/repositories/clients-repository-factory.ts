import { IClientsRepository } from '@/domain/interfaces/repositories';
import { ClientsRepository } from '@/infra/prisma/repositories';

export const makeClientsRepository = (): IClientsRepository => {
  return new ClientsRepository();
};
