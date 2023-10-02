import { IUsersRepository } from '@/domain/interfaces/repositories';
import { Prisma, User } from '@prisma/client';

import { PrismaManager } from '../prisma-manager';

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    return PrismaManager.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: Prisma.UserCreateManyInput): Promise<void> {
    await PrismaManager.user.create({ data });
  }
}
