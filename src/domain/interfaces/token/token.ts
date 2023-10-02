export interface Token {
  generateToken(payload: Record<string, any>): string;
  checkToken(token: string): any;
}
