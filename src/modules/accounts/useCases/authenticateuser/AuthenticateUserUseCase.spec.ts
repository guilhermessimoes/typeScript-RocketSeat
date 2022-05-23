import { AppError } from 'src/errors/AppError';

import { ICreateUserDTO } from '../../dtos/ICreateuserDTO';
import { UsersRepositoryinMemory } from '../../repositories/in-memory/UsersRepositoryinMemory';
import { CreateUserUseCase } from '../createuser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryinMemory: UsersRepositoryinMemory;
let createUserUseCase: CreateUserUseCase;

describe('Autehnticate User', () => {
    beforeEach(() => {
        usersRepositoryinMemory = new UsersRepositoryinMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryinMemory,
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryinMemory);
    });

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test',
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
    });

    it('should not be able to authenticate an noneexistent user', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '1234',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '9999',
                email: 'user@user.com',
                password: '1234',
                name: 'User Test Error',
            };
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
