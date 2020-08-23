import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

/**
 * Class IAppointmentsRepository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default interface IAppointmentsRepository {
	create(data: ICreateAppointmentDTO): Promise<Appointment>;

	findByDate(date: Date): Promise<Appointment | undefined>;

	findAllInMonthFromProvider(
		data: IFindAllInMonthFromProviderDTO,
	): Promise<Appointment[]>;

	findAllInDayFromProvider(
		data: IFindAllInDayFromProviderDTO,
	): Promise<Appointment[]>;
}
