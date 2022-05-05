import { ICreateUserDTO } from '../dtos/ICreateuserDTO';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
