import { JwtPayload } from 'jsonwebtoken';

export interface Token {
  generateToken(payload: Record<string, any>): string;
  checkToken(token: string): string | JwtPayload;
  decodeToken(token: string): string;
}
