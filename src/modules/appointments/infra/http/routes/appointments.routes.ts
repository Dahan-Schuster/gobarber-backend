/**
 * Appointments Routes
 * @author Dahan Schuster <dan.plschuster@gmail.com>
 * @version 3.2.0 - Applies the use of the controllers
 */

import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

/**
 * Handle POST Appointments requests
 * Receives the request, instantiate and calls
 * the createAppointmentService, and then sends the response
 *
 * @bodyParam providerId
 * @bodyParam date
 *
 * @since 1.0.0
 * @since 1.1.0 - Applies the Single Responsibility Principle, from SOLID. This version uses the service to create the
 * new appointment, giving to the router the unique work of receive a request, call a file and send a response
 * @since 1.2.0 - Updates the use of the createAppointmentService after the changes with TypeOrm
 * @since 2.0.0 - Change the provider body param to providerId
 * @since 2.1.0 - Removes try/catch block because there's a Global Exception Handler
 * @since 3.0.0 - Applies Liskov Substitution Principle
 * @since 3.1.0 - Moves the route's logic to the controller
 */
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
