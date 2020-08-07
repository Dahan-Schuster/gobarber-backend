import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

/**
 * Class CreateAppointmentService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 4.0.0 - Applies Liskov Substitution Principle, using and interface for the repository instead of the
 * repository implementation itself
 */
@injectable()
export default class CreateAppointmentService {
	/**
	 * CreateAppointmentService's constructor
	 * Inicializes the IAppointmentsRepository
	 *
	 * @param appointmentsRepository
	 */
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	/**
	 * Executes the service, creating an appointment with the data
	 * received as a IRequestDTO instance
	 *
	 * @param ICreateAppointmentDTO
	 * @return Promise<Appointment>
	 *
	 * @since 1.0.0
	 * @since 2.0.0 - Use methods of TypeOrm to create and save the Appointment
	 * @since 3.0.0 - Change the provider param to providerId
	 * @since 4.0.0 - Applies Liskov Substitution Principle
	 */
	public async execute({
		providerId,
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		// business rule: each appointment must be booked at the start of the hour
		const appointmentDate = startOfHour(date);
		const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
			appointmentDate,
		);

		// business rule: appointments can't be booked at the same hour
		if (findAppointmentInSameDate) {
			throw new AppError('This appointment is already booked');
		}

		return this.appointmentsRepository.create({
			providerId,
			date: appointmentDate,
		});
	}
}
