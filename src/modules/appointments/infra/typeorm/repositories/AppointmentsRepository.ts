import { EntityRepository, getRepository, Repository, Raw } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

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

	public async findAllInMonthFromProvider({
		providerId,
		month,
		year,
	}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
		const parsedMonth = String(month).padStart(2, '0');

		return this.ormRepository.find({
			where: {
				providerId,
				date: Raw(
					dateFieldName =>
						`to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
				),
			},
		});
	}

	public async findAllInDayFromProvider({
		providerId,
		month,
		year,
		day,
	}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
		const parsedDay = String(day).padStart(2, '0');
		const parsedMonth = String(month).padStart(2, '0');

		return this.ormRepository.find({
			where: {
				providerId,
				date: Raw(
					dateFieldName =>
						`to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
				),
			},
		});
	}

	/**
	 * Finds an appointment by its book date
	 * Returns null if no appointment is find
	 *
	 * @param date
	 * @param providerId
	 * @return Promise<Appointment | null>
	 *
	 * @since 1.0.0 - Initial version
	 * @since 2.0.0 - Use methods of TypeOrm to search in the repository
	 */
	public async findByDate(
		date: Date,
		providerId?: string,
	): Promise<Appointment | undefined> {
		const findAppointment = await this.ormRepository.findOne({
			where: { date, providerId },
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
		userId,
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({
			providerId,
			userId,
			date,
		});
		await this.ormRepository.save(appointment);
		return appointment;
	}
}

export default AppointmentsRepository;
