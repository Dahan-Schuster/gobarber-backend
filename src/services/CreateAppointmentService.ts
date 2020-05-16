import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';

/**
 * Interface RequestDTO
 * Object template for the data received by the service
 *
 * @version 1.0.0
 */
interface RequestDTO {
	provider: string;
	date: Date;
}

/**
 * Class CreateAppointmentService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class CreateAppointmentService {
	private appointmentsRepository: AppointmentsRepository;

	/**
	 * Implements the Dependency Inversion Principle from SOLID,
	 * receiving the appointmentsRepository from the constructor
	 * instead of instantiating it inside the class
	 *
	 * @param appointmentsRepository
	 * @since 1.0.0
	 */
	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	}

	/**
	 * Executes the service, creating an appointment with the data
	 * received as a RequestDTO instance
	 *
	 * @param provider
	 * @param date
	 * @return Appointment
	 *
	 * @since 1.0.0
	 */
	public execute({ provider, date }: RequestDTO): Appointment {
		// business rule: each appointment must be booked at the start of the hour
		const appointmentDate = startOfHour(date);
		const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
			appointmentDate,
		);

		// business rule: appointments can't be booked at the same hour
		if (findAppointmentInSameDate) {
			throw Error('This appointment is already booked');
		}

		return this.appointmentsRepository.create({
			provider,
			date: appointmentDate,
		});
	}
}
