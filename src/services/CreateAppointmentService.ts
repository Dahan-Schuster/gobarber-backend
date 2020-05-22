import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';

/**
 * Interface RequestDTO
 * Object template for the data received by the service
 *
 * @version 2.0.0
 * @since 1.0.0
 * @since 2.0.0 - Changed the provider field to providerId
 */
interface RequestDTO {
	providerId: string;
	date: Date;
}

/**
 * Class CreateAppointmentService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 2.0.0 - Applies TypeOrm
 */
export default class CreateAppointmentService {
	/**
	 * Executes the service, creating an appointment with the data
	 * received as a RequestDTO instance
	 *
	 * @param providerId
	 * @param date
	 * @return Promise<Appointment>
	 *
	 * @since 1.0.0
	 * @since 2.0.0 - Use methods of TypeOrm to create and save the Appointment
	 * @since 3.0.0 - Change the provider param to providerId
	 */
	public async execute({
		providerId,
		date,
	}: RequestDTO): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(
			AppointmentsRepository,
		);

		// business rule: each appointment must be booked at the start of the hour
		const appointmentDate = startOfHour(date);
		const findAppointmentInSameDate = await appointmentsRepository.findByDate(
			appointmentDate,
		);

		// business rule: appointments can't be booked at the same hour
		if (findAppointmentInSameDate) {
			throw Error('This appointment is already booked');
		}

		const appointment = appointmentsRepository.create({
			providerId,
			date: appointmentDate,
		});

		await appointmentsRepository.save(appointment);

		return appointment;
	}
}
