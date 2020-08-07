import * as path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
	userId: string;
	avatarFilename: string;
}

/**
 * Class UpdateUserAvatarService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 2.0.0 - Applies Liskov Substitution Principle, using and interface for the repository instead of the
 * repository implementation itself
 */
export default class UpdateUserAvatarService {
	/**
	 * CreateUserService's constructor
	 * Inicializes the IUsersRepository
	 *
	 * @param usersRepository
	 */
	constructor(private usersRepository: IUsersRepository) {}

	public async execute({
		userId,
		avatarFilename,
	}: IRequestDTO): Promise<User> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError(
				'Only authenticated users can update avatar',
				401,
			);
		}

		if (user.avatar) {
			// delete old avatar
			const userAvatarFilePath = path.join(
				uploadConfig.directory,
				user.avatar,
			);
			const userAvatarFileExists = await fs.promises.stat(
				userAvatarFilePath,
			);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		user.avatar = avatarFilename;

		await this.usersRepository.save(user);

		delete user.password;
		return user;
	}
}
