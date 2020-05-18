import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

/**
 * Class AppointmentsRepository
 * For operations with the appointments repository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 2.0.0 - Applies TypeOrm
 */
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
	/**
	 * Finds an appointment by its book date
	 * Returns null if no appointment is find
	 *
	 * @param date
	 * @return Promise<Appointment | null>
	 *
	 * @since 1.0.0
	 * @since 2.0.0 - Use methods of TypeOrm to search in the repository
	 */
	public async findByDate(date: Date): Promise<Appointment | null> {
		const findAppointment = await this.findOne({
			where: { date },
		});

		return findAppointment || null;
	}
}

export default AppointmentsRepository;
