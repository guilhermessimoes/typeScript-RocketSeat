import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}
@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('userRepository')
        private usersRepository: IUsersRepository,
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Usuario existe

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('Email or password incorrect!');
        }
        // Senha está correta
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Email or password incorrect!');
        }
        // Gerar jsonwebtoken
        const token = sign({}, '192309aaddc500140db28668e1bbd8b5', {
            subject: user.id,
            expiresIn: '1d',
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
