import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
	providerId: string;
	day: number;
	month: number;
	year: number;
}

/**
 * Class ListProviderAppointmentsService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
@injectable()
export default class ListProviderAppointmentsService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	public async execute({
		providerId,
		day,
		month,
		year,
	}: IRequest): Promise<Appointment[]> {
		return this.appointmentsRepository.findAllInDayFromProvider({
			providerId,
			day,
			month,
			year,
		});
	}
}
