import jwt from 'jsonwebtoken';

import { Token } from '@/domain/interfaces/token';
import env from '@/main/config/environments/token';

export class JwtToken implements Token {
  generateToken(payload: Record<string, any>): string {
    return jwt.sign(payload, env.secret, { algorithm: 'HS512' });
  }

  checkToken(token: string) {
    jwt.verify(token, env.secret);
  }
}
