import jwt, { JwtPayload } from 'jsonwebtoken';

import { Token } from '@/domain/interfaces/token';
import env from '@/main/config/environments/token';

export class JwtToken implements Token {
  generateToken(payload: Record<string, any>): string {
    return jwt.sign(payload, env.secret, {
      algorithm: 'HS512',
      expiresIn: '1d',
    });
  }

  checkToken(token: string): string | JwtPayload {
    return jwt.verify(token, env.secret);
  }

  decodeToken(token: string): string {
    const { id } = jwt.decode(token) as { id: string };
    return id;
  }
}
