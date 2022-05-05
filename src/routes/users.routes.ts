import { Router } from 'express';

import { CreateUserController } from '../modules/accounts/useCases/createuser/CreateUserController';

const usersRoutes = Router();
const creaetuserController = new CreateUserController();

usersRoutes.post('/', creaetuserController.handle);

export { usersRoutes };
