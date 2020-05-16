import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

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
 */
appointmentsRouter.post('/', (req, res) => {
	try {
		const { provider, date } = req.body;
		const parsedDate = parseISO(date); // data transformation, route responsibility

		const createAppointmentService = new CreateAppointmentService(
			appointmentsRepository,
		);
		const appointment = createAppointmentService.execute({
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
 */
appointmentsRouter.get('/', (req, res) => {
	const appointments = appointmentsRepository.all();

	return res.json(appointments);
});

export default appointmentsRouter;
