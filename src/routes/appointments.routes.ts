import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

/**
 * Handle POST Appointments requests
 *
 * @bodyParam provider
 * @bodyParam date
 *
 * @since 1.0.0
 */
appointmentsRouter.post('/', (req, res) => {
	const { provider, date } = req.body;

	const parsedDate = startOfHour(parseISO(date));

	const findAppointmentInSameDate = appointmentsRepository.findByDate(
		parsedDate,
	);

	if (findAppointmentInSameDate) {
		return res
			.status(400)
			.json({ error: 'This appointment is already booked' });
	}

	const appointment = appointmentsRepository.create({
		provider,
		date: parsedDate,
	});

	return res.json(appointment);
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
