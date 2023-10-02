import { Login, Register } from '@/domain/interfaces/useCases/auth';

export namespace Auth {
  export type AuthUseCaseName = 'register' | 'login';

  export type AuthUseCase = () => Register | Login;
}
