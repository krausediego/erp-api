import { BadRequestError } from '@/application/errors';
import { Hasher } from '@/domain/interfaces/cryptography';
import { IUsersRepository } from '@/domain/interfaces/repositories';
import { Register } from '@/domain/interfaces/useCases/auth';

export class RegisterUseCase implements Register {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly hasher: Hasher,
  ) {}

  async run(params: Register.Params): Promise<Register.Response> {
    const { username, email, password } = params;

    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new BadRequestError('Este email já está vinculado a outra conta');
    }

    const passwordHashed = await this.hasher.hash(password);

    await this.usersRepository.create({
      username,
      email,
      password: passwordHashed,
    });

    return {
      message: 'Usuário criado com sucesso!',
    };
  }
}
