import { Hasher } from '@/domain/interfaces/cryptography';
import { BcryptHasher } from '@/infra/cryptography';

export const makeCryptography = (): Hasher => {
  return new BcryptHasher();
};
