import { AuthController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { Auth } from '@/domain/interfaces/useCases/auth';
import { makeAuthUseCase } from '@/main/factories/domain/useCases';

export const makeAuthController = (
  useCaseName: Auth.AuthUseCaseName,
): Controller => {
  return new AuthController(useCaseName, makeAuthUseCase(useCaseName));
};
