import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

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

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
	) {}

	public async execute({
		providerId,
		day,
		month,
		year,
	}: IRequest): Promise<Appointment[]> {
		const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`;
		let appointments = await this.cacheProvider.get<Appointment[]>(
			cacheKey,
		);

		if (!appointments) {
			appointments = await this.appointmentsRepository.findAllInDayFromProvider(
				{
					providerId,
					day,
					month,
					year,
				},
			);
			await this.cacheProvider.save(cacheKey, classToClass(appointments));
		}

		return appointments;
	}
}
