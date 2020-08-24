import { uuid } from 'uuidv4';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

/**
 * Class FakeAppointmentsRepository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class FakeAppointmentsRepository
	implements IAppointmentsRepository {
	private appointments: Appointment[] = [];

	public async findAllInMonthFromProvider({
		providerId,
		month,
		year,
	}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
		return this.appointments.filter(
			appointment =>
				appointment.providerId === providerId &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year,
		);
	}

	public async findAllInDayFromProvider({
		providerId,
		month,
		year,
		day,
	}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
		return this.appointments.filter(
			appointment =>
				appointment.providerId === providerId &&
				getDate(appointment.date) === day &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year,
		);
	}

	/**
	 * Finds an appointment by its book date
	 * Returns null if no appointment is find
	 *
	 * @param date
	 * @return Promise<Appointment | null>
	 *
	 * @since 1.0.0 - Initial version
	 */
	public async findByDate(
		date: Date,
		providerId?: string,
	): Promise<Appointment | undefined> {
		return this.appointments.find(p => {
			return (
				isEqual(p.date, date) &&
				(providerId ? p.providerId === providerId : true)
			);
		});
	}

	/**
	 * Creates and saves an appointment in the database
	 *
	 * @param data: ICreateAppointmentDTO
	 * @return Promise<Appointment | null>
	 *
	 * @since 1.0.0 - Initial version
	 */
	public async create({
		providerId,
		userId,
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = new Appointment();

		Object.assign(appointment, { id: uuid(), date, providerId, userId });
		this.appointments.push(appointment);

		return appointment;
	}
}
