import { Prisma, User } from '@prisma/client';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateManyInput): Promise<void>;
}
