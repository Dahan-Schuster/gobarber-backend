import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

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
 */
appointmentsRouter.post('/', async (req, res) => {
	const { providerId, date } = req.body;
	const parsedDate = parseISO(date); // data transformation, route responsibility

	const createAppointmentService = new CreateAppointmentService();
	const appointment = await createAppointmentService.execute({
		providerId,
		date: parsedDate,
	});

	return res.json(appointment);
});

/**
 * Handle GET Appointments requests
 *
 * @since 1.0.0
 * @since 2.0.0 - Uses TypeOrm to get the repository and search por appointments
 * @since 2.1.0 - Removes try/catch block because there's a Global Exception Handler
 */
appointmentsRouter.get('/', async (req, res) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointments = await appointmentsRepository.find();

	return res.json(appointments);
});

export default appointmentsRouter;
