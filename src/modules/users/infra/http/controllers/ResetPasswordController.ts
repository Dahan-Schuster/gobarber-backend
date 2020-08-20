import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

/**
 * Class ResetPasswordController
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class ResetPasswordController {
	/**
	 * Receives a User Token and a new password and reset the password of the token's associated user
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
		const { token, password } = request.body;
		const resetPasswordService = container.resolve(ResetPasswordService);

		await resetPasswordService.execute({
			token,
			password,
		});

		return response.status(204).json();
	}
}
