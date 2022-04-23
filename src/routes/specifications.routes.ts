import { Router } from 'express';

import { specificationsController } from '../modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) => {
    return specificationsController.handle(request, response);
});

export { specificationsRoutes };
