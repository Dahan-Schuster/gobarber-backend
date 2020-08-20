import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

/**
 * Class ForgotPasswordController
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class ForgotPasswordController {
	/**
	 * Sends an email with a User Token to the user to reset its password
	 *
	 * @param request
	 * @param response
	 * @return Promise<Response>
	 *
	 * @since 1.0.0
	 */
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { email } = request.body;
		const sendForgotPasswordEmailService = container.resolve(
			SendForgotPasswordEmailService,
		);

		await sendForgotPasswordEmailService.execute({
			email,
		});

		return response.status(204).json();
	}
}
