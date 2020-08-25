import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

/**
 * Class AppointmentController
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class ProviderAppointmentsController {
	/**
	 * Calls the ListProviderAppointmentsService to list all the appointments of a provider in a given day
	 *
	 * @param request
	 * @param response
	 * @return Promise<Response>
	 *
	 * @since 1.0.0
	 */
	public async index(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id: providerId } = request.user;
		const { day, month, year } = request.query;

		const listProviderAppointmentsService = container.resolve(
			ListProviderAppointmentsService,
		);
		const appointments = await listProviderAppointmentsService.execute({
			providerId,
			day: Number(day),
			month: Number(month),
			year: Number(year),
		});

		return response.json(appointments);
	}
}
