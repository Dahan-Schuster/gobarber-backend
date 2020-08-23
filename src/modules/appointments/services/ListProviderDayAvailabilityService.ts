import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getHours, isAfter } from 'date-fns';

import config from '@modules/appointments/config';

const { workJourney } = config;

interface IRequestDTO {
	providerId: string;
	year: number;
	month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // miss range... ;-;
	day: number;
}

type IResponseDTO = Array<{
	hour: number; // don't you think I'm gonna type from 1 to 31, isn't?
	available: boolean;
}>;

/**
 * Class ListProviderDayAvailabilityService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
@injectable()
export default class ListProviderDayAvailabilityService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	/**
	 * Returns the hours available to appointment for a provider in a given day
	 *
	 *
	 * @return IResponseDTO
	 * @param data: IRequestDTO
	 */
	public async execute(data: IRequestDTO): Promise<IResponseDTO> {
		const appointmentsInTheGivenDay = await this.appointmentsRepository.findAllInDayFromProvider(
			data,
		);

		const eachHourInGivenDay = Array.from(
			{ length: workJourney.totalHours },
			(_, index) => index + workJourney.startHour,
		); // [ 8, 9, 10, ..., 17 ]

		const currentHour = new Date(Date.now());

		const { year, month, day } = data;
		return eachHourInGivenDay.map(hour => {
			const hasAppointmentInHour = appointmentsInTheGivenDay.find(
				appointment => getHours(appointment.date) === hour,
			);

			const appointmentHour = new Date(year, month - 1, day, hour);

			return {
				hour,
				available:
					!hasAppointmentInHour &&
					isAfter(appointmentHour, currentHour),
			};
		});
	}
}
