import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import ListProviderDayAvailabilityService from '../../../services/ListProviderDayAvailabilityService';

/**
 * Class MonthAvailabilityController
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class ProvidersAvailabilityController {
	public async monthAvailability(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id: providerId } = request.params;
		const { month, year } = request.body;

		const listProviderMonthAvailabilityService = container.resolve(
			ListProviderMonthAvailabilityService,
		);

		const availableDays = await listProviderMonthAvailabilityService.execute(
			{
				month,
				year,
				providerId,
			},
		);

		return response.json(availableDays);
	}

	public async dayAvailability(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id: providerId } = request.params;
		const { day, month, year } = request.body;

		const listProviderDayAvailabilityService = container.resolve(
			ListProviderDayAvailabilityService,
		);

		const availableHours = await listProviderDayAvailabilityService.execute(
			{
				day,
				month,
				year,
				providerId,
			},
		);

		return response.json(availableHours);
	}
}
