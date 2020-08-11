import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

/**
 * Class FakeAppointmentsRepository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class FakeAppointmentsRepository
	implements IAppointmentsRepository {
	private appointments: Appointment[] = [];

	/**
	 * Finds an appointment by its book date
	 * Returns null if no appointment is find
	 *
	 * @param date
	 * @return Promise<Appointment | null>
	 *
	 * @since 1.0.0 - Initial version
	 */
	public async findByDate(date: Date): Promise<Appointment | undefined> {
		return this.appointments.find(p => isEqual(p.date, date));
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
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = new Appointment();

		Object.assign(appointment, { id: uuid(), date, providerId });
		this.appointments.push(appointment);

		return appointment;
	}
}
