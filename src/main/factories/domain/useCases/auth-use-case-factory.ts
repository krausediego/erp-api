import { Auth, Login, Register } from '@/domain/interfaces/useCases/auth';
import { LoginUseCase, RegisterUseCase } from '@/domain/useCases/auth';
import { makeCryptography, makeToken } from '@/main/factories/infra';

import { makeUsersRepository } from '../repositories';

const register = (): Register => {
  return new RegisterUseCase(makeUsersRepository(), makeCryptography());
};

const login = (): Login => {
  return new LoginUseCase(
    makeUsersRepository(),
    makeCryptography(),
    makeToken(),
  );
};

const useCases = {
  register,
  login,
};

const makeAuthUseCase = (
  useCaseName: Auth.AuthUseCaseName,
): Auth.AuthUseCase => {
  return useCases[useCaseName];
};

export { makeAuthUseCase };
