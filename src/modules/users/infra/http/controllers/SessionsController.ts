import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

/**
 * Class SessionsController
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class SessionsController {
	/**
	 * Calls the AuthenticateUserService to create a new user's session
	 *
	 * @param request
	 * @param response
	 * @return Promise<Response>
	 *
	 * @since 1.0.0
	 */
	public async login(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { email, password } = request.body;
		const authenticateUserService = container.resolve(
			AuthenticateUserService,
		);

		const { user, token } = await authenticateUserService.execute({
			email,
			password,
		});

		return response.json({ user: classToClass(user), token });
	}
}
