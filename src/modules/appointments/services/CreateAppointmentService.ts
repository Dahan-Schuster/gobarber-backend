import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import config from '@modules/appointments/config';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

const { workJourney } = config;

/**
 * Class CreateAppointmentService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 4.1.0 - Implements business rules
 */
@injectable()
export default class CreateAppointmentService {
	/**
	 * CreateAppointmentService's constructor
	 * Inicializes the IAppointmentsRepository
	 *
	 * @param appointmentsRepository
	 * @param notificationsRepository
	 * @param cacheProvider
	 */
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,

		@inject('NotificationsRepository')
		private notificationsRepository: INotificationsRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
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
	 * @since 4.1.0 - Implements business rules
	 */
	public async execute({
		providerId,
		userId,
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		if (isBefore(appointmentDate, Date.now())) {
			throw new AppError(
				"You can't create an appointment at a past date",
			);
		}

		if (getHours(appointmentDate) < workJourney.startHour) {
			throw new AppError(
				`You can't create an appointment before ${workJourney.startHour}h`,
			);
		}

		if (getHours(appointmentDate) >= workJourney.endHour) {
			throw new AppError(
				`You can't create an appointment after ${workJourney.endHour}h`,
			);
		}

		if (userId === providerId) {
			throw new AppError("You can't create an appointment with yourself");
		}

		const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
			appointmentDate,
			providerId,
		);

		if (findAppointmentInSameDate) {
			throw new AppError('This appointment is already booked');
		}

		const appointment = await this.appointmentsRepository.create({
			providerId,
			userId,
			date: appointmentDate,
		});

		const formattedDate = format(
			appointmentDate,
			"dd/MM/yyyy 'às' HH'h'mm",
		);
		await this.notificationsRepository.create({
			recipientId: providerId,
			content: `Novo agendamento para o dia ${formattedDate}`,
		});

		await this.cacheProvider.invalidate(
			`provider-appointments:${providerId}:${format(
				appointmentDate,
				'yyyy-M-d',
			)}`,
		);

		return appointment;
	}
}
