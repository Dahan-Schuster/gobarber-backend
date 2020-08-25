import { inject, injectable } from 'tsyringe';
import { getDate, getDaysInMonth, isAfter, endOfDay } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import config from '@modules/appointments/config';

const { workJourney } = config;

interface IRequestDTO {
	providerId: string;
	month: number;
	year: number;
}

type IResponseDTO = Array<{
	day: number;
	available: boolean;
}>;

/**
 * Class ListMonthAvailability
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
@injectable()
export default class ListProviderMonthAvailabilityService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	/**
	 * Returns the days available to appointment for a provider in a given month
	 *
	 * @param providerId
	 * @param month
	 * @param year
	 *
	 * @return IResponseDTO
	 */
	public async execute({
		providerId,
		month,
		year,
	}: IRequestDTO): Promise<IResponseDTO> {
		// find all the appointments from the provider in the given month
		const appointmentsInTheGivenMonth = await this.appointmentsRepository.findAllInMonthFromProvider(
			{
				providerId,
				month,
				year,
			},
		);

		// get the number of days in the given month
		const daysInTheGivenMonth = getDaysInMonth(new Date(year, month - 1));

		const eachDayArray = Array.from(
			{ length: daysInTheGivenMonth },
			(_, index) => index + 1,
		); // [ 1, 2, 3, 4, 5, ..., 30 ]

		// for each day, verify if the number of appointments exceed the max allowed
		return eachDayArray.map(day => {
			const compareDate = endOfDay(new Date(year, month - 1, day));

			const appointmentsInDay = appointmentsInTheGivenMonth.filter(
				appointment => getDate(appointment.date) === day,
			);

			return {
				day,
				available:
					isAfter(compareDate, new Date()) &&
					appointmentsInDay.length < workJourney.appointmentsPerDay,
			};
		});
	}
}
