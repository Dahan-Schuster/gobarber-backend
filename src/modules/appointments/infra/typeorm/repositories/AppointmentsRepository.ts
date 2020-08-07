import { EntityRepository, getRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/infra/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

/**
 * Class AppointmentsRepository
 * For operations with the appointments repository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 2.1.0 - Implements own CRUD methods (removes inheritance from the typeorm Repository class)
 */
@EntityRepository(Appointment)
class AppointmentsRepository implements IAppointmentsRepository {
	private ormRepository: Repository<Appointment>;

	/**
	 * AppointmentsRepository's constructor
	 *
	 * @since 2.1.0 - Initial version
	 */
	constructor() {
		this.ormRepository = getRepository(Appointment);
	}

	/**
	 * Finds an appointment by its book date
	 * Returns null if no appointment is find
	 *
	 * @param date
	 * @return Promise<Appointment | null>
	 *
	 * @since 1.0.0 - Initial version
	 * @since 2.0.0 - Use methods of TypeOrm to search in the repository
	 */
	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const findAppointment = await this.ormRepository.findOne({
			where: { date },
		});

		return findAppointment || undefined;
	}

	/**
	 * Creates and saves an appointment in the database
	 *
	 * @param data: ICreateAppointmentDTO
	 * @return Promise<Appointment | null>
	 *
	 * @since 2.1.0 - Initial version
	 */
	public async create({
		providerId,
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({ providerId, date });
		await this.ormRepository.save(appointment);
		return appointment;
	}
}

export default AppointmentsRepository;
