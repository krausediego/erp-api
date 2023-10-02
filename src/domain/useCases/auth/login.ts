import { BadRequestError } from '@/application/errors';
import { Hasher } from '@/domain/interfaces/cryptography';
import { IUsersRepository } from '@/domain/interfaces/repositories';
import { Token } from '@/domain/interfaces/token';
import { Login } from '@/domain/interfaces/useCases/auth';

export class LoginUseCase implements Login {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly hasher: Hasher,
    private readonly token: Token,
  ) {}

  async run(params: Login.Params): Promise<Login.Response> {
    const { email, password } = params;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError('Usuário não encontrado');
    }

    const passwordCompared = await this.hasher.compare(password, user.password);

    if (!passwordCompared) {
      throw new BadRequestError('Email ou senha incorretos');
    }

    const token = this.token.generateToken({ id: user.id });

    return { token };
  }
}
