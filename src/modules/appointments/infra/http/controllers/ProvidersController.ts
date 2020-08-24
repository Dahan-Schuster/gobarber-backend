import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

/**
 * Class AppointmentController
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class ProvidersController {
	/**
	 * Calls the Lis to ListProvidersService to list all providers
	 *
	 * @param request - an array of user IDs can be passed to exclude from the list
	 * @param response
	 * @return Promise<Response>
	 *
	 * @since 1.0.0
	 */
	public async index(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id: userId } = request.user;

		const listProvidersService = container.resolve(ListProvidersService);
		const users = await listProvidersService.execute({
			exceptUserId: userId,
		});

		return response.json(classToClass(users));
	}
}
