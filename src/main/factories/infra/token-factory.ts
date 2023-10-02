import { Token } from '@/domain/interfaces/token';
import { JwtToken } from '@/infra/token';

export const makeToken = (): Token => {
  return new JwtToken();
};
