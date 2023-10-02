import { IUsersRepository } from '@/domain/interfaces/repositories';
import { UsersRepository } from '@/infra/prisma/repositories';

export const makeUsersRepository = (): IUsersRepository => {
  return new UsersRepository();
};
