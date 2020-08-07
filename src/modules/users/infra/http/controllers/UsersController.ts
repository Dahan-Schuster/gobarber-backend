import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

/**
 * Class UsersController
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class UsersController {
	/**
	 * Calls the CreateUserService to create and save a new User
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
		const { name, email, password } = request.body;
		const createUserService = container.resolve(CreateUserService);
		const user = await createUserService.execute({ name, email, password });

		return response.json(user);
	}

	/**
	 * Calls the UpdateUserAvatarService to change the user's avatar
	 *
	 * @param request
	 * @param response
	 * @return Promise<Response>
	 *
	 * @since 1.0.0
	 */
	public async changeAvatar(
		request: Request,
		response: Response,
	): Promise<Response> {
		const updateUserAvatarService = container.resolve(
			UpdateUserAvatarService,
		);

		const user = await updateUserAvatarService.execute({
			userId: request.user.id,
			avatarFilename: request.file.filename,
		});

		return response.json(user);
	}
}
