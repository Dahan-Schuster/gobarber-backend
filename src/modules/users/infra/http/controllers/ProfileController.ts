import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

/**
 * Class ProfileController
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class ProfileController {
	/**
	 * Shows the user's profile
	 *
	 * @param request
	 * @param response
	 * @return Promise<Response>
	 *
	 * @since 1.0.0
	 */
	public async show(request: Request, response: Response): Promise<Response> {
		const userId = request.user.id;

		const showProfileService = container.resolve(ShowProfileService);

		const user = await showProfileService.execute({ userId });

		delete user.password;

		return response.json(user);
	}

	/**
	 * Calls the UpdateUserProfileService to change the user's profile
	 *
	 * @param request
	 * @param response
	 * @return Promise<Response>
	 *
	 * @since 1.0.0
	 */
	public async update(
		request: Request,
		response: Response,
	): Promise<Response> {
		const userId = request.user.id;
		const { name, email, oldPassword, password } = request.body;

		const updateUserProfileService = container.resolve(
			UpdateUserProfileService,
		);

		const user = await updateUserProfileService.execute({
			userId,
			name,
			email,
			oldPassword,
			password,
		});

		return response.json(user);
	}
}
