import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

/**
 * Handle POST Appointments requests
 * Receives the request, instantiate and calls
 * the createAppointmentService, and then sends the response
 *
 * @bodyParam provider
 * @bodyParam date
 *
 * @since 1.0.0
 * @since 1.1.0 - Applies the Single Responsibility Principle, from SOLID. This version uses the service to create the
 * new appointment, giving to the router the unique work of receive a request, call a file and send a response
 * @since 1.2.0 - Updates the use of the createAppointmentService after the changes with TypeOrm
 */
appointmentsRouter.post('/', async (req, res) => {
	try {
		const { provider, date } = req.body;
		const parsedDate = parseISO(date); // data transformation, route responsibility

		const createAppointmentService = new CreateAppointmentService();
		const appointment = await createAppointmentService.execute({
			provider,
			date: parsedDate,
		});

		return res.json(appointment);
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
});

/**
 * Handle GET Appointments requests
 *
 * @since 1.0.0
 * @since 2.0.0 - Uses TypeOrm to get the repository and search por appointments
 */
appointmentsRouter.get('/', async (req, res) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointments = await appointmentsRepository.find();

	return res.json(appointments);
});

export default appointmentsRouter;
