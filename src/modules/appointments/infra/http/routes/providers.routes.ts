import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProvidersAvailabilityController from '@modules/appointments/infra/http/controllers/ProvidersAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providersAvailabilityController = new ProvidersAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
	'/:id/month-availability',
	providersAvailabilityController.monthAvailability,
);
providersRouter.get(
	'/:id/day-availability',
	providersAvailabilityController.dayAvailability,
);

export default providersRouter;
